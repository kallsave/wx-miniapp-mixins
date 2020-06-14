
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

describe('test originProperties', () => {

  const first = Component({
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

  const second = Component({
    mixins: [
      mixin
    ],
  })

  first.data.person.city.name = 'shanghai'

  it('originProperties cover mixinsProperties', () => {
    expect(first.data.count).toEqual(0)
  })

  it('new mixinsProperties cover originProperties', () => {
    expect(first.data.name).toEqual('a')
  })

  it('originProperties merge mixinsProperties', () => {
    expect(first.methods.method1()).toEqual('origin method1')
    expect(first.methods.method2()).toEqual('mixins method2')
  })

  it('originMethods and mixinsMethod exec', () => {
    expect(first.ready()).toEqual('origin ready')
    expect(readyList).toEqual(['mixins ready', 'origin ready'])
    expect(first.lifetimes.attached()).toEqual('origin attached')
    expect(attachedList).toEqual(['mixins attached', 'origin attached'])
  })

  it('deep clone mixins', () => {
    expect(second.data.person.city.name).toEqual('shenzhen')
  })
})
