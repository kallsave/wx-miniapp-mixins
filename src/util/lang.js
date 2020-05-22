const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

const _toString = Object.prototype.toString

export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

export function isArray(value) {
  return toRawType(value) === 'Array'
}

export function isPlainObject(value) {
  return toRawType(value) === 'Object'
}

export function isFunction(value) {
  return toRawType(value) === 'Function'
}

export function isEmptyObject(value) {
  if (isPlainObject(value)) {
    return Object.keys(value).length === 0
  }
  return false
}
