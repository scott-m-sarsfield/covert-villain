const express = require('express');
const concat = require('lodash/concat');
const find = require('lodash/find');
const findIndex = require('lodash/findIndex');
const every = require('lodash/every');
const { v1: uuidv1 } = require('uuid');
const { Game } = require('./models');
const { getJwt, authenticateJwt, authenticateOptionalJwt } = require('./jwt');

function splice(arr, start, nRemove, ...items) {
  return concat(arr.slice(0, start), Array.from(items), arr.slice(start + nRemove));
}

const phases = {
  LOBBY: 'lobby',
  PRESS_THE_BUTTON: 'press_the_button'
};

const LobbyPhase = {
  init(game) {
    return {
      ...game,
      phase: {
        name: phases.LOBBY,
        data: null
      }
    };
  },
  empty() {
    return initialGame();
  },
  canJoin(game) {
    return game.phase.name === phases.LOBBY;
  }
};

const PressTheButtonPhase = {
  init(game) {
    const buttonPressed = {};
    game.players.forEach(({ uuid }) => {
      buttonPressed[uuid] = false;
    });

    return {
      ...game,
      phase: {
        name: phases.PRESS_THE_BUTTON,
        data: buttonPressed
      }
    };
  },
  press(game, playerUuid) {
    return {
      ...game,
      phase: {
        ...game.phase,
        data: {
          ...game.phase.data,
          [playerUuid]: true
        }
      }
    };
  },
  isComplete(game) {
    return every(game.phase.data);
  }
};

const Notification = {
  clear(game) {
    return {
      ...game,
      notifications: []
    };
  },
  add(game, text) {
    return {
      ...game,
      notifications: concat(game.notifications, [text])
    };
  }
};

const initialGame = () => ({
  phase: {
    name: phases.LOBBY,
    data: {}
  },
  notifications: [],
  players: [],
  uuid: uuidv1()
});

async function getGame(code) {
  const [game] = await Game.findOrCreate({
    where: {
      code
    },
    defaults: {
      code,
      data: initialGame()
    }
  });

  return game;
}

/* eslint-disable-next-line no-unused-vars */
function serializeGame(game, player) {
  const { code, data } = game;
  return {
    code,
    ...data
  };
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
      if (LobbyPhase.canJoin(game.data)) {
        uuid = uuidv1();
        game.data = {
          ...game.data,
          players: concat(
            game.data.players,
            [
              {
                name,
                uuid
              }
            ]
          )
        };
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

router.post('/games/:code/leave', authenticateJwt, authenticateRoom, async (req, res) => {
  const { uuid } = req.user;
  const { roomCode } = req;

  const game = await getGame(roomCode);
  const { data: { players }} = game;
  const index = findIndex(players, { uuid });
  if (index >= 0) {
    game.data = {
      ...game.data,
      players: splice(players, index, 1)
    };
    await game.save();
    res.send(serializeGame(game, req.user));
    res.sendRoomEvent(roomCode, 'refresh');
  }
});

router.post('/games/:code/start', authenticateJwt, authenticateRoom, async (req, res) => {
  const { roomCode } = req;
  const game = await getGame(roomCode);

  if (game.data.players[0].uuid !== req.user.uuid) {
    res.status(403).send('you must be the host to start the game');
    return;
  }
  game.data = Notification.clear(game.data);
  game.data = PressTheButtonPhase.init(game.data);

  await game.save();
  res.sendRoomEvent(roomCode, 'refresh');
  res.send({});
});

router.post('/games/:code/press-button', authenticateJwt, authenticateRoom, async (req, res) => {
  const { roomCode, user: { uuid }} = req;
  const game = await getGame(roomCode);

  game.data = PressTheButtonPhase.press(game.data, uuid);

  if (PressTheButtonPhase.isComplete(game.data)) {
    game.data = LobbyPhase.init(game.data);
    game.data = Notification.add(game.data, 'Thanks.  That was a test.');
  }

  await game.save();
  res.sendRoomEvent(roomCode, 'refresh');
  res.send({});
});

router.post('/games/:code/reset', async (req, res) => {
  const { code } = req.params;

  const game = await getGame(code);
  game.data = LobbyPhase.empty(game.data);
  await game.save();

  res.send(serializeGame(game, req.user));

  res.sendRoomEvent(code, 'room-reset');
});

module.exports = router;
