// https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html

import mergeOptions from '../util/merge-options.js'
import { isArray } from '../util/lang.js'

const originApp = App

export default {
  install(mergeMethods) {
    App = (options) => {
      const mixins = options.mixins
      if (isArray(mixins)) {
        options = mergeOptions(
          mixins,
          options,
          mergeMethods,
        )
        delete options.mixins
      }
      originApp(options)
    }
  }
}
