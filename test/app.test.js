import {
  isArray,
} from '../src/util/lang'

import {
  mergeOptions,
} from '../src/util/merge-options'

import {
  appHooks,
} from '../src/util/lifycycle-hooks'

function App(options) {
  options.onLaunch && options.onLaunch()
  options.onShow && options.onShow()
  return options
}

const originPage = App

App = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    options = mergeOptions(mixins, options, appHooks)
    delete options.mixins
  }
  return originPage(options)
}

const onLaunchList = []

const mixin = {
  data: {
    count: 100,
    name: 'a',
    person: {
      city: {
        name: 'shenzhen'
      }
    }
  },
  onLaunch() {
    const text = 'mixins onLaunch'
    onLaunchList.push(text)
  },
  method1() {
    const text = 'mixins method1'
    return text
  },
  method2() {
    const text = 'mixins method2'
    return text
  },
}

const instance = App({
  mixins: [
    mixin
  ],
  data: {
    count: 0,
  },
  onLaunch() {
    const text = 'origin onLaunch'
    onLaunchList.push(text)
  },
  method1() {
    const text = 'origin method1'
    return text
  },
})

describe('test App mixins', () => {

  it('originProperties cover mixinsProperties', () => {
    expect(instance.data.count).toEqual(0)
  })

  it('when originProperties undefined, mixinsProperties cover', () => {
    expect(instance.data.name).toEqual('a')
  })

  it('originProperties merge mixinsProperties', () => {
    expect(instance.method1()).toEqual('origin method1')
    expect(instance.method2()).toEqual('mixins method2')
  })

  it('merge originHook and mixinsHook', () => {
    expect(onLaunchList).toEqual(['mixins onLaunch', 'origin onLaunch'])
  })

})
