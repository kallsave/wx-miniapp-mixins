/*!
 * wx-miniapp-mixins.js v0.0.2
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

function isFunction(value) {
  return toRawType(value) === 'Function'
}

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html

// 原有的会叠加mixins的方法,mixins的方法会先执行,返回值是原有的方法的返回值

const appMergeMethods = [
  'onLaunch',
  'onShow',
  'onHide',
  'onError',
  'onAppNotFound',
  'onUnhandledRejection',
];

const pageMergeMethods = [
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
];

const componentMergeMethods = [
  'created',
  'attached',
  'ready',
  'moved',
  'detached',
  'definitionFilter'
];

function mergeOptions(mixins, options, mergeMethods = []) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error(`typeof mixin must be plain object`)
    }
    // mixins递归mixins
    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin, mergeMethods);
    }
    for (const key in mixin) {
      const originItem = options[key];
      const mixinItem = mixin[key];
      if (mergeMethods.indexOf(key) !== -1) {
        if (originItem && !isFunction(originItem) || mixinItem && !isFunction(mixinItem)) {
          throw new Error(`typeof ${key} must be function`)
        }
        // 如果这个方法是叠加类型,并且有相同的原有的方法,mixins的方法先执行,返回值是原有的方法的返回值
        options[key] = function () {
          let result;
          result = mixinItem.apply(this, arguments);
          if (originItem) {
            result = originItem.apply(this, arguments);
          }
          return result
        };
      } else {
        // 如果是对象,合并这个对象,
        // 其它情况的数据类型,如果原有的属性是undefined,引入mixins,否则覆盖mixins
        if (isPlainObject(originItem)) {
          if (isPlainObject(mixinItem)) {
            options[key] = {
              ...mixinItem,
              ...originItem
            };
          }
        } else {
          if (originItem === undefined) {
            options[key] = mixinItem;
          }
        }
      }
    }
  });
  return options
}

const originApp = App;

var appMixinsInstaller = {
  install(mergeMethods) {
    if (this.installed) {
      return
    }
    this.installed = true;
    App = (options) => {
      const mixins = options.mixins;
      if (isArray(mixins)) {
        options = mergeOptions(
          mixins,
          options,
          mergeMethods,
        );
        delete options.mixins;
      }
      originApp(options);
    };
  }
};

const originPage = Page;

var pageMixinsInstaller = {
  install(mergeMethods) {
    if (this.installed) {
      return
    }
    this.installed = true;
    Page = (options) => {
      const mixins = options.mixins;
      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, mergeMethods);
        delete options.mixins;
      }
      originPage(options);
    };
  }
};

const originComponent = Component;

var componentMixinsInstaller = {
  install(mergeMethods) {
    if (this.installed) {
      return
    }
    this.installed = true;
    Component = (options) => {
      const mixins = options.mixins;
      if (isArray(mixins)) {
        options = mergeOptions(
          mixins,
          options,
          mergeMethods,
        );
        delete options.mixins;
      }
      originComponent(options);
    };
  }
};

const wxMixins = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true;
    appMixinsInstaller.install(appMergeMethods);
    pageMixinsInstaller.install(pageMergeMethods);
    componentMixinsInstaller.install(componentMergeMethods);
  },
  verson: '0.0.2'
};

wxMixins.install();

export default wxMixins;
