// pasta.js

function Pasta (opts) {
  var utils =
    { log: log
    , l: log
    , arrify: arrify
    , get: get
    , casify: casify
    , d: d
    , comp: comp
    , one: one
    }

  // GENERAL Functions
  function comp (args) {
    if (!Array.isArray(args)) args = arrify(arguments)
    return function (input) {
      return args.reduceRight(function (last, cur) {
        return cur(last)
      }, input)
    }
  }

  function one (func) {
    return function (arg) {
      return func(arg)
    }
  }

  function casify (obj, def) {
    return function (cas) {
      var val = obj[cas]
      if (typeof val === 'undefined') {
        if (typeof def !== 'undefined') val = def
        else if (typeof obj._default !== 'undefined') val = obj._default
        else val = obj['default']
      }
      return val
    }
  }

  function d (arg) {
    return arg
  }

  function get (key) {
    return function (obj) {
      return obj[key]
    }
  }

  function arrify (arr) {
    return Array.prototype.slice.apply(arr)
  }

  function log () {
    if (console && console.log) console.log(arrify(arguments))
  }

  return utils
}

if (module && module.exports) module.exports = Pasta

