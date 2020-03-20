wx-mixins
========================================

Features
------------

给微信小程序带来和vue体验的mixins语法,给App, Page, Component增加mixins功能

使用
-----------
```javascript
// app.js
import 'wx-miniapp-mixins'
import testMixins from './common/mixins/test'

// app.js
App({
  mixins: [
    testMixins,
  ]
})

```

// page.js
```javascript
import testMixins from '../common/mixins/test'

Page({
  mixins: [
    testMixins,
  ]
})
```

// component.js
```javascript
import testMixins from '../common/mixins/test'

Component({
  mixins: [
    testMixins,
  ]
})
```