geekpark.js
===========

一个内部使用的javascript库

####LIENCE
![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)

### 1.概述
一个团队内部使用的javascrip库，主要着重减轻前端工作量，提高组件复用性。目前处于初级开发阶段。
### 2.安装
* 此插件依赖jQuery框架，请先引入jQuery
* 下载[geekpark.min.js](https://raw.githubusercontent.com/GeekPark/geekpark.js/master/assets/javascript/geekpark.min.js)到项目文件夹
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
3. `whichTransitionEvent()`检测某元素css动画知否执行完毕。某些浏览器原生也有检测完毕，该例子只是为了兼容性
	```
	var transitionEvent = GeekPark.whichTransitionEvent();
	
   $('xxx').one(transitionEvent, function(event) {
     // Do something when the transition ends
   });
	```
4. `alertTip()`一个弹窗组件，用于美化浏览器自带`alert()`，兼容移动版
	- 参数说明： `alertTip(title, tip, type)`
	- `title`弹窗标题`tip`弹窗正文`type(可选): error`类型
	- 此例会使用到geekpark.css
5. `share`对象，拥有`openWindow`和`run`方法，用于打开微博和twitter的分享。
	- window.GeekPark.share.run(type, options)
	- type ==> { weibo | twitter }
	- options ==> {title: 'title', imageView: 'img url'}
6. `loadingBtn`对象，目前拥有`createNew`方法
	- GeekPark.loadingBtn( jQueryObject, loadingGif图片地址 );
7. `isWechat()`通过UA检测是否在微信浏览器内打开页面，返回布尔值
8. `stringTrim()`剔除`string`两边的空格
	- GeekPark.stringTrim('geekpark ') => 'geekpark'
9. `arrayShuffle()`打乱一个数组
	```
	var arr = [1,2,3,4,5];
	GeekPark.arrayShuffle(arr);
	// [2,1,4,5,3]
	// [3,1,4,2,4]
	// ... 
	```
10. `changeWechatShare()`用于更改微信`分享到朋友圈`、`发送给朋友`的`标题`、`描述`以及`缩略图`
	```
	shareData = {
     title: xxx, // 可选
     desc: xxx, // 可选
     link: xxx, // 可选
     img_url: xxx   // 必须
  	}
  	GeekPark.changeWechatShare(shareData);
	```
	- 如果你是`服务号`并且还想增加在朋友圈中的`来自xxx`小尾巴，请看源码，在`WeixinJSBridge.invoke('shareTimeline', {`下的参数中增加`"appid" : 公众号原始ID"

### TODO：
1. bower以及CMD/AMD组件支持
2. grunt:watch监听文件变化
3. autoreload支持
4. DEMO编写
