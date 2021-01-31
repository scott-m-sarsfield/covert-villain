const request = require('supertest');
const express = require('express');
const { sequelize } = require('../models');
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
  describe('when jwt is missing', () => {
    function post(url, params) {
      return request(app).post(url).send(params);
    }

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
});
