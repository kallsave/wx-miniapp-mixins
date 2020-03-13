// https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html

import mergeOptions from '../util/merge-options.js'
import { isArray } from '../util/lang.js'

const originApp = App

const originProperties = []

// 原有的会叠加mixins的方法,mixins的方法会先执行,返回值是原有的方法的返回值
const originMergeMethods = [
  'onLaunch',
  'onShow',
  'onHide',
  'onError',
  'onAppNotFound',
  'onUnhandledRejection',
]

// 原有的会覆盖mixins的方法,mixins的方法不会执行
const originCoverMethods = []

App = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    options = mergeOptions(mixins, options, originProperties, originMergeMethods, originCoverMethods)
    delete options.mixins
  }
  originApp(options)
}
