var values = {
  'string': true,
  'number': true,
  'boolean': true,
  // Kinda a lie, but returning the functions unmodified
  // leads to the least confusing behavior.
  'function': true
}

var validConstructors = [ Date ]

if (typeof Set === 'function') {
  validConstructors.push(Set)
}
if (typeof Map === 'function') {
  validConstructors.push(Map)
}
if (typeof WeakMap === 'function') {
  validConstructors.push(WeakMap)
}
if (typeof WeakSet === 'function') {
  validConstructors.push(WeakSet)
}
if (typeof Int8Array === 'function') {
  validConstructors.push(Int8Array)
}
if (typeof Uint8Array === 'function') {
  validConstructors.push(Uint8Array)
}
if (typeof Uint8ClampedArray === 'function') {
  validConstructors.push(Uint8ClampedArray)
}
if (typeof Int16Array === 'function') {
  validConstructors.push(Int16Array)
}
if (typeof Uint16Array === 'function') {
  validConstructors.push(Uint16Array)
}
if (typeof Int32Array === 'function') {
  validConstructors.push(Int32Array)
}
if (typeof Uint32Array === 'function') {
  validConstructors.push(Uint32Array)
}
if (typeof Float32Array === 'function') {
  validConstructors.push(Float32Array)
}
if (typeof Float64Array === 'function') {
  validConstructors.push(Float64Array)
}

module.exports = deepCopy

function deepCopy (original) {
  var type = typeof original

  // Don't need to do anything for values
  // that aren't passed by reference.
  if (original == null || type in values) {
    return original
  }

  if (copyingConstructor(original)) {
    return new original.constructor(original)
  } else if (shouldSlice(original)) {
    return original.slice()
  } else if (original instanceof RegExp) {
    var flags = []
    if (original.global) flags.push('g')
    if (original.ignoreCase) flags.push('i')
    if (original.multiline) flags.push('m')
    return new RegExp(original.source, flags.join(''))
  }

  // if none of the special cases hit, copy original as a generic object.
  return objectCopy(original)
}

function objectCopy (original) {
  var copy = new (original.constructor || Object)

  Object.getOwnPropertyNames(original).forEach(function (key) {
    var descriptor = Object.getOwnPropertyDescriptor(original, key)
    descriptor.value = deepCopy(descriptor.value)
    try {
      Object.defineProperty(copy, key, descriptor)
    } catch (e) {
      // When define property fails it means we shouldn't
      // have been trying to write the property we were.
      // example: the stack of an error object.
    }
  })

  if (typeof Object.getOwnPropertySymbols === 'function') {
    Object.getOwnPropertySymbols(original).forEach(function (sym) {
      copy[sym] = deepCopy(original[sym])
    })
  }

  return copy
}

function copyingConstructor (original) {
  return validConstructors.reduce(function (valid, constructor) {
    if (valid) return valid
    return original instanceof constructor
  }, false)
}

function shouldSlice (original) {
  if (typeof ArrayBuffer === 'function' && original instanceof ArrayBuffer) {
    return true
  }
}
