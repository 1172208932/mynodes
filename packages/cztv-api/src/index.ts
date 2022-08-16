/**
 * 配合 IOS 使用时的初始化方法
 */
var u = navigator.userAgent
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

/**
 * 配合 IOS 使用时的初始化方法
 */
function iosFunction(callback) {
  if (window.WebViewJavascriptBridge) {
    // @ts-ignore
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

function androidFunction(callback) {
  if (window.WebViewJavascriptBridge) {
    // @ts-ignore
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

const setupWebViewJavascriptBridge = isAndroid ? androidFunction : iosFunction

/*
  showShareButton:(string) 'true'/'false'，控制app右上角分享是否显示；
  shareData:(object) 分享参数;
      "url": 'http://mhudong.cztv.com/260366', //分享的网址链接
      "title": "123", //分享的标题
      "content": "213", // 分享的文字
      "img": "https://ohudong.cztv.com/1/260366/images/qrcode.png", // 分享的图片Url
*/
function CztvApi(shareData) {
  console.log('v1.0.0')
  if (shareData) {
    this.shareData = shareData
  }
  // 客户端初始化存在延迟，过早调用可能导致失败
}

/* 设置shareData数据   分享的信息
 * 此处由客户端端调用网页js，来设置分享的参数
 * 客户端展示分享按钮是先根据其自身之前页面跳转参数决定是否展示分享，
 * 然后根据网页参数决定是否展示，网页优先级在其自身之后
 * 
 * 该接口两端存在差异，不建议使用，请用showShareButton和changeShareInfo代替
 */
// CztvApi.prototype.setShareData = function (shareData = this.shareData) {
//   console.log('setShareData:', shareData)
//   shareData != null && setupWebViewJavascriptBridge(function (bridge) {
//     bridge.registerHandler('CZTVJsdk.setShareData', function (data, responseCallback) {
//       responseCallback(shareData)
//     })
//   })
// }

/**
 * 显示和隐藏分享按钮
 * @param {*} showShareButton
 */
CztvApi.prototype.showShareButton = function (showShareButton = 'true') {
  console.log('showShareButton:', showShareButton)
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.showShareButton', showShareButton)
  })
}

/**
 * 修改分享参数
 * @param {*} shareData
 */
CztvApi.prototype.changeShareInfo = function (shareData = this.shareData) {
  console.log('changeShareInfo:', shareData)
  shareData != null && setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.changeShareInfo', shareData, function (res) {
      console.log('设置分享参数:', res)
    })
  })
}

/*
  h5调起客户端分享
  shareData:(object) 分享参数;
      "url": 'http://mhudong.cztv.com/260366', //分享的网址链接
      "title": "123", //分享的标题
      "content": "213", // 分享的文字
      "img": "https://ohudong.cztv.com/1/260366/images/qrcode.png", // 分享的图片Url
*/
CztvApi.prototype.shareCZTVApp = function (shareData = this.shareData) {
  console.log('shareCZTVApp:', shareData)
  shareData != null && setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.share', shareData, function (res) {
      console.log('调起客户端分享：', res)
    })
  })
}

/*
    获取版本号
*/
CztvApi.prototype.version = function (resCallback) {
  setupWebViewJavascriptBridge(function (bridge) {
    console.log('version')
    bridge.callHandler('CZTVJsdk.version', null, function (res) {
      // console.log(res);
      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/*
    调起客户端 摇一摇音效
*/
CztvApi.prototype.playSound = function () {
  setupWebViewJavascriptBridge(function (bridge) {
    console.log('playSound')
    bridge.callHandler('CZTVJsdk.playSound', null, function (res) {
      console.log(res)
    })
  })
}

/*
    打开点播页
    playOptions:(object) 视频参数;
        videoId: '717862',
        videoTitle: '《2019中国好声音》第15期：鸟巢总决赛  四大战队严正以待',
        videoShareUrl: 'https://tv.cztv.com/vplay/717862.html',
        videoImage: 'http://i05.cztv.com/cztv/vms/2019/10/07/8f00f140b7894ac1813fc82dd78c7519/9_640_400.jpg',
        videoAblumId: '1933',
        videoChannelId: '11',
*/
CztvApi.prototype.vodPlay = function (playOptions) {
  console.log('vodPlay')
  playOptions != null && setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.vodPlay', playOptions)
  })
}

/*
    打开会员页
*/
CztvApi.prototype.pushVipPage = function (resCallback) {
  console.log('pushVipPage')
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.pushVipPage', null, function (res) {
      console.log('打开会员页：' + res)
      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/*
    登录
    未登录则返回''
*/
CztvApi.prototype.login = function (resCallback) {
  console.log('pushLoginPage')
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.pushLoginPage', null, function (res) {
      console.log('登录：' + res)
      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/*
    获取用户信息
    老接口，未登录会唤起登录页
*/
CztvApi.prototype.getUserInfo = function (resCallback) {
  console.log('getUserInfo')
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.getUserInfo', null, function (res) {
      console.log('旧用户信息：' + res)
      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/*
    获取用户信息
    新接口，登录成功code：200
*/
CztvApi.prototype.userInfo = function (resCallback) {
  console.log('userInfo')
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.userInfo', null, function (res) {
      console.log('新用户信息：' + res)
      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/*
    修改标题
    title:(string) 标题名称;
*/
CztvApi.prototype.refreshTitle = function (title, resCallback) {
  console.log('refreshTitle')
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.refreshTitle', title, function (res) {
      console.log(res)
      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

export default CztvApi