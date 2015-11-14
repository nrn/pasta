var test = require('tape')
var get = require('./index')

test('pasta/get', function (t) {
  t.equal(get('foo')({foo: 'bar'}), 'bar', 'Get property')
  t.end()
})
