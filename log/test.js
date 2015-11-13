var test = require('tape')
var log = require('.')

var testLog = '# test log'

test('pasta/log', function (t) {
  t.equal(log(testLog), testLog, 'Log returns its argument')
  t.end()
})
