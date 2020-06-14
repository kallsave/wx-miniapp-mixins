import appMixinsInstaller from './construction/app'
import pageMixinsInstaller from './construction/page'
import componentMixinsInstaller from './construction/component'

import {
  appHooks,
  pageHooks,
  componentHooks
} from './util/lifycycle-hooks'

const wxMixins = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true
    appMixinsInstaller.install(appHooks)
    pageMixinsInstaller.install(pageHooks)
    componentMixinsInstaller.install(componentHooks)
  },
  verson: '1.0.5'
}

wxMixins.install()

export default wxMixins
