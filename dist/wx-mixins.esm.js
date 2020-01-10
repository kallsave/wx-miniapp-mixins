/*!
 * wx-mixins.js v1.0.0
 * (c) 2019-2020 kallsave
 * Released under the MIT License.
 */
const _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

function isArray(value) {
  return toRawType(value) === 'Array'
}

function isPlainObject(value) {
  return toRawType(value) === 'Object'
}

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

const originProperties = [
  'data',
];

// 原有的会叠加mixins的方法,mixins的方法会先执行
const originMethods = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
];

// 原有的会覆盖mixins的方法,mixins的方法不会执行
const originCoverMethods = [
  
];

const originPage = Page;

function mergePageOptions(mixins, options) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error('mixin 类型必须为对象！')
    }
    // mixins递归mixins
    if (mixin.mixins) {
      mixin = mergePageOptions(mixin.mixins, mixin);
    }
    for (const key in mixin) {
      const value = mixin[key];
      if (originProperties.indexOf(key) !== -1) {
        // 如果有相同属性内置属性覆盖mixins属性
        options[key] = {
          ...value,
          ...options[key]
        };
      } else if (originMethods.indexOf(key) !== -1) {
        // mixins的方法先执行
        const originMethod = options[key];
        options[key] = function () {
          let result;
          result = value.apply(this, arguments);
          if (originMethod) {
            result = originMethod.apply(this, arguments);
          }
          return result
        };
      } else if (originCoverMethods.indexOf(key) !== -1) {
        // 如果原来定义了这个方法,覆盖mixins的方法
        const originCoverMethods = options[key];
        if (!originCoverMethods) {
          options[key] = value;
        }
      } else {
        // 自定义的方法
        // 如果原来定义了这个方法,覆盖mixins的方法
        const coverMethods = options[key];
        if (!coverMethods) {
          options[key] = value;
        }
      }
    }
  });
  return options
}

Page = (options) => {
  const mixins = options.mixins;
  if (isArray(mixins)) {
    options = mergePageOptions(mixins, options);
    delete options.mixins;
  }
  originPage(options);
};
