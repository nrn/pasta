var reduce = require('../reduce')

module.exports = combine

function combine () {
  return reduce(arguments, function (combined, obj) {
    return reduce(obj, function (combined, value, key) {
      combined[key] = value
      return combined
    }, combined)
  }, {})
}
