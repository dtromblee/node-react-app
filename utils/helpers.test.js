const assert = require('assert');
const Helpers = require('./helpers');

describe('Helpers', () => {
  describe('#topId()', () => {
    var data = [
      {
        id: 1,
        name: "Tod"
      },
      {
        id: 10,
        name: "Bart"
      },
      {
        id: 21,
        name: "Philbert"
      }
    ];

    it('should return the highest id property in the object array', () => {
      assert.equal(Helpers.topId(data), 21);
    });
  })
})
