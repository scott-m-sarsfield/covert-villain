const concat = require('lodash/concat');
const findIndex = require('lodash/findIndex');
const every = require('lodash/every');
const { v1: uuidv1 } = require('uuid');
const { phases } = require('./constants');

function splice(arr, start, nRemove, ...items) {
  return concat(arr.slice(0, start), Array.from(items), arr.slice(start + nRemove));
}

const initialGame = () => ({
  phase: phases.LOBBY,
  pressTheButton: {},
  notifications: [],
  players: [],
  uuid: uuidv1()
});

const Actions = {
  setupGame() {
    return initialGame();
  },

  joinGame(game, { name, uuid }) {
    return {
      ...game,
      players: concat(
        game.players,
        [
          {
            name,
            uuid
          }
        ]
      )
    };
  },

  leaveGame(game, uuid) {
    const { players } = game;
    const index = findIndex(players, { uuid });
    if (index >= 0) {
      game = {
        ...game,
        players: splice(players, index, 1)
      };
    }
    return game;
  },

  setupLobby(game) {
    return {
      ...game,
      phase: phases.LOBBY
    };
  },

  startGame(game) {
    game = this.clearNotifications(game);
    return this.setupPressTheButton(game);
  },

  setupPressTheButton(game) {
    const buttonPressed = {};
    game.players.forEach(({ uuid }) => {
      buttonPressed[uuid] = false;
    });

    return {
      ...game,
      phase: phases.PRESS_THE_BUTTON,
      pressTheButton: buttonPressed
    };
  },

  pressTheButton(game, uuid) {
    game = {
      ...game,
      pressTheButton: {
        ...game.pressTheButton,
        [uuid]: true
      }
    };

    if (every(game.pressTheButton)) {
      game = this.setupLobby(game);
      game = this.addNotification(game, 'Thanks.  That was a test.');
    }
    return game;
  },

  addNotification(game, text) {
    return {
      ...game,
      notifications: concat(game.notifications, [text])
    };
  },

  clearNotifications(game) {
    return {
      ...game,
      notifications: []
    };
  }
};

module.exports = Actions;
