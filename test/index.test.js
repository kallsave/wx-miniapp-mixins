
import {
  isArray,
  isPlainObject,
} from '../src/util'

function Page(options) {
  return options
}

const originProperties = [
  'data',
]

// 原有的会叠加mixins的方法,mixins的方法会先执行,返回值是原有的方法的返回值
const originMergeMethods = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
  'onShareAppMessage',
]

// 原有的会覆盖mixins的方法,mixins的方法不会执行
const originCoverMethods = []

const originPage = Page

function mergeOptions(mixins, options) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error('mixin 类型必须为对象！')
    }
    // mixins递归mixins
    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin)
    }
    for (const key in mixin) {
      const originItem = options[key]
      const mixinItem = mixin[key]
      if (originProperties.indexOf(key) !== -1) {
        // 如果有相同属性原有的属性覆盖mixins属性
        options[key] = {
          ...mixinItem,
          ...originItem
        }
      } else if (originMergeMethods.indexOf(key) !== -1) {
        // 如果这个方法是叠加类型,并且有相同的原有的方法,mixins的方法先执行,返回值是原有的方法的返回值
        options[key] = function () {
          let result
          result = mixinItem.apply(this, arguments)
          if (originItem) {
            result = originItem.apply(this, arguments)
          }
          return result
        }
      } else if (originCoverMethods.indexOf(key) !== -1) {
        // 如果这个方法是覆盖类型,并且有相同的原有的方法,覆盖mixins的方法
        if (!originItem) {
          options[key] = mixinItem
        }
      } else {
        // 自定义的属性
        // 如果是对象,合并这个对象,其它情况覆盖
        if (isPlainObject(originItem) && isPlainObject(mixinItem)) {
          options[key] = {
            ...mixinItem,
            ...originItem
          }
        } else {
          options[key] = mixinItem
        }
      }
    }
  })
  return options
}

Page = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    options = mergeOptions(mixins, options)
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
        return 'mixins'
      },
      method2() {

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
        return 'origin'
      },
    }
  })

  it('originProperties cover mixinsProperties', () => {
    expect(instance.data.count).toEqual(0)
  })

  it('originProperties merge mixinsProperties', () => {
    expect(instance.methods.method1()).toEqual('origin')
    expect(instance.methods.method2).not.toBeUndefined()
  })

  it('new mixinsProperties cover originProperties', () => {
    expect(instance.data.name).toEqual('a')
  })

  it('originMethods and mixinsMethod exec', () => {
    expect(instance.onLoad()).toEqual('origin')
    expect(list).toEqual([0 ,1])
  })
})
