import {
  isPlainObject,
  isFunction,
  hasOwn,
  createPromise,
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
          let mixinResult
          let originResult

          mixinResult = mixinItem.apply(this, arguments)
          const isMixinResultPromise = mixinResult instanceof Promise

          if (isMixinResultPromise) {
            return createPromise((resolve) => {
              mixinResult.then((data) => {
                mixinResult = data

                if (originItem) {
                  originResult = originItem.apply(this, arguments)

                  const isOriginResultPromise = originResult instanceof Promise

                  if (isOriginResultPromise) {
                    originResult.then((data) => {
                      originResult = data

                      const result = originResult === undefined ? mixinResult : originResult
                      resolve(result)
                    })
                  } else {
                    const result = originResult === undefined ? mixinResult : originResult
                    resolve(result)
                  }
                } else {
                  const result = mixinResult
                  resolve(result)
                }
              })
            })
          } else {
            if (originItem) {
              originResult = originItem.apply(this, arguments)

              const isOriginResultPromise = originResult instanceof Promise

              if (isOriginResultPromise) {
                return createPromise((resolve) => {
                  originResult.then((data) => {
                    originResult = data

                    const result = originResult === undefined ? mixinResult : originResult
                    resolve(result)
                  })
                })
              } else {
                const result = originResult === undefined ? mixinResult : originResult
                return result
              }

            } else {
              const result = mixinResult
              return result
            }
          }
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
