const concat = require('lodash/concat');
const findIndex = require('lodash/findIndex');
const every = require('lodash/every');
const shuffle = require('lodash/shuffle');
const range = require('lodash/range');
const reduce = require('lodash/reduce');
const filter = require('lodash/filter');
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
  presidentIndex: 0,
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

  chooseChancellor(game, uuid) {
    const votes = {};

    game.players.forEach(({ uuid }) => {
      votes[uuid] = {
        voted: false,
        approved: false
      };
    });

    return {
      ...game,
      phase: phases.ELECTION,
      chancellor: uuid,
      votes
    };
  },

  vote(game, { uuid, approved }) {
    game = {
      ...game,
      votes: {
        ...game.votes,
        [uuid]: {
          voted: true,
          approved: !!approved
        }
      }
    };

    if (every(game.votes, ({ voted }) => voted)) {
      const netApproval = reduce(game.votes, (netApproval, { approved }) => {
        if (approved) {
          return netApproval + 1;
        }
        return netApproval - 1;
      }, 0);

      if (netApproval > 0) {
        game = this.drawPolicies(game, 3);
        return {
          ...game,
          phase: phases.PRESIDENT_CHOOSES_POLICIES,
          notifications: [
            ...game.notifications,
            {
              type: notifications.ELECTION_RESULTS,
              data: {
                votes: game.votes,
                success: true
              }
            }
          ]
        };
      }

      game = {
        ...game,
        chaos: game.chaos + 1
      };

      if (game.chaos >= 3) {
        game = {
          ...game,
          notifications: [
            ...game.notifications,
            {
              type: notifications.ELECTION_RESULTS,
              data: {
                votes: game.votes,
                failed: true,
                chaos: true
              }
            }
          ]
        };
        game = this.drawPolicies(game, 1);
        return this.enactPolicy(game, game.cards.hand[0]);
      }

      game = {
        ...game,
        notifications: [
          ...game.notifications,
          {
            type: notifications.ELECTION_RESULTS,
            data: {
              votes: game.votes,
              failed: true
            }
          }
        ]
      };

      return this.rotateToNextPresident(game);
    }

    return game;
  },

  rotateToNextPresident(game) {
    const presidentIndex = (game.presidentIndex + 1) % game.players.length;
    return {
      ...game,
      phase: phases.PRESIDENT_CHOOSES_CHANCELLOR,
      presidentIndex,
      president: game.players[presidentIndex].uuid
    };
  },

  drawPolicies(game, n) {
    return {
      ...game,
      cards: {
        ...game.cards,
        hand: game.cards.deck.slice(0, n),
        deck: game.cards.deck.slice(n)
      }
    };
  },

  discardPolicy(game, card) {
    return {
      ...game,
      phase: phases.CHANCELLOR_CHOOSES_POLICY,
      cards: {
        ...game.cards,
        hand: filter(game.cards.filter, (handCard) => handCard !== card),
        discard: [...game.cards.discard, card]
      }
    };
  },

  enactPolicy(game, card) {
    const discardedCards = filter(game.cards.hand, (handCard) => handCard !== card);
    game = {
      ...game,
      chaos: 0,
      cards: {
        ...game.cards,
        hand: [],
        discard: [...game.cards.discard, ...discardedCards]
      }
    };

    if (card < 11) {
      game = {
        ...game,
        cards: {
          ...game.cards,
          fascist: [...game.cards.fascist, card]
        }
      };
    } else {
      game = {
        ...game,
        cards: {
          ...game.cards,
          liberal: [...game.cards.liberal, card]
        }
      };
    }

    return this.rotateToNextPresident(game);
  }
};

module.exports = Actions;
