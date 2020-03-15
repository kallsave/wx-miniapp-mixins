import { mergeOptions } from '../util/merge-options'
import { isArray } from '../util/lang'

const originComponent = Component

export default {
  install(mergeMethods) {
    if (this.installed) {
      return
    }
    this.installed = true
    Component = (options) => {
      const mixins = options.mixins
      if (isArray(mixins)) {
        options = mergeOptions(
          mixins,
          options,
          mergeMethods,
        )
        delete options.mixins
      }
      originComponent(options)
    }
  }
}
