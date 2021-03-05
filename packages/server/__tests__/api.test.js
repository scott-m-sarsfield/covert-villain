const request = require('supertest');
const express = require('express');
const { sub } = require('date-fns');
const { sequelize, Game } = require('../models');
const api = require('../api');

const app = express();
const sendRoomEvent = jest.fn();

app.use(
  '/api',
  (req, res, next) => {
    res.sendRoomEvent = sendRoomEvent;
    next();
  },
  api
);

beforeEach(() => {
  sendRoomEvent.mockReset();
  return sequelize.sync({ force: true });
});

describe('/games/join', () => {
  function post(url, params) {
    return request(app).post(url).send(params);
  }

  describe('when jwt is missing', () => {
    it('adds the player to the game and sends a signal to refresh the room', async () => {
      const response = await post('/api/games/join', { name: 'Alpha', code: 'abxgyp' });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        game: expect.objectContaining({
          players: expect.arrayContaining([
            expect.objectContaining({
              name: 'Alpha',
              uuid: expect.anything()
            })
          ])
        }),
        user: expect.objectContaining({
          name: 'Alpha',
          roomCode: 'ABXGYP'
        }),
        token: expect.anything()
      });

      expect(sendRoomEvent).toHaveBeenCalledWith('ABXGYP', 'refresh');
    });
  });

  describe('when trying to join an active game', () => {
    it('should deny the user from joining', async () => {
      await Game.create({
        code: 'ABXGYP',
        data: {
          phase: 'president_chooses_chancellor'
        },
        updatedAt: sub(new Date(), { minutes: 58 }),
        createdAt: sub(new Date(), { days: 1 })
      }, { silent: true });

      const response = await post('/api/games/join', { name: 'Alpha', code: 'ABXGYP' });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        error: 'cannot join game in progress'
      });
    });
  });

  describe('when a game with the same code has been abandoned', () => {
    it('should reset the game with the joining player as host', async () => {
      await Game.create({
        code: 'ABXGYP',
        data: {
          phase: 'president_chooses_chancellor'
        },
        updatedAt: sub(new Date(), { hours: 2 }),
        createdAt: sub(new Date(), { days: 1 })
      }, { silent: true });

      const response = await post('/api/games/join', { name: 'Alpha', code: 'ABXGYP' });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        game: expect.objectContaining({
          players: expect.arrayContaining([
            expect.objectContaining({
              name: 'Alpha',
              uuid: expect.anything()
            })
          ])
        }),
        user: expect.objectContaining({
          name: 'Alpha',
          roomCode: 'ABXGYP'
        }),
        token: expect.anything()
      });
    });
  });
});
