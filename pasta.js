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
    , errorHandler: errorHandler
    , eh: errorHandler
    , notyet: notyet
    , jsonCORS: jsonCORS
    , redirect: redirect
    , dispatch: dispatch
    , refuse: refuse
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

  // HTTP Functions

  function errorHandler (res) {
    var fired = false
    return function (error) {
      if (!fired) {
        fired = true
        res.statusCode = 500
        res.end('Server ' + error)
      } else {
        log("Allready fired " + error)
      }
    }
  }

  function notyet (req, res) {
    log('You called a route that is not yet implemented')
    res.statusCode = 404
    res.end('not found')
  }


  function redirect (loc) {
    return function (req, res) {
      res.statusCode = 302
      res.setHeader('location', loc)
      res.end()
    }
  }

  function jsonCORS (req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
  }

  function refuse (req, res, allowed) {
    res.statusCode = 405
    res.setHeader('Allow', allowed)
    res.end('Method Not Allowed')
  }

  function dispatch (methods) {
    return function (req, res) {
      var intended = methods[req.method]
      if (typeof intended === 'function') return intended.apply(null, arguments)
      var _default = methods[_default]
      if (typeof _default === 'function') return _default.apply(null, arguments)
      return refuse(req, res, Object.keys(methods))
    }
  }

  return utils
}

if (module && module.exports) module.exports = Pasta

