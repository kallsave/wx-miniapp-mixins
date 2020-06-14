
import {
  isArray,
} from '../src/util/lang'

import {
  mergeOptions,
} from '../src/util/merge-options'

import {
  componentHooks,
} from '../src/util/lifycycle-hooks'

function Component(options) {
  return options
}

const originComponent = Component

Component = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    options = mergeOptions(mixins, options, componentHooks)
    delete options.mixins
  }
  return originComponent(options)
}

const readyList = []
const attachedList = []

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
  ready() {
    const text = 'mixins ready'
    readyList.push(text)
    return text
  },
  lifetimes: {
    created() {
      const text = 'mixins created'
      return text
    },
    attached() {
      const text = 'mixins attached'
      attachedList.push(text)
      return text
    }
  },
  methods: {
    method1() {
      const text = 'mixins method1'
      return text
    },
    method2() {
      const text = 'mixins method2'
      return text
    },
  }
}

const instance = Component({
  mixins: [
    mixin
  ],
  data: {
    count: 0,
  },
  ready() {
    const text = 'origin ready'
    readyList.push(text)
    return text
  },
  lifetimes: {
    attached() {
      const text = 'origin attached'
      attachedList.push(text)
      return text
    }
  },
  methods: {
    method1() {
      const text = 'origin method1'
      return text
    },
  }
})

describe('test Component mixins', () => {

  it('originProperties cover mixinsProperties', () => {
    expect(instance.data.count).toEqual(0)
  })

  it('when originProperties undefined, mixinsProperties cover', () => {
    expect(instance.data.name).toEqual('a')
  })

  it('originProperties merge mixinsProperties', () => {
    expect(instance.methods.method1()).toEqual('origin method1')
    expect(instance.methods.method2()).toEqual('mixins method2')
  })

  it('merge originHook and mixinsHook', () => {
    expect(instance.ready()).toEqual('origin ready')
    expect(readyList).toEqual(['mixins ready', 'origin ready'])
    expect(instance.lifetimes.attached()).toEqual('origin attached')
    expect(attachedList).toEqual(['mixins attached', 'origin attached'])
  })

})
