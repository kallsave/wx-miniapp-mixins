import { mergeOptions } from '../util/merge-options'
import { isArray } from '../util/lang'

const originComponent = Component

export default {
  install(hooks) {
    if (this.installed) {
      return
    }
    this.installed = true
    Component = (options) => {
      const mixins = options.mixins
      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, hooks)
        delete options.mixins
      }
      originComponent(options)
    }
  }
}
