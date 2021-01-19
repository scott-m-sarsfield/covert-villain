const { splice } = require('../util');

describe('splice', () => {
  describe('when array is valid', () => {
    it('works as a safe splice', () => {
      const arr = [1, 2, 3];
      const splicedArr = splice(arr, 1, 1, 4);
      expect(splicedArr).toEqual([1, 4, 3]);
      expect(arr).toEqual([1, 2, 3]);
    });
  });
});
