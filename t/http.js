var test = require('tape')
  , p = require('../pasta')()

test('HTTP tests', function (t) {
  t.plan(8)

  var ehres =
    { end: function (str) {
        t.equal(this.statusCode, 500, 'ErrorHandler statusCode')
        t.equal(str, 'Server doh!', 'ErrorHandler end call')
      }
    }

  var eh = p.errorHandler(ehres)

  eh('doh!')
  eh('doh!') // Shouldn't fire the second time

  var nyres =
    { end: function (str) {
        t.equal(this.statusCode, 404, 'notyet statusCode')
        t.equal(str, 'not found', 'notyet end call')
      }
    }

  p.notyet({}, nyres)

  var redirectres =
    { end: function (str) {
        t.equal(this.statusCode, 302, 'redirect statusCode')
        t.equal(str, undefined, 'redirect end call')
      }
    , setHeader: function (str, loc) {
        t.equal(str, 'location', 'redirect setHeader location')
        t.equal(loc, 'asdf', 'redirect setHeader loc')
      }
    }

  p.redirect('asdf')({}, redirectres)

})