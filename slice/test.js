var test = require('tape')
var slice = require('./index')

test('pasta/slice', function (t) {
  var argsEqualToT = slice(arguments).map(function (arg) {
    return arg === t
  })
  t.equal(argsEqualToT.length, 1, 'one arg')
  t.equal(argsEqualToT[0], true, 'one arg is t')
  t.equal(slice([0, 1, 2, 3], 2, 3)[0], 2, 'slices out 2')
  t.end()
})
