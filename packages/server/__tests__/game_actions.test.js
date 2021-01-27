const Actions = require('../game_actions');
const { phases } = require('../constants');

describe('drawPolicies', () => {
  it('draws a number of cards from the deck and puts them in the hand', () => {
    const game = {
      cards: {
        deck: [17, 15, 13, 11, 9, 7, 5, 3, 1],
        discard: [16, 14, 12, 10, 8, 6, 4, 2],
        liberal: [],
        fascist: [],
        hand: []
      }
    };

    const updatedGame = Actions.drawPolicies(game, 3);

    expect(updatedGame).toEqual({
      cards: {
        deck: [11, 9, 7, 5, 3, 1],
        discard: [16, 14, 12, 10, 8, 6, 4, 2],
        liberal: [],
        fascist: [],
        hand: [17, 15, 13]
      }
    });
  });

  describe('when there are not enough cards in the deck', () => {
    it('shuffles in the discard pile and draws card as usual', () => {
      const game = {
        cards: {
          deck: [17, 15],
          discard: [16, 14, 12, 10, 8, 6, 4, 2, 13, 11, 9, 7, 5, 3, 1],
          liberal: [],
          fascist: [],
          hand: []
        }
      };

      const updatedGame = Actions.drawPolicies(game, 3);

      expect(updatedGame).toEqual({
        cards: expect.objectContaining({
          discard: [],
          liberal: [],
          fascist: []
        })
      });
      expect(updatedGame.cards.deck).toHaveLength(14);
      expect(updatedGame.cards.hand).toHaveLength(3);
      expect([...updatedGame.cards.deck, ...updatedGame.cards.hand]).toEqual(
        expect.arrayContaining([
          ...game.cards.deck,
          ...game.cards.discard
        ])
      );
    });
  });
});

describe('rotateToNextPresidentNominee', () => {
  const names = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];
  function createPlayerList(aliveStates) {
    return aliveStates.map((alive, i) => ({
      uuid: String(i + 1),
      name: names[i],
      alive
    }));
  }
  function createGame({
    presidentIndex = 1,
    president = null,
    chancellor = null,
    players = createPlayerList([true, true, true, true, true])
  } = {}) {
    return {
      phase: phases.LOBBY,
      president,
      chancellor,
      presidentNominee: null,
      chancellorNominee: null,
      chancellorOptions: [],
      presidentIndex,
      players
    };
  }

  it('rotates to the next player to be president nominee', () => {
    const game = createGame();
    const updatedGame = Actions.rotateToNextPresidentNominee(game);

    expect(updatedGame).toEqual(expect.objectContaining({
      phase: phases.PRESIDENT_CHOOSES_CHANCELLOR,
      presidentNominee: '3',
      presidentIndex: 2,
      chancellorOptions: ['1', '2', '4', '5']
    }));
  });

  it('rotates to the first player from the last player', () => {
    const game = createGame({ presidentIndex: 4 });
    const updatedGame = Actions.rotateToNextPresidentNominee(game);
    expect(updatedGame).toEqual(expect.objectContaining({
      phase: phases.PRESIDENT_CHOOSES_CHANCELLOR,
      presidentNominee: '1',
      presidentIndex: 0,
      chancellorOptions: ['2', '3', '4', '5']
    }));
  });

  it('skips dead players', () => {
    const game = createGame({ players: createPlayerList([true, true, false, true, true]) });
    const updatedGame = Actions.rotateToNextPresidentNominee(game);

    expect(updatedGame).toEqual(expect.objectContaining({
      presidentNominee: '4',
      presidentIndex: 3,
      chancellorOptions: ['1', '2', '5']
    }));
  });

  it('omits the last elected chancellor from options', () => {
    const game = createGame({ chancellor: '2' });
    const updatedGame = Actions.rotateToNextPresidentNominee(game);

    expect(updatedGame).toEqual(expect.objectContaining({
      chancellorOptions: ['1', '4', '5']
    }));
  });

  it('omits dead players from chancellor options', () => {
    const game = createGame({ players: createPlayerList([false, false, true, true, true]) });
    const updatedGame = Actions.rotateToNextPresidentNominee(game);

    expect(updatedGame).toEqual(expect.objectContaining({
      chancellorOptions: ['4', '5']
    }));
  });

  describe('when there are more than 5 players alive', () => {
    it('omits the last elected president from options', () => {
      const game = createGame({
        players: createPlayerList([true, true, true, true, true, true]),
        president: '2'
      });
      const updatedGame = Actions.rotateToNextPresidentNominee(game);

      expect(updatedGame).toEqual(expect.objectContaining({
        chancellorOptions: ['1', '4', '5', '6']
      }));
    });
  });

  describe('when there are 5 or fewer players alive', () => {
    it('includes the last elected president in options', () => {
      const game = createGame({
        players: createPlayerList([true, true, true, true, false, true]),
        president: '2'
      });
      const updatedGame = Actions.rotateToNextPresidentNominee(game);

      expect(updatedGame).toEqual(expect.objectContaining({
        chancellorOptions: ['1', '2', '4', '6']
      }));
    });
  });
});
