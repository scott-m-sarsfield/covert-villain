const Actions = require('../game_actions');

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
