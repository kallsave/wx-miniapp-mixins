import appInstaller from './construction/app'
import pageInstaller from './construction/page'
import componentInstaller from './construction/component'

import {
  appHooks,
  pageHooks,
  componentHooks
} from './util/lifycycle-hooks'

const plugin = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true
    appInstaller.install(appHooks)
    pageInstaller.install(pageHooks)
    componentInstaller.install(componentHooks)
  },
  verson: 'VERSION'
}

plugin.install()

export default plugin
