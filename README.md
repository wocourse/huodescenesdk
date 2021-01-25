# 获得场景NodeJS SDK
![npm version](https://img.shields.io/badge/npm-1.0.0-brightgreen)

## 说明
获得场景（原CC视频）主要提供云点播、云直播、云课堂等相关接口，本项目是NodeJS的SDK，封装了官方Web API

## 用法
### 注册和申请
使用前请注册官方平台并申请获取User ID和API Key

[获得场景API](https://doc.bokecc.com/)

### 安装
```bash
npm install huodescenesdk
```

### 调用
```javascript
const hsSDK = require('huodescenesdk')
const hsClient = new hsSDK.Client(type, userId, apiKey)
// type: live云直播，liveclass云课堂，spark云点播
// UserID和APIKey: 官方获取的apiKey或sparkApiKey

// 调用
// hsClient.call(具体接口地址的驼峰表示, 参数)
// e.g.
var result1 = await hsClient.call('roomCreate', params)
console.log(result1) // {"result":"OK", ...}

var result2 = await hsClient.call('user', {})
console.log(result2) //{"user":{"account":"","version":"","expired":"2018-07-31","space":{"total":100,"remain":100,"used":0},"traffic":{"total":100,"remain":100,"used":0}}}
```