const { version } = require('../package.json')

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

/**
 * @description: 创建实例，可预设分享参数，可显示和隐藏调试信息
 * @param {Object} param 对象解构，剩余参数作为预设分享参数 可选
 * {Boolean} debug 显示和隐藏调试信息 可选
 * {Object} shareData 预设分享参数 可选
 * {
      "url": 'http://mhudong.cztv.com/260366', //分享的网址链接
      "title": "123", //分享的标题
      "content": "213", // 分享的文字
      "img": "https://ohudong.cztv.com/1/260366/images/qrcode.png", // 分享的图片Url
    }
 * @return {*}
 */
function CztvApi({ debug = false, ...shareData } = {}) {
  console.log('CztvApi ' + version)
  if (shareData) {
    this.shareData = shareData
  }

  this.debug = debug
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
 * @description: 显示和隐藏分享按钮
 * @param {String} showShareButton 字符串类型的布尔值,'true'/'false'
 * @return {*}
 */
CztvApi.prototype.showShareButton = function (showShareButton = 'true') {
  if (this.debug) console.log('showShareButton:', showShareButton)

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.showShareButton', showShareButton)
  })
}

/**
 * @description: 修改分享参数
 * @param {Object} shareData
 *  {
      "url": 'http://mhudong.cztv.com/260366', //分享的网址链接
      "title": "123", //分享的标题
      "content": "213", // 分享的文字
      "img": "https://ohudong.cztv.com/1/260366/images/qrcode.png", // 分享的图片Url
    }
 * @return {*}
 */
CztvApi.prototype.changeShareInfo = function (shareData = this.shareData) {
  const debug = this.debug
  if (debug) console.log('changeShareInfo:', shareData)

  shareData != null && setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.changeShareInfo', shareData, function (res) {
      if (debug) console.log('设置分享参数:', res)
    })
  })
}

/**
 * @description: h5调起客户端分享
 * @param {Object} shareData
 *  {
      "url": 'http://mhudong.cztv.com/260366', //分享的网址链接
      "title": "123", //分享的标题
      "content": "213", // 分享的文字
      "img": "https://ohudong.cztv.com/1/260366/images/qrcode.png", // 分享的图片Url
    }
 * @return {*}
 */
CztvApi.prototype.share = function (shareData = this.shareData) {
  const debug = this.debug
  if (debug) console.log('share:', shareData)

  shareData != null && setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.share', shareData, function (res) {
      if (debug) console.log('调起客户端分享：', res)
    })
  })
}

/**
 * @description: 获取版本号
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.version = function (resCallback) {
  if (this.debug) console.log('version')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.version', null, function (res) {
      // console.log(res)
      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 调起摇一摇音效
 * @return {*}
 */
CztvApi.prototype.playSound = function () {
  const debug = this.debug
  if (debug) console.log('playSound')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.playSound', null, function (res) {
      if (debug) console.log('playSound:', res)
    })
  })
}

/**
 * @description: 打开点播页
 * @param {Object} playOptions
 *  {
      videoId: '717862',
      videoTitle: '《2019中国好声音》第15期：鸟巢总决赛  四大战队严正以待',
      videoShareUrl: 'https://tv.cztv.com/vplay/717862.html',
      videoImage: 'http://i05.cztv.com/cztv/vms/2019/10/07/8f00f140b7894ac1813fc82dd78c7519/9_640_400.jpg',
      videoAblumId: '1933',
      videoChannelId: '11'
    }
 * @return {*}
 */
CztvApi.prototype.vodPlay = function (playOptions) {
  if (this.debug) console.log('vodPlay')

  playOptions != null && setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.vodPlay', playOptions)
  })
}

/**
 * @description: 打开会员页
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.pushVipPage = function (resCallback) {
  const debug = this.debug
  if (debug) console.log('pushVipPage')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.pushVipPage', null, function (res) {
      if (debug) console.log('打开会员页：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 唤起登录页，未登录则返回''，登录成功code: 200，取消登录code: 401
 * 20220817直接关闭登录页，安卓端有code返回，ios无任何返回
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.login = function (resCallback) {
  const debug = this.debug
  if (debug) console.log('pushLoginPage')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.pushLoginPage', null, function (res) {
      if (debug) console.log('登录：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 获取用户信息，未登录会唤起登录页（老接口）
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.getUserInfo = function (resCallback) {
  const debug = this.debug
  if (debug) console.log('getUserInfo')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.getUserInfo', null, function (res) {
      if (debug) console.log('旧用户信息：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 仅获取用户信息（新接口），可用来判断是否已登录，未登录则返回''
 * @param {*} resCallback
 * @return {*} 
 */
