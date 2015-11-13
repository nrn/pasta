module.exports = log

function log (a) {
  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    console.log(a)
  }
  return a
}
