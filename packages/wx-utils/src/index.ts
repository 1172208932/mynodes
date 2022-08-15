/* eslint-disable */
import axios from "axios";
// import wx from 'weixin-jsapi'
import wx from "weixin-js-sdk";

function wxShare(canShare, a, b, c, d, e) {
  const ua = window.navigator.userAgent.toLowerCase();
  if (/micromessenger/.test(ua)) {
    var newsTitle = a;
    var newsLink = d;
    var newsImage = e;
    var newsIntro = b;
    var newsTimeline = c;
    const url =
      "https://ssohudong.cztv.com/weixin_share/share?channel_id=1&url=" +
      encodeURIComponent(location.href.split("#")[0]) +
      "&callback=?";
    console.log("shareUrl:", url);
    axios.get(url).then((msg) => {
      //   返回值是 '?({})' 的格式
      const data = JSON.parse(msg.data.slice(2, -1));
      console.log("share:", data);
      const menuList = [
        // 'menuItem:openWithQQBrowser',
        // 'menuItem:openWithSafari',
        "menuItem:share:qq",
        "menuItem:share:weiboApp",
        "menuItem:share:QZone",

        "menuItem:copyUrl",
        "menuItem:editTag",
        "menuItem:delete",
        "menuItem:originPage",
        "menuItem:readMode",
        "menuItem:share:email",
        "menuItem:share:brand",
      ]; // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
      if (data.success) {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "hideMenuItems",
            "showMenuItems",
            "openAddress",
          ],
        });
      }
      wx.ready(function () {
        console.log(newsTimeline, newsIntro, newsLink);
        if (!canShare) {
          const newMenuList = [
            // @ts-ignore
            ...menuList,
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
          ];
          wx.hideMenuItems({
            menuList: newMenuList,
          });
        } else {
          wx.showMenuItems({
            menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"],
          });
          wx.hideMenuItems({
            menuList: menuList,
          });
        }

        wx.onMenuShareTimeline({
          title: newsTimeline,
          link: newsLink,
          imgUrl: newsImage,
          success: function () {
            // 用户点击了分享后执行的回调函数
          },
        });
        wx.onMenuShareAppMessage({
          title: newsTitle,
          desc: newsIntro,
          link: newsLink,
          imgUrl: newsImage,
          success: function () {
            // 用户点击了分享后执行的回调函数
          },
        });
      });
    });
  }
}

function getWxAddress() {
  return new Promise((resolve, reject) => {
    wx.ready(function () {
      wx.openAddress({
        success: function (res) {
          console.log("wx.openAddress:", res);
          resolve(res);
        },
        fail: function (err) {
          console.info("获取收货地址失败");
          reject(err);
        },
      });
    });
  });
}

// 外界调用 直接引入 wxPay.js 传入支付参数 以及跳转页面路由
// 首先封装具体的封装方法
// 参数说明 callback ：支付成功后回调。
// params: 支付需要的参数
function onBridgeReady(params, callback) {
  console.log("onBridgeReady");
  if (window.WeixinJSBridge) {
    window.WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      {
        appId: params.appId, // 公众号名称，由商户传入
        timeStamp: params.timeStamp,
        nonceStr: params.nonceStr,
        package: params.package,
        signType: params.signType,
        paySign: params.sign,
      },
      function (res) {
        console.log(res);
        callback(res);
        // if (res.err_msg === 'get_brand_wcpay_request:ok') {
        // }
      }
    );
  }
}

function wxBridgePay(params, callback) {
  console.log("微信内部支付功能", params);
  // @ts-ignore

  if (typeof WeixinJSBridge === "undefined") {
    if (document.addEventListener) {
      // @ts-ignore
      document.addEventListener(
        "WeixinJSBridgeReady",
        onBridgeReady(params, callback),
        false
      );
      // @ts-ignore
    } else if (document.attachEvent) {
      // @ts-ignore
      document.attachEvent(
        "WeixinJSBridgeReady",
        onBridgeReady(params, callback)
      );
      // @ts-ignore
      document.attachEvent(
        "onWeixinJSBridgeReady",
        onBridgeReady(params, callback)
      );
    }
  } else {
    onBridgeReady(params, callback);
  }
}

// config的appid是wxb80的，和后台支付配的不一样
function wxApiPay(data) {
  return new Promise((resolve, reject) => {
    wx.ready(function () {
      wx.chooseWXPay({
        timestamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.sign,
        success: function (res) {
          // 支付成功后的回调函数
          resolve(res);
        },
        cancel: function () {
          // 支付取消
          resolve(reject);
        },
        fail: function () {
          // 支付失败
          resolve(reject);
        },
      });
    });
  });
}

export { wxShare, wxBridgePay, wxApiPay, getWxAddress };
