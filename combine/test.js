var test = require('tape')
var combine = require('./index')

test('pasta/combine', function (t) {
  var a = { a: 'test', obj: 'ect' }
  var copyA = combine(a)
  var extended = combine(a, { a: 'shadowed', b: 'weee' })
  t.notEqual(copyA, a, 'Copy not referentially equal')
  t.same(copyA, a, 'But has the same contents')
  t.notSame(extended, a, 'Extended version has more in it')
  t.equal(extended.a, 'shadowed', 'a is shadowed')
  t.equal(extended.b, 'weee', 'b now exists')
  t.notOk(a.b, 'Original was not modified')
  t.end()
})
