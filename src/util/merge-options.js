import {
  isPlainObject,
  isFunction,
  hasOwn,
} from './lang'

const LIFETIMES = 'lifetimes'

export function mergeOptions(mixins, options, hooks = []) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error('typeof mixin must be plain object')
    }
    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin, hooks)
    }
    for (const key in mixin) {
      const originItem = options[key]
      const mixinItem = mixin[key]
      if (hooks.indexOf(key) !== -1) {
        if (!isFunction(mixinItem)) {
          throw new Error(`typeof ${key} must be function`)
        }
        options[key] = function () {
          let result
          result = mixinItem.apply(this, arguments)
          if (originItem) {
            result = originItem.apply(this, arguments)
          }
          return result
        }
      } else if (key === LIFETIMES) {
        if (!isPlainObject(mixinItem)) {
          throw new Error(`typeof ${key} must be plain object`)
        }
        if (!originItem) {
          options[key] = {}
        }
        const lifetimesMixins = [mixinItem]
        mergeOptions(lifetimesMixins, options[key], hooks)
      } else {
        if (isPlainObject(originItem)) {
          if (isPlainObject(mixinItem)) {
            options[key] = {
              ...mixinItem,
              ...originItem
            }
          }
        } else {
          if (!hasOwn(options, key)) {
            options[key] = mixinItem
          }
        }
      }
    }
  })
  return options
}
