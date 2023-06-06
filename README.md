wx-miniapp-mixins
========================================

功能
------------
给微信小程序带来和vue体验的mixins语法,给App, Page, Component增加mixins的扩展功能

安装
------------
npm install wx-miniapp-mixins --save

使用
------------
在微信开发者工具中先构建npm生成miniprogram_npm文件夹
```javascript
// app.js
// 导入js给App,Page,Component增加mixins的扩展
import './miniprogram_npm/wx-miniapp-mixins/index'
```

```javascript
// app.js
import testMixins from './common/mixins/test'

App({
  mixins: [
    testMixins,
  ]
})
```

```javascript
// page.js
import testMixins from '../common/mixins/test'

Page({
  mixins: [
    testMixins,
  ]
})
```

```javascript
// component.js
import testMixins from '../common/mixins/test'

Component({
  mixins: [
    testMixins,
  ]
})
```

其它
------------
mixins混入的对象是浅合并
支持async/await Promise
