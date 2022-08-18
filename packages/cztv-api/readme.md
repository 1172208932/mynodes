# NewBlue(CztvApi)

## 前言

### Description

蓝TV客户端jsBridge方法封装

## 如何应用？

### 📦 Install

```bash
yarn add @newblue/cztv-api
```
or
```bash
npm install @newblue/cztv-api --registry=http://10.200.37.236:4873/
```

### 🔨 Usage

```js
import CztvApi  from '@newblue/cztv-api'
	
const shareData = {
	url: "http://mhudong.cztv.com/260366",
	title: "123",
	content: "213",
	img: "https://ohudong.cztv.com/1/260366/images/qrcode.png"
}
const param = {
	debug: true, // 显示调试信息
	...shareData
}
const cztvApi = new CztvApi(param) // 可不传参
```

### 🚀 Examples

显示和隐藏分享按钮
```js
cztvApi.showShareButton('true')
```

修改分享参数
```js
cztvApi.changeShareInfo(shareData)
```

调起客户端分享
```js
cztvApi.share(shareData)
```

获取版本号
```js
cztvApi.version()
```

调起摇一摇音效
```js
cztvApi.playSound()
```

打开点播页
```js
cztvApi.vodPlay({
	videoId: '717862',
	videoTitle: '《2019中国好声音》第15期：鸟巢总决赛  四大战队严正以待',
	videoShareUrl: 'https://tv.cztv.com/vplay/717862.html',
	videoImage: 'http://i05.cztv.com/cztv/vms/2019/10/07/8f00f140b7894ac1813fc82dd78c7519/9_640_400.jpg',
	videoAblumId: '1933',
	videoChannelId: '11'
})
```

打开会员页
```js
cztvApi.pushVipPage()
```

唤起登录页
```js
cztvApi.login()
```

获取用户信息，未登录会唤起登录页（老接口）
```js
cztvApi.getUserInfo()
```

仅获取用户信息（新接口）
```js
cztvApi.userInfo()
```

修改标题
```js
cztvApi.refreshTitle('new Title')
```

分享平台配置，配置右上角调起的分享面板中的图标和方法，后续可扩展
```js
cztvApi.addSharePlatform({
    "shortcut":{
        "shortLabel": "测试-画展",
        "icon": "https://ohudong.cztv.com/1/264275/img/01.903b677c.png",
        "url": "http://mhudong.cztv.com/264275",
        "isPinShortcutSupported": true
    }
})
```

查询客户端是否支持指定的JS方法
```js
cztvApi.checkJsApi({
	apiList: [
		"CZTVJsdk.showShareButton",
		"CZTVJsdk.share"
	]
})
```

图片缩放预览
```js
cztvApi.previewImage({
	currentIndex: 0,
	imgeData: "https://ohudong.cztv.com/1/264275/img/02.82c9adb5.png,https://ohudong.cztv.com/1/264275/img/03.ffb577cb.png" // 网络地址，逗号分隔
})
```

获取网络状态
```js
cztvApi.getNetworkType()
```

调起app页面
```js
cztvApi.getNetworkType({
	resource_type: 0, //跳转类型
	resource_body: "101" //页面加载所用到的id
})
```

配置胶囊样式UI
```js
cztvApi.getNetworkType({
    showCapsule: true,
    capsuleBgColor: '#ffffff',
    capsuleButtonColor: '#000000',
    icon: 'https://ohudong.cztv.com/1/261597/images/tvLogo.png'
})
```
