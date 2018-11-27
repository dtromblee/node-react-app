const _ = require('lodash');

class Helpers {
  static topId(data) {
      return _.maxBy(data, obj => { return obj.id; }).id;
  }
}

module.exports = Helpers;
