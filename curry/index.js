module.exports = curry

function curry (fn, times) {
  if (typeof times === 'undefined') {
    times = (fn.length > 1 ? fn.length : 2)
  }
  var args = []
  return function currying (arg) {
    args.push(arg)
    if (args.length === times) return fn.apply(this, args)
    return currying
  }
}

