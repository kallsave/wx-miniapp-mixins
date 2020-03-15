import {
  isPlainObject,
  isFunction,
} from './lang.js'

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html

// 原有的会叠加mixins的方法,mixins的方法会先执行,返回值是原有的方法的返回值

export const appMergeMethods = [
  'onLaunch',
  'onShow',
  'onHide',
  'onError',
  'onAppNotFound',
  'onUnhandledRejection',
]

export const pageMergeMethods = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
  'onShareAppMessage',
]

export const componentMergeMethods = [
  'created',
  'attached',
  'ready',
  'moved',
  'detached',
  'definitionFilter'
]

export function mergeOptions(mixins, options, mergeMethods = []) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error(`typeof mixin must be plain object`)
    }
    // mixins递归mixins
    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin, mergeMethods)
    }
    for (const key in mixin) {
      const originItem = options[key]
      const mixinItem = mixin[key]
      if (mergeMethods.indexOf(key) !== -1) {
        if (originItem && !isFunction(originItem) || mixinItem && !isFunction(mixinItem)) {
          throw new Error(`typeof ${key} must be function`)
        }
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
