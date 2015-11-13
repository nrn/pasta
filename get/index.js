module.exports = get

function get (key) {
  return function (obj) {
    return obj[key]
  }
}

