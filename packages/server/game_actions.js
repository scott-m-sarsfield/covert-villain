const concat = require('lodash/concat');
const findIndex = require('lodash/findIndex');
const every = require('lodash/every');
const shuffle = require('lodash/shuffle');
const range = require('lodash/range');
const { v1: uuidv1 } = require('uuid');
const { phases, notifications, roles } = require('./constants');
const { splice } = require('./util');

const initialGame = () => ({
  phase: phases.LOBBY,
  pressTheButton: {},
  notifications: [],
  players: [],
  cards: {
    deck: [],
    hand: [],
    discard: [],
    fascist: [],
    liberal: []
  },
  president: null,
  chancellor: null,
  votes: {},
  chaos: 0,
  uuid: uuidv1()
});

/*
Player {
  uuid: "",
  name: "",
  party: 'fascist' | 'liberal',
  role: 'mussolini' | 'member',
  investigatedBy: [],
  alive: true
}

  Vote [uuid => obj] {
    voted: false,
    approved: null
  }
 */

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
    const { LIBERAL, FASCIST, MUSSOLINI } = roles;

    const assignments = {
      5: [LIBERAL, LIBERAL, LIBERAL, FASCIST, MUSSOLINI],
      6: [LIBERAL, LIBERAL, LIBERAL, LIBERAL, FASCIST, MUSSOLINI],
      7: [LIBERAL, LIBERAL, LIBERAL, LIBERAL, FASCIST, FASCIST, MUSSOLINI],
      8: [LIBERAL, LIBERAL, LIBERAL, LIBERAL, LIBERAL, FASCIST, FASCIST, MUSSOLINI],
      9: [LIBERAL, LIBERAL, LIBERAL, LIBERAL, LIBERAL, FASCIST, FASCIST, FASCIST, MUSSOLINI],
      10: [LIBERAL, LIBERAL, LIBERAL, LIBERAL, LIBERAL, LIBERAL, FASCIST, FASCIST, FASCIST, MUSSOLINI]
    };

    const gameAssignments = shuffle(assignments[game.players.length]);

    const players = game.players.map((player, index) => ({
      ...player,
      party: gameAssignments[index] === LIBERAL ? LIBERAL : FASCIST,
      role: gameAssignments[index],
      investigatedBy: [],
      alive: true
    }));

    return {
      ...game,
      phase: phases.PRESIDENT_CHOOSES_CHANCELLOR,
      players,
      cards: {
        deck: shuffle(range(1, 17)),
        hand: [],
        discard: [],
        fascist: [],
        liberal: []
      },
      notifications: [
        {
          type: notifications.PARTY_ASSIGNMENT
        }
      ],
      president: players[0].uuid
    };
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
  }
};

module.exports = Actions;
