import './config/index'

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

const options = {
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
}

Page(options)

describe('test Page mixins', () => {

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
    expect(onLoadList).toEqual(['mixins onLoad', 'origin onLoad'])
    expect(options.onShareAppMessage()).toEqual({
      path: 'pages/index/index',
      title: 'origin onShareAppMessage',
    })
  })

})
