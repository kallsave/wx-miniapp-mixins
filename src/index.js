import appMixinsInstaller from './construction/app'
import pageMixinsInstaller from './construction/page'
import componentMixinsInstaller from './construction/component'
import {
  appMergeMethods,
  pageMergeMethods,
  componentMergeMethods
} from './util/merge-options'

const wxMixins = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true
    appMixinsInstaller.install(appMergeMethods)
    pageMixinsInstaller.install(pageMergeMethods)
    componentMixinsInstaller.install(componentMergeMethods)
  },
  verson: '0.0.1'
}

export default wxMixins

wxMixins.install()
