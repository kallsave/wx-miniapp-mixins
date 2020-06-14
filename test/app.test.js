import './config/index'

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

const options = {
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
}

App(options)

describe('test App mixins', () => {

  it('originProperties cover mixinsProperties', () => {
    expect(options.data.count).toEqual(0)
  })

  it('when originProperties undefined, mixinsProperties cover', () => {
    expect(options.data.name).toEqual('a')
  })

  it('originProperties merge mixinsProperties', () => {
    expect(options.method1()).toEqual('origin method1')
    expect(options.method2()).toEqual('mixins method2')
  })

  it('merge originHook and mixinsHook', () => {
    expect(onLaunchList).toEqual(['mixins onLaunch', 'origin onLaunch'])
  })

})
