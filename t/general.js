var p = require('../pasta')()
  , test = require('tape')

test('General', function (t) {
  var obj =
      { foo: 'bar'
      , asdf: 42
      , _default: 'blah'
      }
    , caseObj = p.casify(obj)
    , otherCase = p.casify(obj, 'doh')

  function add (a, b) {
    return a + b
  }

  t.plan(15)

  t.doesNotThrow(p.log, 'Log does not throw')

  t.equal(p.d('asdf'), 'asdf', 'Ident function')

  t.equal((function () {
      return p.arrify(arguments)
    })(1, 2, 3).join()
    , [1, 2, 3].join()
    , 'Turn array like objects into arrays'
  )

  t.equal(caseObj('foo'), 'bar', 'Existing case')
  t.equal(caseObj('weeeeee'), 'blah', 'Non-extant case')
  t.equal(otherCase('notThere'), 'doh', 'Non-extant explicit default')

  t.equal(p.one(add)('a', 'b'), 'aundefined', 'One uses only the first arg')

  var argComped = p.comp(JSON.stringify, Math.sqrt, parseInt)
  t.equal(argComped('25asdf'), '5', 'arguments Composed functions')

  var arrComped = p.comp([JSON.stringify, Math.sqrt,  parseInt])
  t.equal(arrComped('25asdf'), '5', 'array Composed functions')

  t.equal(p.get('foo')(obj), 'bar', 'Get property')

  t.equal([0,1,2,3].reduce(p.op('+')), 6, 'math operators')
  t.equal(p.op('<=')(1, 2), true, 'equality operators')
  t.equal(p.op('u+')('6'), 6, 'unary operators')
  t.equal(p.op('!')(true), false, 'logic operators')
  t.equal(p.op('')(12), 12, 'identity operator')


})
