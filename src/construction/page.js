import { mergeOptions } from '../util/merge-options'
import { isArray } from '../util/lang'

const originPage = Page

export default {
  install(hooks) {
    if (this.installed) {
      return
    }
    this.installed = true
    Page = (options) => {
      const mixins = options.mixins
      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, hooks)
        delete options.mixins
      }
      originPage(options)
    }
  }
}
