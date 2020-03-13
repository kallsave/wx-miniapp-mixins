// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

import mergeOptions from '../util/merge-options.js'
import { isArray } from '../util/lang.js'

const originPage = Page

const originProperties = [
  'data',
]

// 原有的会叠加mixins的方法,mixins的方法会先执行,返回值是原有的方法的返回值
const originMergeMethods = [
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

const originCoverMethods = []

Page = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    options = mergeOptions(mixins, options, originProperties, originMergeMethods, originCoverMethods)
    delete options.mixins
  }
  originPage(options)
}