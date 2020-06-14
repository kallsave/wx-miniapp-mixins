import './config/index'

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

const options = {
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
}

Component(options)

describe('test Component mixins', () => {

  it('originProperties cover mixinsProperties', () => {
    expect(options.data.count).toEqual(0)
  })

  it('when originProperties undefined, mixinsProperties cover', () => {
    expect(options.data.name).toEqual('a')
  })

  it('originProperties merge mixinsProperties', () => {
    expect(options.methods.method1()).toEqual('origin method1')
    expect(options.methods.method2()).toEqual('mixins method2')
  })

  it('merge originHook and mixinsHook', () => {
    expect(readyList).toEqual(['mixins ready', 'origin ready'])
    expect(attachedList).toEqual(['mixins attached', 'origin attached'])
  })

})
