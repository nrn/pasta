var test = require('tape')
var curry = require('./index')

function addd (a, b, c) {
  return a + b +c
}
function sum () {
  return Array.prototype.slice.call(arguments).reduce(function (total, num) {
    return total + num
  }, 0)
}

test('pasta/curry', function (t) {
  t.equal(curry(addd)(1)(2)(3), 6, 'Curry number of args defined')
  t.equal(curry(sum)(1)(2), 3, 'Curry twice for undefined args')
  t.equal(curry(sum, 5)(1)(2)(3)(4)(5), 15, 'Curry 5 times')
  t.end()
})

