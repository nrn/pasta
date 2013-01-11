// pasta.js

function Pasta (opts) {
  // GENERAL Functions
  function comp (args) {
    if (!Array.isArray(args)) args = arrify(arguments)
    return function (input) {
      return args.reduceRight(function (last, cur) {
        return cur(last)
      }, input)
    }
  }

  function partial (fn) {
    var args = arrify(arguments)
    args.shift() // remove the function
    return function () {
      var innerArgs = arrify(arguments)
      return fn.apply(null, args.map(function (arg) {
          if (arg == null) return innerArgs.shift()
          return arg
        }).concat(innerArgs)
      )
    }
  }

  var numOfArgs =
    { '1': function (fn) { return function (arg) { return fn(arg) } }
    , '2': function (fn) { return function (a, b) { return fn(a, b) } }
    , '3': function (fn) { return function (a, b, c) { return fn(a, b, c) } }
    }

  function limit (num) {
    return function (fn) {
      return function () {
        return fn.apply(null, arrify(arguments).slice(0, num))
      }
    }
  }

  var args = casify(numOfArgs, limit)

  function casify (obj, def) {
    return function (cas) {
      var val = obj[cas]
      if (typeof val === 'undefined') {
        if (typeof def !== 'undefined') val = def(cas)
        else if (typeof obj._default !== 'undefined') val = obj._default
        else val = obj['default']
      }
      return val
    }
  }

  function all (fn) {
    return arrify(arguments).reduce(fn)
  }

  // Idea taken from Eloquent JavaScript
  var operators =
    // Comparison
    { '==': function (a, b) { return a == b }
    , '!=': function (a, b) { return a != b }
    , '===': function (a, b) { return a === b }
    , '!==': function (a, b) { return a !== b }
    , '>': function (a, b) { return a > b }
    , '>=': function (a, b) { return a >= b }
    , '<': function (a, b) { return a < b }
    , '<=': function (a, b) { return a <= b }
    // Math
    , '+': function (a, b) { return a + b }
    , '-': function (a, b) { return a - b }
    , '*': function (a, b) { return a * b }
    , '/': function (a, b) { return a / b }
    , '%': function (a, b) { return a % b }
    // Unary
    , 'u-': function (a) { return -a }
    , 'u+': function (a) { return +a }
    // Turnary
    , '?:': function (a, b, c) { return a ? b : c }
    // Logical
    , '&&': function (a, b) { return a && b }
    , '||': function (a, b) { return a || b }
    , '!': function (a) { return !a }
    // Identity
    , '': function (a) { return a }
    }

  var op = casify(operators)

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
    return function (error, code) {
      if (!fired) {
        fired = true
        res.statusCode = (code || 500)
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

  return { log: log
    , l: log
    , arrify: arrify
    , get: get
    , casify: casify
    , d: d
    , comp: comp
    , one: args(1)
    , args: args
    , op: op
    , partial: partial
    , errorHandler: errorHandler
    , eh: errorHandler
    , notyet: notyet
    , jsonCORS: jsonCORS
    , redirect: redirect
    , dispatch: dispatch
    , refuse: refuse
    }

}

if (module && module.exports) module.exports = Pasta

