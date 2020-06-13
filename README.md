wx-miniapp-mixins
========================================

功能
------------
给微信小程序带来和vue体验的mixins语法,给App, Page, Component增加mixins功能

安装
------------
npm install wx-miniapp-mixins --save

使用
------------
```javascript
// app.js
// 导入js给App,Page,Component增加扩展mixins的扩展
import 'wx-miniapp-mixins'
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