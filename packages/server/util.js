const concat = require('lodash/concat');

function splice(arr, start, nRemove, ...items) {
  return concat(arr.slice(0, start), Array.from(items), arr.slice(start + nRemove));
}

module.exports = {
  splice
};
