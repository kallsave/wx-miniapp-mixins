import appMixins from './construction/app.js'
import pageMixins from './construction/page.js'

// 原有的会叠加mixins的方法,mixins的方法会先执行,返回值是原有的方法的返回值
const pageMergeMethods = [
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

// 原有的会叠加mixins的方法,mixins的方法会先执行,返回值是原有的方法的返回值
const appMergeMethods = [
  'onLaunch',
  'onShow',
  'onHide',
  'onError',
  'onAppNotFound',
  'onUnhandledRejection',
]

export default wxMixins {
  install({
    app: appMergeMethods,
    page: pageMergeMethods
  } = {}) {
    appMixins.install(appMergeMethods)
    pageMixins.install(pageMergeMethods)
  }
}

wxMixins.install()
