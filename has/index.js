var _has = Object.prototype.hasOwnProperty

module.exports = has

function has (object, key) {
  return _has.call(object, key)
}
