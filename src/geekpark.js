/**
 * This is a javascript library
 * Author: Dongdong
 * Version: 1.1.2
 * Date: 2014.06.08
 * Mail: mail@liyaodong.com
 */
'use strict';

$(function() {
  window.GeekPark = {
    // 滑动到某个DOM
    slideToDom: function(domid, offset, callback) {
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
    isRetinaDisplay: function() {
      if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        if (mq && mq.matches || (window.devicePixelRatio > 1)) {
          return true;
        } else {
          return false;
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
    },

    // 用于动态加载HTML模板
    loadTemplate: function (templateURL, callback) {
      $.ajax({
        url: templateURL,
        dataType: 'html'
      })
      .done(function(data) {
        callback(data);
      })
      .fail(function() {
        console.error('Load '+ templateURL +' failure .');
      });
    },

    // 检测页面是否有JS权限
    isPage: function(pageClass) {
      return $('body').hasClass(pageClass) ? true : false;
    },

    // 利用UA检测是否为移动设备
    isMobile: function () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;
    },

    // 刷新页面
    reload: function () {
      document.location.reload(true);
    }

  }; // GeekPark object define end

  (function($, GeekPark) {

    //用于表单验证，传入form的选择器即可，eg: #myform .myform form
    GeekPark.formValidator = function(opt) {
      if($(opt.form).length === 0 || typeof opt.callback !== 'function') {
        console.error('formValidator.argument error');
        return false;
      }
      var $form = $(opt.form);
      /******「C」事件逻辑******/
      $form.on('submit', function(event) {
        event.preventDefault();
        if(checkAll($form)) {
          opt.callback();
        } else {
          highlight($form);
        }
      });

      // 监听blur事件
      $form.find('input').each(function() {
        // 寻找所有设置了校验规则的input
        var rule = $(this).data('validate');
        if(typeof rule == 'string') {
          var validResult;
          // 如果已经自动聚焦则直接失去焦点时检测
          if(typeof $(this).attr('autofocus') == 'string') {
            $(this).blur(function(event) {
              validResult = validItem($(this), rule);
              updateStatus(validResult, $(this));
            });
          } else {
            $(this).focus(function() {
              removeError($(this));
              $(this).blur(function() {
                validResult = validItem($(this), rule);
                updateStatus(validResult, $(this));
              });
            });
          }
        }
      });

      // 高亮所有错误
      function highlight ($dom) {
        $dom.find('input').each(function() {
          var rule = $(this).data('validate');
          if(rule) {
            var validResult = validItem($(this), rule);
            updateStatus(validResult, $(this));
          }
        });
      }

    };

    /******「M」数据逻辑 ******/

    function validItem ($dom, rule) {
      // 针对每个input进行规则校验
      var ruleItem = rule.split('|'),
          str = $dom.val(),
          count = 0,
          pass = 0;

      // 默认给是否通过校验写上未通过
      $dom.data('valid', 0);

      for (var i = 0; i < ruleItem.length; i++) {
        // 每个表单可能有多个校验规则
        var result = validRule(ruleItem[i], str);
        count ++;
        if(result) pass++;
      };

      // 如果所有规则全部匹配成功则标记通过校验
      if(count == pass) {
        $dom.data('valid', 1);
        return true;
      } else {
        return false;
      }
    }

    // 如果需要新加规则就在这里加
    function validRule (rule, str) {
      switch(rule) {
        case 'required':
          return (str.length > 0) ? true : false;
          break;
        case 'mobile':
          return /^1\d{10}$/.test(str);
          break;
        case 'email':
          return /^[^@]+@([^@\.]+\.)+[^@\.]+$/.test(str);
          break;
        case 'repeat-password':
          return (str == $('#password').val() && str.length !== 0);
          break;
        default:
          if(/^min\d+$/i.test(rule)) {
            // min xxx
            return (str.length >= rule.match(/\d+/)[0]);
          } else if(/^max\d+$/i.test(rule)) {
            return (str.length <= rule.match(/\d+/)[0]);
          }
          break;
      }
    }

    // 检查是否所有校验都已通过
    function checkAll ($form) {
      var count = 0,
          pass = 0;
      $form.find('input').each(function() {
        var rule = $(this).data('validate');
        if(rule) {
          count ++;
          if($(this).data('valid') == 1) {
            pass ++;
          }
        }
      });
      return (count == pass && pass !== 0);
    }
    /******「M」数据逻辑 end ******/

    /******「V」视图逻辑 ******/
    function addError ($dom) {
      if(!$dom.hasClass('error')) {
        $dom.addClass('error');
      }

      if(!$dom.hasClass('shakeonce')) {
        $dom.addClass('shakeonce');
      }

      $dom.on("webkitAnimationEnd", function() {
        $dom.removeClass('shakeonce');
      });
    }

    function removeError ($dom) {
      $dom.removeClass('error');
    }

    // 根据校验是否通过加上相关提示
    function updateStatus (validResult, $dom) {
      if(validResult) {
        removeError($dom);
      } else {
        addError($dom);
      }
    }
    /******「V」视图逻辑 end ******/


  })(jQuery, GeekPark);

}); // run delay end
