// pasta.js
Stream = require('stream')
StringDecoder = require('string_decoder').StringDecoder

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

  function streamToCb (stream, opts) {
    return function (e, results) {
      if (e) return stream.emit('error', e)
      stream.write(results)
      if (!opts.noend) stream.end()
    }
  }

  function cbToStream (cb) {
    var stream = new Stream
      , data = ''
      , decoder = new StringDecoder
    stream.on('error', cb)
    stream.on('data', function (chunk) {
      data += decoder.write(chunk)
    })
    stream.on('end', function () {
      cb(null, data)
    })

    return stream
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
    , one: one
    , op: op
    , wrap: wrap
    , w: wrap
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

