var test = require('tape')
var has = require('./index')

test('pasta/has', function (t) {
  t.equal(has({foo: 'bar'}, 'foo'), true, 'does it have this property?')
  t.equal(has({foo: 'bar'}, 'toString'), false, 'does not look at proto')
  t.end()
})
