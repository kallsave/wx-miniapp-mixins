
import {
  isArray,
} from '../src/util/lang'

import {
  mergeOptions,
} from '../src/util/merge-options'

import {
  pageHooks,
} from '../src/util/lifycycle-hooks'

function Page(options) {
  options.onLoad && options.onLoad()
  options.onShow && options.onShow()
  return options
}

const originPage = Page

Page = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    options = mergeOptions(mixins, options, pageHooks)
    delete options.mixins
  }
  return originPage(options)
}

const onLoadList = []

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
  onLoad() {
    const text = 'mixins onLoad'
    onLoadList.push(text)
  },
  method1() {
    const text = 'mixins method1'
    return text
  },
  method2() {
    const text = 'mixins method2'
    return text
  },
  onShareAppMessage() {
    const title = 'mixins onShareAppMessage'
    return {
      path: 'pages/index/index',
      title,
    }
  }
}

const instance = Page({
  mixins: [
    mixin
  ],
  data: {
    count: 0,
  },
  onLoad() {
    const text = 'origin onLoad'
    onLoadList.push(text)
  },
  method1() {
    const text = 'origin method1'
    return text
  },
  onShareAppMessage() {
    const title = 'origin onShareAppMessage'
    return {
      path: 'pages/index/index',
      title,
    }
  }
})

describe('test Page mixins', () => {

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
    expect(onLoadList).toEqual(['mixins onLoad', 'origin onLoad'])
    expect(instance.onShareAppMessage()).toEqual({
      path: 'pages/index/index',
      title: 'origin onShareAppMessage',
    })
  })

})
