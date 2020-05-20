/*!
 * wx-miniapp-mixins.js v1.0.0
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

const LIFETIMES = 'lifetimes';

function mergeOptions(mixins, options, hooks = []) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error(`typeof mixin must be plain object`)
    }
    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin, hooks);
    }
    for (const key in mixin) {
      const originItem = options[key];
      const mixinItem = mixin[key];
      if (hooks.indexOf(key) !== -1) {
        if (!isFunction(mixinItem)) {
          throw new Error(`typeof ${key} must be function`)
        }
        options[key] = function () {
          let result;
          result = mixinItem.apply(this, arguments);
          if (originItem) {
            result = originItem.apply(this, arguments);
          }
          return result
        };
      } else if (key === LIFETIMES) {
        if (!isPlainObject(mixinItem)) {
          throw new Error(`typeof ${key} must be plain object`)
        }
        if (!originItem) {
          options[key] = {};
        }
        const lifetimesMixins = [mixinItem];
        mergeOptions(lifetimesMixins, options[key], hooks);
      } else {
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
        options = mergeOptions(mixins, options, mergeMethods);
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
        options = mergeOptions(mixins, options, mergeMethods);
        delete options.mixins;
      }
      originComponent(options);
    };
  }
};

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html

const appHooks = [
  'onLaunch',
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound',
  'onUnhandledRejection',
  'onThemeChange',
];

const pageHooks = [
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

const componentHooks = [
  'created',
  'attached',
  'ready',
  'moved',
  'detached',
  'definitionFilter'
];

const wxMixins = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true;
    appMixinsInstaller.install(appHooks);
    pageMixinsInstaller.install(pageHooks);
    componentMixinsInstaller.install(componentHooks);
  },
  verson: '1.0.0'
};

wxMixins.install();

export default wxMixins;
