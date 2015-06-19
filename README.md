geekpark.js
===========

一个内部使用的javascript库

####LIENCE
![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)

### 1.概述
一个团队内部使用的javascrip库，主要着重减轻前端工作量，提高组件复用性。目前处于初级开发阶段。
### 2.安装
* 此插件依赖`jQuery`和`underscore`，请先引入
* 下载 [geekpark.min.js](https://raw.githubusercontent.com/GeekPark/geekpark.js/master/assets/javascript/geekpark.min.js) 到项目文件夹
* 如果你需要使用gpalert等UI组件则还需要下载[geekpark.min.css](https://raw.githubusercontent.com/GeekPark/geekpark.js/master/assets/javascript/geekpark.min.js)文件
 

### 3.使用方法
1. 「Grunt支持」
  运行`grunt`即可生成编译scss并生成压缩后的文件
2. 将`geekpark.min.js`引入你的项目后，即可通过`GeekPark.xxx`调用其中组件/函数。`GeekPark`是暴露在`window`下的全局变量
3. `source map`支持，如果你不想启用或者浏览器加载不上可在`geekpark.css`最底部删掉map引用

####部分组件/函数列表
1. `slideToDom(dom, offset, callback)`：平滑滚动到某个DOM。
  - `dom`可为符合jQuery选择器的任何形式，eg:`.title``#title``h1.title``input[type='test']`
  - `offset`距离DOM的偏移，即滑动后距离浏览器顶部的边距
  - `callback`滑动完成后的回调函数
2. `isRetinaDisplay()`检测是否为Retina屏幕，返回布尔值（定义retina的界限为1.3dpi）
3. `alertTip()`一个弹窗组件，用于美化浏览器自带`alert()`，兼容移动版
  - 参数说明： `alertTip(title, tip, type)`
  - `title`弹窗标题`tip`弹窗正文`type(可选): error`类型
  - 此例会使用到geekpark.css
4. `share`对象，拥有`openWindow`和`run`方法，用于打开微博和twitter的分享。
  - window.GeekPark.share.run(type, options)
  - type ==> { weibo | twitter }
  - options ==> {title: 'title', imageView: 'img url'}
5. `loadingBtn`对象，目前拥有`createNew`方法
  - GeekPark.loadingBtn( jQueryObject, loadingGif图片地址 );
6. `isWechat()`通过UA检测是否在微信浏览器内打开页面，返回布尔值
7. `stringTrim()`剔除`string`两边的空格
  - GeekPark.stringTrim('geekpark ') => 'geekpark'
8. `arrayShuffle()`打乱一个数组

  ```javascript
  var arr = [1,2,3,4,5];
  GeekPark.arrayShuffle(arr);
  // [2,1,4,5,3]
  // [3,1,4,2,4]
  // ...
  ```

9.增加`formValidator`表单校验工具，通过给`input`标签增加`data-validate`属性即可使用校验器。

##### HTML表单
```
data-validatae可能的属性
required   必填
min5       最少5个字段（也可以是min7 min10）
max20      最多20个字段
email      邮箱类型
mobile     手机号码（以1开头的11位手机号）
repassword 密码重复（根据#password的值来校验）
```

#####javascript调用
```javascript
// form 需要验证的form标签，可以是jQuery支持的任何选择器
// callback 表单提交并验证成功时所触发的函数
// 也就是说你不需要再阻止表单提交，专心干表单验证通过后的事情
GeekPark.formValidator({
  form : '#form-test',
  callback: postData    // function name
});
```

#####表单错误提示样式
通过对表单内的input.error样式进行定义即可覆盖原有样式

10. 增加loadTemplate函数，用于动态载入HTML模板
```javascript
loadTemplate(@templateURL, @callback function)
```

11. isPage用于检测某页面是否有JS运行权限,等同于 `$('body').hasClass(pageClass)` 返回一个 `Boolean`
```javascript
GeekPark.isPage(@pageClass);
// return Boolean ? true : false

```

12. `isMobile()` 利用`UA`检测是否为移动端浏览器，不是十分准确

13. `reload()` 硬刷新页面，忽略缓存

14. `countDown()` 倒计时页面
```javascript
GeekPark.countDown({
  total: 5, // 倒计时的秒数
  dom: 'span.countdown', // 显示秒数的ID
  callback: function () {
    alert('countdown end');
  }
});
```

### TODO：
1. bower以及CMD/AMD组件支持
2. DEMO样例编写
