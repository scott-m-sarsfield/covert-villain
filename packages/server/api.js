const express = require('express');
const find = require('lodash/find');
const { v1: uuidv1 } = require('uuid');
const { Game: SequelizeGame } = require('./models');
const { getJwt, authenticateJwt, authenticateOptionalJwt } = require('./jwt');
const Actions = require('./game_actions');
const { phases } = require('./constants');
const serializeGame = require('./serialize_game');

async function getGame(code) {
  const [game] = await SequelizeGame.findOrCreate({
    where: {
      code
    },
    defaults: {
      code,
      data: Actions.setupGame()
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
    }

    code = code.toUpperCase();

    const game = await getGame(code);

    const existingPlayer = find(game.data.players, ({ name: existingName }) => {
      return existingName === name;
    });

    if (existingPlayer && uuid !== existingPlayer.uuid) {
      res.status(403).send('player already exists with that name');
      return;
    }

    if (!existingPlayer) {
      if (game.data.phase === phases.LOBBY) {
        uuid = uuidv1();
        game.data = Actions.joinGame(game.data, { name, uuid });
        await game.save();
        res.sendRoomEvent(code, 'refresh');
      } else {
        res.status(403).send('cannot join game in progress');
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
  } catch (err) {
    console.log(err); /* eslint-disable-line no-console */
    res.status(500).send(err);
  }
});

router.get('/games/:code', authenticateJwt, async (req, res) => {
  const game = await getGame(req.params.code);

  res.send(serializeGame(game, req.user));
});

async function withGame(req, res, fn) {
  try {
    const { roomCode, user } = req;
    const game = await getGame(roomCode);

    const gameData = fn(game.data, user);

    if (gameData.error) {
      res.status(400).send(gameData);
      return;
    }

    if (gameData !== game.data) {
      game.data = gameData;
      await game.save();
      res.sendRoomEvent(roomCode, 'refresh');
    }
    res.send({ status: 'ok' });
  } catch (err) {
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

router.post('/games/:code/start', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    if (game.players[0].uuid !== user.uuid) {
      return {
        error: 'you must be the host to start the game'
      };
    }
    if (game.players.length < 5 || game.players.length > 10) {
      return {
        error: 'must have between 5 and 10 players'
      };
    }

    return Actions.startGame(game);
  });
});

router.post('/games/:code/press-button', authenticateJwt, authenticateRoom, async (req, res) => {
  await withGame(req, res, (game, user) => {
    const { uuid } = user;

    return Actions.pressTheButton(game, uuid);
  });
});

router.post('/games/:code/reset', async (req, res) => {
  const { code } = req.params;

  const game = await getGame(code);
  game.data = Actions.setupGame();
  await game.save();

  res.send(serializeGame(game, req.user));

  res.sendRoomEvent(code, 'room-reset');
});

module.exports = router;
