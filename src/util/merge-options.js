import {
  isArray,
  isPlainObject,
  isFunction,
} from './lang.js'

export default function mergeOptions(mixins, options, mergeMethods = []) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error('mixin 类型必须为对象！')
    }
    // mixins递归mixins
    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin, mergeMethods)
    }
    for (const key in mixin) {
      const originItem = options[key]
      const mixinItem = mixin[key]
      if (mergeMethods.indexOf(key) !== -1) {
        // 如果这个方法是叠加类型,并且有相同的原有的方法,mixins的方法先执行,返回值是原有的方法的返回值
        options[key] = function () {
          let result
          result = mixinItem.apply(this, arguments)
          if (originItem) {
            result = originItem.apply(this, arguments)
          }
          return result
        }
      } else {
        // 如果是对象,合并这个对象,
        // 其它情况的数据类型,如果原有的属性是undefined,引入mixins,否则覆盖mixins
        if (isPlainObject(originItem)) {
          if (isPlainObject(mixinItem)) {
            options[key] = {
              ...mixinItem,
              ...originItem
            }
          }
        } else {
          if (originItem === undefined) {
            options[key] = mixinItem
          }
        }
      }
    }
  })
  return options
}
