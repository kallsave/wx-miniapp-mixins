
import {
  isArray,
} from '../src/util/lang'

import {
  mergeOptions,
  pageMergeMethods
} from '../src/util/merge-options'

function Page(options) {
  return options
}

const originPage = Page

Page = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    options = mergeOptions(mixins, options, pageMergeMethods)
    delete options.mixins
  }
  return originPage(options)
}

describe('test originProperties', () => {
  const list = []
  const mixin = {
    data: {
      count: 100,
      name: 'a'
    },
    onLoad() {
      list.push(0)
      return 'mixins'
    },
    methods: {
      method1() {
        return 'mixins method1'
      },
      method2() {
        return 'mixins method2'
      },
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
      list.push(1)
      return 'origin'
    },
    methods: {
      method1() {
        return 'origin method1'
      },
    }
  })

  it('originProperties cover mixinsProperties', () => {
    expect(instance.data.count).toEqual(0)
  })

  it('new mixinsProperties cover originProperties', () => {
    expect(instance.data.name).toEqual('a')
  })

  it('originProperties merge mixinsProperties', () => {
    expect(instance.methods.method1()).toEqual('origin method1')
    expect(instance.methods.method2()).toEqual('mixins method2')
  })

  it('originMethods and mixinsMethod exec', () => {
    expect(instance.onLoad()).toEqual('origin')
    expect(list).toEqual([0 ,1])
  })
})
