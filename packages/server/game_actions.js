const concat = require('lodash/concat');
const findIndex = require('lodash/findIndex');
const every = require('lodash/every');
const shuffle = require('lodash/shuffle');
const range = require('lodash/range');
const reduce = require('lodash/reduce');
const filter = require('lodash/filter');
const find = require('lodash/find');
const get = require('lodash/get');
const { v1: uuidv1 } = require('uuid');
const { phases, notifications, roles, presidentialPowers } = require('./constants');
const { splice } = require('./util');

const initialGame = () => ({
  phase: phases.LOBBY,
  notifications: [],
  host: null,
  players: [],
  cards: {
    deck: [],
    hand: [],
    discard: [],
    redParty: [],
    blueParty: [],
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
  party: 'redParty' | 'blueParty',
  role: 'villain' | 'member',
  investigatedBy: null,
  alive: true,
  lobby: false,
  left: false
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
      host: game.host || uuid,
      players: concat(
        game.players,
        [
          {
            name,
            uuid,
            alive: true,
            lobby: true,
            playing: false
          }
        ]
      )
    };
  },

  leaveGame(game, uuid) {
    const { players } = game;
    const index = findIndex(players, { uuid });

    if (game.host === uuid) {
      game = {
        ...game,
        host: get(filter(game.players, (player) => {
          return player.uuid !== uuid && !player.left;
        }), '[0].uuid')
      };
    }

    if (game.phase === phases.LOBBY) {
      game = {
        ...game,
        players: splice(players, index, 1, {
          ...players[index],
          left: true
        })
      };
    } else {
      game = {
        ...game,
        players: splice(players, index, 1, {
          ...players[index],
          alive: false,
          left: true
        })
      };

      if (game.phase !== phases.LOBBY && !find(game.players, { role: roles.VILLAIN }).alive) {
        game = {
          ...game,
          phase: phases.LOBBY
        };
      }
    }

    return game;
  },

  startGame(game) {
    const { BLUE, RED, VILLAIN } = roles;

    const assignments = {
      5: [BLUE, BLUE, BLUE, RED, VILLAIN],
      6: [BLUE, BLUE, BLUE, BLUE, RED, VILLAIN],
      7: [BLUE, BLUE, BLUE, BLUE, RED, RED, VILLAIN],
      8: [BLUE, BLUE, BLUE, BLUE, BLUE, RED, RED, VILLAIN],
      9: [BLUE, BLUE, BLUE, BLUE, BLUE, RED, RED, RED, VILLAIN],
      10: [BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, RED, RED, RED, VILLAIN]
    };

    const { POLICY_PEEK, EXECUTION, INVESTIGATE_LOYALTY, SPECIAL_ELECTION } = presidentialPowers;

    const redBoards = {
      5: [null, null, POLICY_PEEK, EXECUTION, EXECUTION, null],
      6: [null, null, POLICY_PEEK, EXECUTION, EXECUTION, null],
      7: [null, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null],
      8: [null, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null],
      9: [INVESTIGATE_LOYALTY, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null],
      10: [INVESTIGATE_LOYALTY, INVESTIGATE_LOYALTY, SPECIAL_ELECTION, EXECUTION, EXECUTION, null]
    };

    let players = shuffle(filter(game.players, (player) => !player.left && player.lobby));

    const gameAssignments = shuffle(assignments[players.length]);

    players = players.map((player, index) => ({
      ...player,
      party: gameAssignments[index] === BLUE ? BLUE : RED,
      role: gameAssignments[index],
      investigatedBy: null,
      alive: true,
      lobby: false,
      playing: true
    }));

    game = {
      ...game,
      players,
      redBoard: redBoards[players.length],
      cards: {
        deck: shuffle(range(1, 17)),
        hand: [],
        discard: [],
        redParty: [],
        blueParty: []
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

        if (game.cards.redParty.length >= 3 && game.chancellor === find(game.players, { role: roles.VILLAIN }).uuid) {
          return {
            ...game,
            phase: phases.LOBBY
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
        chaos: game.chaos + 1,
        notifications: [
          ...game.notifications,
          {
            type: notifications.ELECTION_RESULTS,
            data: {
              votes: game.votes,
              failed: true,
              chaos: game.chaos >= 2
            }
          }
        ]
      };

      return this.checkChaosAndMaybeEnact(game);
    }

    return game;
  },

  checkChaosAndMaybeEnact(game) {
    if (game.chaos >= 3) {
      game = {
        ...game,
        president: null,
        chancellor: null
      };
      game = this.drawPolicies(game, 1);
      return this.enactPolicy(game, game.cards.hand[0], true);
    }

    return this.rotateToNextPresidentNominee(game);
  },

  rotateToNextPresidentNominee(game) {
    let presidentIndex = (game.presidentIndex + 1) % game.players.length;
    let presidentNominee = game.players[presidentIndex];

    for (let i = 0; i < game.players.length && !presidentNominee.alive; i++) {
      presidentIndex = (presidentIndex + 1) % game.players.length;
      presidentNominee = game.players[presidentIndex];
    }

    game = {
      ...game,
      presidentNominee: presidentNominee.uuid,
      presidentIndex
    };

    return this.prepareChancellorSelection(game);
  },

  prepareChancellorSelection(game) {
    const chancellorOptions = filter(game.players, ({ alive, uuid }) => {
      if (!alive) {
        return false;
      }
      if (uuid === game.president && filter(game.players, 'alive').length > 5) {
        return false;
      }
      if (uuid === game.chancellor || uuid === game.presidentNominee) {
        return false;
      }
      return true;
    }).map(({ uuid }) => uuid);

    return {
      ...game,
      phase: phases.PRESIDENT_CHOOSES_CHANCELLOR,
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
          redParty: [...game.cards.redParty, card]
        }
      };

      if (game.cards.redParty.length >= 6) {
        return {
          ...game,
          phase: phases.LOBBY
        };
      }

      const presidentialPower = game.redBoard[game.cards.redParty.length - 1];

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
        if (presidentialPower === presidentialPowers.INVESTIGATE_LOYALTY) {
          return {
            ...game,
            phase: phases.SPECIAL_ACTION_INVESTIGATE_LOYALTY,
            investigateOptions: game.players.filter(
              (player) => !player.investigatedBy && player.alive && player.uuid !== game.president
            ).map(({ uuid }) => uuid)
          };
        }
        if (presidentialPower === presidentialPowers.SPECIAL_ELECTION) {
          return {
            ...game,
            phase: phases.SPECIAL_ACTION_ELECTION,
            presidentOptions: game.players.filter(
              (player) => player.alive && player.uuid !== game.president
            ).map(({ uuid }) => uuid)
          };
        }
      }
    } else {
      game = {
        ...game,
        cards: {
          ...game.cards,
          blueParty: [...game.cards.blueParty, card]
        }
      };

      if (game.cards.blueParty.length >= 5) {
        return {
          ...game,
          phase: phases.LOBBY
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

    if (!find(game.players, { role: roles.VILLAIN }).alive) {
      return {
        ...game,
        phase: phases.LOBBY
      };
    }

    return this.rotateToNextPresidentNominee(game);
  },

  investigate(game, uuid) {
    game = {
      ...game,
      players: game.players.map((player) => {
        if (player.uuid === uuid) {
          return {
            ...player,
            investigatedBy: game.president
          };
        }
        return player;
      }),
      notifications: [
        ...game.notifications,
        {
          type: notifications.INVESTIGATION,
          data: {
            president: game.president,
            player: uuid
          }
        }
      ]
    };

    return this.rotateToNextPresidentNominee(game);
  },

  chooseSpecialElectionPresident(game, uuid) {
    game = {
      ...game,
      presidentNominee: uuid
    };

    return this.prepareChancellorSelection(game);
  },

  vetoPolicies(game) {
    return {
      ...game,
      phase: phases.PRESIDENT_APPROVES_VETO
    };
  },

  denyVeto(game) {
    return {
      ...game,
      phase: phases.CHANCELLOR_CHOOSES_POLICY
    };
  },

  approveVeto(game) {
    game = {
      ...game,
      cards: {
        ...game.cards,
        discard: [...game.cards.discard, ...game.cards.hand],
        hand: []
      },
      chaos: game.chaos + 1,
      notifications: [
        ...game.notifications,
        {
          type: notifications.VETO
        }
      ]
    };

    return this.checkChaosAndMaybeEnact(game);
  },

  goToLobby(game, uuid) {
    return {
      ...game,
      players: game.players.map((player) => {
        if (player.uuid === uuid) {
          return {
            ...player,
            lobby: true
          };
        }

        return player;
      })
    };
  }
};

module.exports = Actions;
