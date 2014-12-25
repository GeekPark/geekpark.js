/**
 * This is a javascript library
 * Author: Dongdong
 * Version: 1.0.0
 * Date: 2014.12.25
 * Mail: mail@liyaodong.com
 */
'use strict';

$(function() {
  window.GeekPark = {
    // 滑动到某个DOM
    "slideToDom": function(domid, offset, callback) {
      if (typeof(callback) == 'function') {
        $('html,body').animate({
            scrollTop: parseInt($(domid).offset().top - offset) + 'px'
          }, 800)
          .promise().done(function() {
            callback();
          });
      } else {
        $('html,body').animate({
          scrollTop: parseInt($(domid).offset().top - offset) + 'px'
        }, 800);
      }

    },

    // 检测是否为retina屏幕
    "isRetinaDisplay": function() {
      if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        if (mq && mq.matches || (window.devicePixelRatio > 1)) {
          return true;
        } else {
          return false;
        }
      }
    },

    // 检测css动画是否执行完毕
    /*
     var transitionEvent = GeekPark.whichTransitionEvent();

     $('xxx').one(transitionEvent, function(event) {
     // Do something when the transition ends
     });
     */
    "whichTransitionEvent": function() {
      var t,
        el = document.createElement("fakeelement");

      var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
      }

      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    },

    // GeekPark 公用弹窗组件，需要引入GeekPark.css
    "alertTip": function(title, tip, type) {
      var mask = document.createElement('div'),
        $body = $('body');

      var alertTip = {
        "open": function() {
          if (!$('#gptip').length) {
            $body.append('<div id="gptip"><div class="gptip-title">' + title + '<a href="javascript:;" class="fa fa-close gptip-close"></a></div><div class="gptip-content">' + tip + '</div><a href="javascript:;" class="confirm">确&nbsp;&nbsp;定</a></div>');


            $(mask).attr('id', 'gptip-mask');
            $(mask).addClass('gptip-mask');
            $body.append(mask);

          }

          $('#gptip').addClass('on');
          $('#gptip-mask').addClass('on');

        },
        "close": function() {
          $('#gptip-mask').fadeOut(300);
          $('#gptip').fadeOut(300);

          setTimeout(function() {
            $('#gptip').remove();
            $('#gptip-mask').remove();
          }, 400);

        }
      };

      alertTip.open();

      $('#gptip a.confirm,#gptip a.gptip-close,#gptip-mask').click(function() {
        alertTip.close();
      });

      if (type == 'error') {
        $('#gptip').addClass('error');
      }
    },
    // 分享
    // window.GeekPark.share.run(type, options)
    // options用法(imageView是可选的)：
    // options ==> {title: 'title', imageView: 'img url'}
    share: {
      openWindow: function(url) {
        window.open(url, '', 'width=700, height=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
      },
      run: function(type, options) {
        // Initialize
        var context = this,
          items = {
            weibo: 'http://service.weibo.com/share/share.php?url=<%= url %>&appkey=3896321144&title=<%= title %>&pic=<%= imageURL %>&ralateUid=1735559201',
            twitter: 'https://twitter.com/share?url=<%= url %>&text=<%= title %>'
          };
        // Set default values
        type = type || 'wechat';
        options = $.extend({
          title: 'GeekPark',
          url: location.protocol + '//' + location.hostname + location.pathname,
          imageURL: ''
        }, options);
        if ($.inArray(type, Object.keys(items)) > -1) {
          var tmplt = _.template(items[type]);
          context.openWindow(tmplt(options));
        }
      }
    },
    loadingBtn: {
      createNew: function($link, loadingGif) {
        var img = '<img src="'+loadingGif+'" style="display: hidden" />';
        $link.after(img);
        var $img = $link.next('.loading-img');
        return {
          loading: function() {
            $link.hide();
            $img.show();
          },
          done: function() {
            $img.hide();
            $link.show();
          }
        };
      }
    },

    // 检测是否在微信中打开
    isWechat: function() {
      var ua = navigator.userAgent.toLowerCase();
      return (/micromessenger/.test(ua)) ? true : false;
    },

    // 去掉字符串两端的空格
    stringTrim: function(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },

    // 用于随机打乱数组排序
    arrrayShuffle: function(arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
      }
      return arr;
    }

  }; // GeekPark object define end

  /*******GeekPark Object定义完毕，以下为扩展函数（当需要调用GeekPark已定义函数时需要写在下方）******/

  // 用于动态的改变微信分享时的标题、图片、以及描述，自带微信浏览器检测
  // shareData = {
  //   title: xxx, // 可选
  //   desc: xxx, // 可选
  //   link: xxx, // 可选
  //   img_url: xxx   // 必须
  // }
  GeekPark.changeWechatShare = function(shareData) {
    if (GeekPark.isWechat()) {
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 如果没有该值则使用默认
        shareData.title = shareData.title ? shareData.title : document.title;
        shareData.desc = shareData.desc ? shareData.desc : $('meta[name=description]').attr('content');
        shareData.link = shareData.link ? shareData.link : window.location.href;

        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
          WeixinJSBridge.invoke('sendAppMessage', {
            "title": shareData.title,
            "desc": shareData.desc,
            "link": shareData.link,
            "img_url": shareData.img_url,
            "img_width": "160",
            "img_height": "160"
          }, function(res) {
            _report('timeline', res.err_msg);
          });
        });

        WeixinJSBridge.on('menu:share:timeline', function(argv) {
          WeixinJSBridge.invoke('shareTimeline', {
            "title": shareData.title,
            "desc": shareData.desc,
            "link": shareData.link,
            "img_url": shareData.img_url,
            "img_width": "160",
            "img_height": "160"
          }, function(res) {
            _report('timeline', res.err_msg);
          });
        });
      }, false);
    }
  }; // GeekPark.changeWecahtShare end


}); // run delay end