CztvApi.prototype.userInfo = function (resCallback) {
  const debug = this.debug
  if (debug) console.log('userInfo')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.userInfo', null, function (res) {
      if (debug) console.log('新用户信息：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 修改标题
 * @param {String} title
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.refreshTitle = function (title, resCallback) {
  const debug = this.debug
  if (debug) console.log('refreshTitle')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.refreshTitle', title, function (res) {
      if (debug) console.log('refreshTitle:', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 分享平台配置，配置右上角调起的分享面板中的图标和方法，后续可扩展
 * @param {Object} addSharePlatformdata 文档入参为JSON，实际测试无效，请以Object格式传入
 *  {
 *    // 桌面快捷方式
 *    "shortcut": {
 *      "shortLabel": "标题",
 *      "icon": "桌面icon",
 *      "url": "下次打开显示的链接",
 *      "isPinShortcutSupported": true // 是否支持快捷方式
 *    }
 *  }
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.addSharePlatform = function (addSharePlatformdata, resCallback) {
  const debug = this.debug
  if (debug) console.log('addSharePlatform')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.addSharePlatform', addSharePlatformdata, function (res) {
      if (debug) console.log('右上角面板配置：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 查询客户端是否支持指定的JS方法
 * @param {Object} apiList 查询的api数组对象
 *  {
 *    "apiList"：[ 
 *      'CZTVJsdk.showShareButton', 
 *      'CZTVJsdk.share' 
 *    ]
 *  }
 * @param {*} resCallback
 * @return {*} res 以键值对的形式告知前端结果
 * {
 *    "code": 200,
 *    "data": {
 *      "checkResult": {
 *        "CZTVJsdk.showShareButton": true,
 *        "CZTVJsdk.share ": false
 *      }
 *    }
 * }
 */
CztvApi.prototype.checkJsApi = function (apiList, resCallback) {
  const debug = this.debug
  if (debug) console.log('checkJsApi')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.checkJsApi', apiList, function (res) {
      if (debug) console.log('当前版本客户端是否支持指定CztvApi:', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 图片缩放预览
 * @param {Object} previewImagedata
 *  {
 *    "currentIndex"：0, // 当前预览下标
 *    "imgeData": "src,src" // 网络地址，逗号分隔
 *  }
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.previewImage = function (previewImagedata, resCallback) {
  const debug = this.debug
  if (debug) console.log('previewImage')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.previewImage', previewImagedata, function (res) {
      if (debug) console.log('图片缩放预览：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 获取网络状态
 * 调用此方法后客户端会注册网络广播进行网络监听，网络发生变更后会再次通过 callback回调给前端
 * @param {*} resCallback
 * @return {*} res
 * {
 *    "netType": "网络状态" // wifi、mobile、unknown
 * }
 */
CztvApi.prototype.getNetworkType = function (resCallback) {
  const debug = this.debug
  if (debug) console.log('getNetworkType')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.getNetworkType', null, function (res) {
      if (debug) console.log('获取网络状态：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 调起app页面
 * @param {Object} openPagedata
 * {
 *    "resource_type": 1, //跳转类型
 *    "resource_body": "id" //页面加载所用到的id
 * }
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.openPage = function (openPagedata, resCallback) {
  const debug = this.debug
  if (debug) console.log('openPage')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.openPage', openPagedata, function (res) {
      if (debug) console.log('调起app页面：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

/**
 * @description: 配置胶囊样式UI
 * @param {Object} configureCapsuledata 文档入参为JSON，实际测试无效，请以Object格式传入
 * {
 *    "showCapsule": true, // 显示胶囊，否则用老样式
 *    "capsuleBgColor": "#ffffff", // 胶囊背景颜色
 *    "capsuleButtonColor": "#000000", // 胶囊按钮颜色
 *    "icon": "https://ohudong.cztv.com/1/261597/images/tvLogo.png" // 左上角icon
 * }
 * @param {*} resCallback
 * @return {*}
 */
CztvApi.prototype.configureCapsule = function (configureCapsuledata, resCallback) {
  const debug = this.debug
  if (debug) console.log('configureCapsule')

  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler('CZTVJsdk.configureCapsule', configureCapsuledata, function (res) {
      if (debug) console.log('配置胶囊样式UI：', res)

      if (resCallback) {
        resCallback(res)
      }
    })
  })
}

export default CztvApi