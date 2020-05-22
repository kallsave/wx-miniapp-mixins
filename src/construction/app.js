import { mergeOptions } from '../util/merge-options'
import { isArray } from '../util/lang'

const originApp = App

export default {
  install(hooks) {
    if (this.installed) {
      return
    }
    this.installed = true
    App = (options) => {
      const mixins = options.mixins
      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, hooks)
        delete options.mixins
      }
      originApp(options)
    }
  }
}
