/*!
 * wx-miniapp-mixins.js v1.0.7
 * (c) 2019-2020 kallsave <415034609@qq.com>
 * Released under the MIT License.
 */
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
var _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
function isArray(value) {
  return toRawType(value) === 'Array';
}
function isPlainObject(value) {
  return toRawType(value) === 'Object';
}
function isFunction(value) {
  return toRawType(value) === 'Function';
}

var LIFETIMES = 'lifetimes';
function mergeOptions(mixins, options) {
  var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  mixins.forEach(function (mixin) {
    if (!isPlainObject(mixin)) {
      throw new Error('typeof mixin must be plain object');
    }

    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin, hooks);
    }

    var _loop = function _loop(key) {
      var originItem = options[key];
      var mixinItem = mixin[key];

      if (hooks.indexOf(key) !== -1) {
        if (!isFunction(mixinItem)) {
          throw new Error("typeof ".concat(key, " must be function"));
        }

        options[key] = function () {
          var result;
          result = mixinItem.apply(this, arguments);

          if (originItem) {
            result = originItem.apply(this, arguments);
          }

          return result;
        };
      } else if (key === LIFETIMES) {
        if (!isPlainObject(mixinItem)) {
          throw new Error("typeof ".concat(key, " must be plain object"));
        }

        if (!originItem) {
          options[key] = {};
        }

        var lifetimesMixins = [mixinItem];
        mergeOptions(lifetimesMixins, options[key], hooks);
      } else {
        if (isPlainObject(originItem)) {
          if (isPlainObject(mixinItem)) {
            options[key] = _objectSpread2(_objectSpread2({}, mixinItem), originItem);
          }
        } else {
          if (!hasOwn(options, key)) {
            options[key] = mixinItem;
          }
        }
      }
    };

    for (var key in mixin) {
      _loop(key);
    }
  });
  return options;
}

var originApp = App;
var appInstaller = {
  install: function install(hooks) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    App = function App(options) {
      var mixins = options.mixins;

      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, hooks);
        delete options.mixins;
      }

      originApp(options);
    };
  }
};

var originPage = Page;
var pageInstaller = {
  install: function install(hooks) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Page = function Page(options) {
      var mixins = options.mixins;

      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, hooks);
        delete options.mixins;
      }

      originPage(options);
    };
  }
};

var originComponent = Component;
var componentInstaller = {
  install: function install(hooks) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Component = function Component(options) {
      var mixins = options.mixins;

      if (isArray(mixins)) {
        options = mergeOptions(mixins, options, hooks);
        delete options.mixins;
      }

      originComponent(options);
    };
  }
};

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html
var appHooks = ['onLaunch', 'onShow', 'onHide', 'onError', 'onPageNotFound', 'onUnhandledRejection', 'onThemeChange'];
var pageHooks = ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
var componentHooks = ['created', 'attached', 'ready', 'moved', 'detached', 'definitionFilter'];

var plugin = {
  install: function install() {
    if (this.installed) {
      return;
    }

    this.installed = true;
    appInstaller.install(appHooks);
    pageInstaller.install(pageHooks);
    componentInstaller.install(componentHooks);
  },
  verson: '1.0.7'
};
plugin.install();

export default plugin;
