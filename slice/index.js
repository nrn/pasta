var _slice = Array.prototype.slice

module.exports = slice

function slice (arr, start, end) {
  return _slice.call(arr, start, end)
}
