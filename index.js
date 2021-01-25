const md5 = require('md5')
const request = require('request')

class Client {
    constructor(type, userId, apiKey) {
        this.type = type.trim()
        this.userId = userId.trim()
        this.apiKey = apiKey.trim()
        this.timeout = 10000
        this.format = 'json'
        this.version = 'nodejs-1.0.0'
        if (type === 'live') {
            this.root = 'https://api.csslcloud.net/api/' // 云直播
        } else if (type === 'liveclass') {
            this.root = 'https://ccapi.csslcloud.net/api/' // 小班课直播
        } else if (type === 'spark') {
            this.root = 'http://spark.bokecc.com/api/' // 点播
        } else {
            console.log('请填写正确的类型名称')
        }
    }
    // 调用API方法
    async call(action, queryData) {
        var url = this.root + action.replace(/([A-Z])/g, (g) => `/${g[0].toLowerCase()}`)
        queryData.format = this.format
        var queryString = this.thqs(queryData)
        // console.log(`${url}?${queryString}`)
        return await new Promise((resolve, reject) => {
            request(`${url}?${queryString}`, (error, response, body) => {
                if (error) {
                    reject(error)
                }
                resolve(body)
            })
        })
    }
    // 拼接查询字符串
    thqs(params) {
        params.userid = this.userId
        var keys = Object.keys(params).sort()
        var qs = ''
        for (var key of keys) {
            if (params[key]) {
                qs += `${key.toLowerCase()}=${encodeURIComponent(params[key])}&`
            }
        }
        qs += `time=${Math.round(new Date().getTime() / 1000)}`
        var md5String = md5(qs + `&salt=${this.apiKey}`).toUpperCase()
        qs += `&hash=${md5String}`
        return qs
    }
}

exports.Client = Client