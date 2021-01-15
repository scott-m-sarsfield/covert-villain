const express = require('express');
const jwt = require('jsonwebtoken');
const { Game } = require('./models');
const get = require('lodash/get');
const concat = require('lodash/concat');
const compact = require('lodash/compact');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const lowerCase = require('lodash/lowerCase');
const {v1: uuidv1} = require('uuid');

const JWT_SECRET = 'not-in-prod';

function getJwt({roomCode, roomId, name}){
  return jwt.sign({roomCode, roomId, name}, JWT_SECRET);
}

const initialGame = () => ({
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

function createRouter(io){
  function sendRefreshSignal(roomCode){
    console.log('sending refresh signal to', roomCode);
    io.to(roomCode).emit('refresh');
  }

  const router = express.Router();
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }))

  router.post('/games/:code/reset', async (req, res)=> {
    const {code} = req.params;
    const game = await getGame(code);
    game.data = {...initialGame()};
    await game.save();

    res.send(game);
    sendRefreshSignal(code);
  })

  router.post('/games/:code/join', async (req, res) => {
    const {code} = req.params;
    const game = await getGame(code);
    const { name } = req.body;
    game.data = {
      ...game.data,
      players: compact(uniq(map(concat(game.data.players, name), lowerCase)))
    }
    await game.save();

    res.send({
      token: getJwt({roomCode: code, name, roomId: game.data.uuid}),
      game
    });
    sendRefreshSignal(code);
  })

  router.post('/games/:code/increment', async (req, res) => {
    const game = await getGame(req.params.code);
    game.data = {
      ...game.data,
      value: get(game, 'data.value', 0) + 1
    }
    await game.save();

    res.send(game);
  })

  router.get('/games/:code', async (req,res) => {
    const game = await getGame(req.params.code);

    res.send(game);
  })

  return router;
}

module.exports = createRouter;
