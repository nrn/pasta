var test = require('tape')
var op = require('./index')

test('pasta/op', function (t) {
  t.equal([0,1,2,3].reduce(op['+']), 6, 'math operators')
  t.equal(op['<='](1, 2), true, 'equality operators')
  t.equal(op['u+']('6'), 6, 'unary operators')
  t.equal(op['!'](true), false, 'logic operators')
  t.end()
})

