const concat = require('lodash/concat');
const findIndex = require('lodash/findIndex');
const every = require('lodash/every');
const shuffle = require('lodash/shuffle');
const range = require('lodash/range');
const reduce = require('lodash/reduce');
const filter = require('lodash/filter');
const find = require('lodash/find');
const { v1: uuidv1 } = require('uuid');
const { phases, notifications, roles, presidentialPowers } = require('./constants');
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
    liberal: [],
    peek: []
  },
  presidentIndex: 0,
  president: null,
  chancellor: null,
  presidentNominee: null,
  chancellorOptions: [],
  chancellorNominee: null,
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
            uuid,
            alive: true
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

    const { POLICY_PEEK, EXECUTION, INVESTIGATE_LOYALTY, SPECIAL_ELECTION } = presidentialPowers;

    const fascistBoards = {
      5: [null, null, POLICY_PEEK, EXECUTION, EXECUTION, null],
      6: [null, null, POLICY_PEEK, EXECUTION, EXECUTION, null],
      7: [null, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null],
      8: [null, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null],
      9: [INVESTIGATE_LOYALTY, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null],
      10: [INVESTIGATE_LOYALTY, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null]
    };

    const gameAssignments = shuffle(assignments[game.players.length]);

    const players = game.players.map((player, index) => ({
      ...player,
      party: gameAssignments[index] === LIBERAL ? LIBERAL : FASCIST,
      role: gameAssignments[index],
      investigatedBy: [],
      alive: true
    }));

    game = {
      ...game,
      players,
      fascistBoard: fascistBoards[game.players.length],
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
      presidentIndex: -1,
      president: null,
      chancellor: null,
      chancellorNominee: null,
      chancellorOptions: [],
      votes: {}
    };

    return this.rotateToNextPresidentNominee(game);
  },

  chooseChancellor(game, uuid) {
    const votes = {};

    game.players.forEach(({ uuid, alive }) => {
      if (alive) {
        votes[uuid] = {
          voted: false,
          approved: false
        };
      }
    });

    return {
      ...game,
      phase: phases.ELECTION,
      chancellorNominee: uuid,
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
        game = {
          ...game,
          president: game.presidentNominee,
          chancellor: game.chancellorNominee,
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

        if (game.cards.fascist.length >= 3 && game.chancellor === find(game.players, { role: roles.MUSSOLINI }).uuid) {
          return {
            ...game,
            phase: phases.GAME_OVER
          };
        }

        game = this.drawPolicies(game, 3);

        return {
          ...game,
          phase: phases.PRESIDENT_CHOOSES_POLICIES
        };
      }

      game = {
        ...game,
        chaos: game.chaos + 1
      };

      if (game.chaos >= 3) {
        game = {
          ...game,
          president: null,
          chancellor: null,
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
        return this.enactPolicy(game, game.cards.hand[0], true);
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

      return this.rotateToNextPresidentNominee(game);
    }

    return game;
  },

  rotateToNextPresidentNominee(game) {
    let presidentIndex = (game.presidentIndex + 1) % game.players.length;
    let presidentNominee = game.players[presidentIndex];

    for (let i = 0; i < game.players.length && !presidentNominee.alive; i++) {
      presidentIndex = (presidentIndex + 1) % game.players.length;
      presidentNominee = game.players[presidentIndex];
    }

    const presidentNomineeUuid = presidentNominee.uuid;

    const chancellorOptions = filter(game.players, ({ alive, uuid }) => {
      if (!alive) {
        return false;
      }
      if (uuid === game.president && filter(game.players, 'alive').length > 5) {
        return false;
      }
      if (uuid === game.chancellor || uuid === presidentNomineeUuid) {
        return false;
      }
      return true;
    }).map(({ uuid }) => uuid);

    return {
      ...game,
      phase: phases.PRESIDENT_CHOOSES_CHANCELLOR,
      presidentIndex,
      presidentNominee: presidentNomineeUuid,
      chancellorOptions
    };
  },

  drawPolicies(game, n) {
    if (game.cards.deck.length < n) {
      game = {
        ...game,
        cards: {
          ...game.cards,
          deck: shuffle([...game.cards.deck, ...game.cards.discard]),
          discard: []
        }
      };
    }
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
        hand: filter(game.cards.hand, (handCard) => handCard !== card),
        discard: [...game.cards.discard, card]
      }
    };
  },

  enactPolicy(game, card, skipPower = false) {
    const discardedCards = filter(game.cards.hand, (handCard) => handCard !== card);
    game = {
      ...game,
      chaos: 0,
      cards: {
        ...game.cards,
        hand: [],
        discard: [...game.cards.discard, ...discardedCards]
      },
      notifications: [
        ...game.notifications,
        {
          type: notifications.POLICY_ENACTED,
          data: {
            card
          }
        }
      ]
    };

    if (card < 11) {
      game = {
        ...game,
        cards: {
          ...game.cards,
          fascist: [...game.cards.fascist, card]
        }
      };

      if (game.cards.fascist.length >= 6) {
        return {
          ...game,
          phase: phases.GAME_OVER
        };
      }

      const presidentialPower = game.fascistBoard[game.cards.fascist.length - 1];

      if (presidentialPower && !skipPower) {
        if (presidentialPower === presidentialPowers.POLICY_PEEK) {
          game = this.drawPolicies(game, 3); // to ensure at least 3 cards in deck
          return {
            ...game,
            cards: {
              ...game.cards,
              deck: [...game.cards.hand, ...game.cards.deck],
              hand: [],
              peek: game.cards.hand
            },
            phase: phases.SPECIAL_ACTION_POLICY_PEEK
          };
        }
        if (presidentialPower === presidentialPowers.EXECUTION) {
          return {
            ...game,
            phase: phases.SPECIAL_ACTION_EXECUTION
          };
        }
      }
    } else {
      game = {
        ...game,
        cards: {
          ...game.cards,
          liberal: [...game.cards.liberal, card]
        }
      };

      if (game.cards.liberal.length >= 5) {
        return {
          ...game,
          phase: phases.GAME_OVER
        };
      }
    }

    return this.rotateToNextPresidentNominee(game);
  },

  endPolicyPeek(game) {
    game = {
      ...game,
      cards: {
        ...game.cards,
        peek: []
      }
    };
    return this.rotateToNextPresidentNominee(game);
  },

  executePlayer(game, uuid) {
    game = {
      ...game,
      players: game.players.map((player) => {
        if (player.uuid === uuid) {
          return {
            ...player,
            alive: false
          };
        }

        return player;
      }),
      notifications: [
        ...game.notifications,
        {
          type: notifications.EXECUTION,
          data: { uuid }
        }
      ]
    };

    if (!find(game.players, { role: roles.MUSSOLINI }).alive) {
      return {
        ...game,
        phase: phases.GAME_OVER
      };
    }

    return this.rotateToNextPresidentNominee(game);
  }
};

module.exports = Actions;
