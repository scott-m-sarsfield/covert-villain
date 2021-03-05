const express = require('express');
const find = require('lodash/find');
const get = require('lodash/get');
const includes = require('lodash/includes');
const trim = require('lodash/trim');
const { v1: uuidv1 } = require('uuid');
const { sub, isBefore } = require('date-fns');
const { Game: SequelizeGame, sequelize } = require('./models');
const { getJwt, authenticateJwt, authenticateOptionalJwt } = require('./jwt');
const Actions = require('./game_actions');
const { phases } = require('./constants');
const serializeGame = require('./serialize_game');

async function getGame(code, transaction) {
  const [game] = await SequelizeGame.findOrCreate({
    where: {
      code
    },
    defaults: {
      code,
      data: Actions.setupGame()
    },
    ...transaction && {
      transaction,
      lock: true
    }
  });

  return game;
}

function authenticateRoom(req, res, next) {
  const { roomCode } = req.user;
  const { code } = req.params;
  if (roomCode !== code) {
    res.sendStatus(403);
    return;
  }
  req.roomCode = code.toUpperCase();
  next();
}

function hasGameExpired(game) {
  return isBefore(game.updatedAt, sub(new Date(), { hours: 1 }));
}

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/games/join', authenticateOptionalJwt, async (req, res) => {
  try {
    let { name, code, uuid } = req.body;

    if (req.user) {
      name = req.user.name;
      code = req.user.roomCode;
      uuid = req.user.uuid;
    } else {
      name = trim(name);
      code = trim(code);
    }

    code = code.toUpperCase();

    if (code.length > 10) {
      res.status(400).send({
        error: 'code cannot exceed 10 characters'
      });
      return;
    }

    if (name.length > 15) {
      res.status(400).send({
        error: 'name cannot exceed 15 characters'
      });
      return;
    }

    await sequelize.transaction(async (transaction) => {
      const game = await getGame(code, transaction);

      if (hasGameExpired(game)) {
        game.data = Actions.setupGame();
      }

      const existingPlayer = find(game.data.players, ({ name: existingName, left }) => {
        return existingName === name && !left;
      });

      if (existingPlayer && uuid !== existingPlayer.uuid) {
        res.status(400).send({
          error: 'player already exists with that name'
        });
        return;
      }

      if (!existingPlayer) {
        if (includes([phases.LOBBY], game.data.phase)) {
          uuid = uuidv1();
          game.data = Actions.joinGame(game.data, { name, uuid });
          await game.save({ transaction });
          res.sendRoomEvent(code, 'refresh');
        } else {
          res.status(400).send({
            error: 'cannot join game in progress'
          });
          return;
        }
      }

      const user = {
        roomCode: code,
        roomId: game.data.uuid,
        name,
        uuid
      };

      res.send({
        token: getJwt(user),
        user,
        game: serializeGame(game, user)
      });
    });
  } catch (err) {
    console.log(err); /* eslint-disable-line no-console */
    res.status(500).send(err);
  }
});

router.get('/games/:code', authenticateJwt, async (req, res) => {
  const game = await getGame(req.params.code);

  res.send(serializeGame(game, req.user));
});

router.get('/games/:code/debug', async (req, res) => {
  const { code, data } = await getGame(req.params.code);

  res.send({ code, ...data });
});

async function withGame(req, res, fn) {
  const transaction = await sequelize.transaction();
  try {
    const { roomCode, user } = req;
    const game = await getGame(roomCode, transaction);

    const gameData = await fn(game.data, user);

    if (gameData.error) {
      res.status(400).send(gameData);
      await transaction.rollback();
      return;
    }

    if (gameData !== game.data) {
      game.data = gameData;
      await game.save({ transaction });
      await transaction.commit();
      res.sendRoomEvent(roomCode, 'refresh');
    } else {
      await transaction.rollback();
    }
    res.send({ status: 'ok' });
  } catch (err) {
    await transaction.rollback();
    console.log(err); /* eslint-disable-line no-console */
    res.status(500).send(err);
  }
}

router.post('/games/:code/leave', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    const { uuid } = user;
    return Actions.leaveGame(game, uuid);
  });
});

router.post('/games/:code/change-theme', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (game.phase !== phases.LOBBY) {
      return {
        error: 'must be in the lobby to change theme'
      };
    }
    if (game.host !== user.uuid) {
      return {
        error: 'you must be the host to start the game'
      };
    }

    const { theme } = req.body;

    if (!includes(['secretHitler', 'elusiveEmperor', 'privatePony'], theme)) {
      return {
        error: 'theme is not supported'
      };
    }

    return Actions.changeTheme(game, theme);
  });
});

router.post('/games/:code/start', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (game.phase !== phases.LOBBY) {
      return {
        error: 'must be in the lobby to start the game'
      };
    }

    if (game.host !== user.uuid) {
      return {
        error: 'you must be the host to start the game'
      };
    }

    return Actions.startGame(game);
  });
});

