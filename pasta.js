// pasta.js
var genPasta = require('gen-pasta')
  , fnPasta = require('fn-pasta')
  , httpPasta = require('http-pasta')

function Pasta (opts) {
  var gp = genPasta(opts)
    , fp = fnPasta(opts)
    , hp = httpPasta(opts)

  return [ hp, fp, gp ].reduce(gp.combine, {})

}

if (module && module.exports) module.exports = Pasta

