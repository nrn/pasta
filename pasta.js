// pasta.js
var genPasta = require('gen-pasta')
  , fnPasta = require('fn-pasta')
  , httpPasta = require('http-pasta')

function Pasta (opts) {
  var o = { combine: combine }
    , gp = genPasta(opts)
    , fp = fnPasta(opts)
    , hp = httpPasta(opts)

  function combine (obj, old) {
    Object.keys(obj).forEach(function (key) {
      old[key] = obj[key]
    })
    return old
  }

  return [ hp, fp, gp ].reduce(combine, o)

}

if (module && module.exports) module.exports = Pasta

