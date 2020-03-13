// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

import mergeOptions from '../util/merge-options.js'
import { isArray } from '../util/lang.js'

const originPage = Page

export default {
  install(mergeMethods) {
    Page = (options) => {
      const mixins = options.mixins
      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, mergeMethods)
        delete options.mixins
      }
      originPage(options)
    }
  }
}
