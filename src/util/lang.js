const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

const _toString = Object.prototype.toString

export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

export function deepClone(value) {
  let ret
  const type = toRawType(value)

  if (type === 'Object') {
    ret = {}
  } else if (type === 'Array') {
    ret = []
  } else {
    return value
  }

  Object.keys(value).forEach((key) => {
    const copy = value[key]
    ret[key] = deepClone(copy)
  })

  return ret
}

export function deepAssign(origin, mixin) {
  for (const key in mixin) {
    const targetValue = origin[key]
    const mixinValue = mixin[key]
    if (!hasOwn(origin, key)) {
      origin[key] = mixinValue
    } else if (
      isObject(targetValue) &&
      isObject(mixinValue) &&
      toRawType(targetValue) === toRawType(mixinValue)
    ) {
      deepAssign(targetValue, mixinValue)
    }
  }
}

export function multiDeepClone(target, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    const source = deepClone(rest[i])
    deepAssign(target, source)
  }
  return target
}

export function isObject(value) {
  return value && typeof value === 'object'
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
