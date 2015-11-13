// Idea taken from Eloquent JavaScript
module.exports = {
  // Comparison
  '==': function (a, b) { return a == b },
  '!=': function (a, b) { return a != b },
  '===': function (a, b) { return a === b },
  '!==': function (a, b) { return a !== b },
  '>': function (a, b) { return a > b },
  '>=': function (a, b) { return a >= b },
  '<': function (a, b) { return a < b },
  '<=': function (a, b) { return a <= b },
  // Math
  '+': function (a, b) { return a + b },
  '-': function (a, b) { return a - b },
  '*': function (a, b) { return a * b },
  '/': function (a, b) { return a / b },
  '%': function (a, b) { return a % b },
  // Unary
  'u-': function (a) { return -a },
  'u+': function (a) { return +a },
  // Turnary
  '?:': function (a, b, c) { return a ? b : c },
  // Logical
  '&&': function (a, b) { return a && b },
  '||': function (a, b) { return a || b },
  '!': function (a) { return !a },
}