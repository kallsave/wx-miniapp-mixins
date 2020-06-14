const appInitHooks = ['onLaunch', 'onShow']

global.App = function (options) {
  appInitHooks.forEach((item) => {
    const hook = options[item]
    hook && hook()
  })
}

const pageInitHooks = ['onLoad', 'onShow']

global.Page = function(options) {
  pageInitHooks.forEach((item) => {
    const hook = options[item]
    hook && hook()
  })
}

const componentInitHooks = ['created', 'attached', 'ready']
const LIFETIMES = 'lifetimes'

global.Component = function(options) {
  componentInitHooks.forEach((item) => {
    const lifetimes = options[LIFETIMES]
    const hook = lifetimes && lifetimes[item] ? lifetimes[item] : options[item]
    hook && hook()
  })
}