router.post('/games/:code/choose-chancellor', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (game.phase !== phases.PRESIDENT_CHOOSES_CHANCELLOR) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }
    if (user.uuid !== game.presidentNominee) {
      return {
        error: 'must be the president nominee to choose chancellor'
      };
    }
    const chancellorUuid = req.body.uuid;

    const chancellor = includes(game.chancellorOptions, chancellorUuid);

    if (!chancellor) {
      return {
        error: 'must choose chancellor from provided options'
      };
    }

    return Actions.chooseChancellor(game, chancellorUuid);
  });
});

router.post('/games/:code/vote', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (game.phase !== phases.ELECTION) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }

    const voted = get(game, ['votes', user.uuid, 'voted']);
    if (voted) {
      return {
        error: 'already voted'
      };
    }

    const approved = req.body.approved;

    return Actions.vote(game, { uuid: user.uuid, approved });
  });
});

router.post('/games/:code/discard-policy', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (user.uuid !== game.president) {
      return {
        error: 'must be the president to discard policy'
      };
    }
    const { card } = req.body;

    if (!game.cards.hand.includes(card)) {
      return {
        error: 'cannot discard card not in hand'
      };
    }

    return Actions.discardPolicy(game, card);
  });
});

router.post('/games/:code/enact-policy', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (user.uuid !== game.chancellor) {
      return {
        error: 'must be the chancellor to enact policy'
      };
    }
    const { card } = req.body;

    if (card === 911) {
      if (game.cards.evilParty.length < 5) {
        return {
          error: 'cannot veto before 5 evil policies are enacted'
        };
      }

      return Actions.vetoPolicies(game);
    }

    if (!game.cards.hand.includes(card)) {
      return {
        error: 'cannot enact policy not in hand'
      };
    }

    return Actions.enactPolicy(game, card);
  });
});

router.post('/games/:code/end-policy-peek', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (game.phase !== phases.SPECIAL_ACTION_POLICY_PEEK) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }
    if (user.uuid !== game.president) {
      return {
        error: 'only the president can end policy peek'
      };
    }

    return Actions.endPolicyPeek(game);
  });
});

router.post('/games/:code/execute-player', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (game.phase !== phases.SPECIAL_ACTION_EXECUTION) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }
    if (user.uuid !== game.president) {
      return {
        error: 'only the president can execute a player'
      };
    }

    const { uuid } = req.body;

    if (user.uuid === uuid) {
      return {
        error: 'president cannot execute themselves'
      };
    }

    const playerToExecute = find(game.players, { uuid, alive: true });
    if (!playerToExecute) {
      return {
        error: 'must execute alive players'
      };
    }

    return Actions.executePlayer(game, uuid);
  });
});

router.post('/games/:code/approve-veto', authenticateJwt, authenticateRoom, async (req, res) => {
  withGame(req, res, (game, user) => {
    if (game.phase !== phases.PRESIDENT_APPROVES_VETO) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }
    if (user.uuid !== game.president) {
      return {
        error: 'only the president may approve or deny the veto'
      };
    }

    const { approved } = req.body;

    if (approved) {
      return Actions.approveVeto(game);
    }
    return Actions.denyVeto(game);
  });
});

router.post('/games/:code/go-to-lobby', authenticateJwt, authenticateRoom, async (req, res) => {
  withGame(req, res, (game, user) => {
    if (game.phase !== phases.LOBBY) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }

    const player = find(game.players, { uuid: user.uuid });

    if (!player) {
      return {
        error: 'cannot move non-existing player to lobby'
      };
    }

    return Actions.goToLobby(game, user.uuid);
  });
});

router.post('/games/:code/investigate', authenticateJwt, authenticateRoom, async (req, res) => {
  withGame(req, res, (game, user) => {
    if (game.phase !== phases.SPECIAL_ACTION_INVESTIGATE_LOYALTY) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }

    if (user.uuid !== game.president) {
      return {
        error: 'only the president can investigate a player\'s party'
      };
    }

    const { uuid } = req.body;

    if (!includes(game.investigateOptions, uuid)) {
      return {
        error: 'cannot investigate already investigated player or inactive player'
      };
    }

    return Actions.investigate(game, uuid);
  });
});

router.post('/games/:code/choose-president', authenticateJwt, authenticateRoom, async (req, res) => {
  withGame(req, res, (game, user) => {
    if (game.phase !== phases.SPECIAL_ACTION_ELECTION) {
      return {
        error: 'this action cannot be performed during this phase'
      };
    }

    if (user.uuid !== game.president) {
      return {
        error: 'only the president can select the presidential candidate for the special election'
      };
    }

    const { uuid } = req.body;

    if (!includes(game.presidentOptions, uuid)) {
      return {
        error: 'cannot elect inactive player'
      };
    }

    return Actions.chooseSpecialElectionPresident(game, uuid);
  });
});

router.post('/games/:code/reset', async (req, res) => {
  const { code } = req.params;

  const game = await getGame(code);
  game.data = Actions.setupGame();
  await game.save();

  const { data } = game;

  res.send({ code, ...data });

  res.sendRoomEvent(code, 'room-reset');
});

module.exports = router;
