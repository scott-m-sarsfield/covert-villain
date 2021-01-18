const express = require('express');
const { Game } = require('./models');
const concat = require('lodash/concat');
const find = require('lodash/find');
const findIndex = require('lodash/findIndex');
const {v1: uuidv1} = require('uuid');
const {getJwt, authenticateJwt, authenticateOptionalJwt} = require('./jwt');

function splice(arr, start, nRemove, ...items){
  return concat(arr.slice(0, start), Array.from(items), arr.slice(start+nRemove));
}

const phases = {
  LOBBY: 'lobby',
  PRESS_THE_BUTTON: 'press_the_button'
};

const initialGame = () => ({
  phase: phases.LOBBY,
  uuid: uuidv1(),
  value: 0,
  players: []
});

async function getGame(code){
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

function serializeGame(game, player){
  const {code, data} = game;
  return {
    code,
    ...data
  };
}

function authenticateRoom(req, res, next){
  const {roomCode} = req.user;
  const {code} = req.params;
  if(roomCode !== code){
    res.sendStatus(403);
    return;
  }
  req.roomCode = code.toUpperCase();
  next();
}

function createRouter(io){
  function sendRefreshSignal(roomCode){
    console.log('sending refresh signal to', roomCode);
    io.to(roomCode).emit('refresh');
  }

  const router = express.Router();
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }))

  router.post('/games/:code/identify', authenticateJwt, async(req, res) => {
    res.send(req.user);
  })

  router.post('/games/:code/reset', authenticateJwt, authenticateRoom, async (req, res)=> {
    const {roomCode} = req;

    const game = await getGame(roomCode);
    game.data = {...initialGame()};
    await game.save();

    res.send(serializeGame(game, req.user));
    sendRefreshSignal(roomCode);
  })

  router.post('/games/join', authenticateOptionalJwt, async (req, res) => {
    let { name, code, uuid } = req.body;

    if(req.user) {
      name = req.user.name;
      code = req.user.roomCode;
      uuid = req.user.uuid;
    }

    code = code.toUpperCase();

    const game = await getGame(code);

    const existingPlayer = find(game.data.players, ({name: existingName}) => {
      return existingName === name;
    })

    if(existingPlayer && uuid !== existingPlayer.uuid){
      res.status(403).send('player already exists with that name');
      return;
    }

    if(!existingPlayer) {
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
      }
      await game.save();
      sendRefreshSignal(code);
    }

    const user = {
      roomCode: code,
      roomId: game.data.uuid,
      name,
      uuid
    }

    res.send({
      token: getJwt(user),
      user,
      game: serializeGame(game, user)
    });
  })

  router.post('/games/:code/leave', authenticateJwt, authenticateRoom, async (req,res) => {
    const {uuid} = req.user;
    const {roomCode} = req;

    const game = await getGame(roomCode);
    const {data: {players}} = game;
    const index = findIndex(players, {uuid})
    if(index >= 0){
      game.data = {
        ...game.data,
        players: splice(players, index, 1)
      };
      await game.save();
      res.send(serializeGame(game, req.user));
      sendRefreshSignal(roomCode);
    }
  })

  router.get('/games/:code', authenticateJwt, async (req,res) => {
    const game = await getGame(req.params.code);

    res.send(serializeGame(game, req.user));
  })

  return router;
}

module.exports = createRouter;
