import axios from "axios"
import { message } from "antd"
import React from "react"
import responseCode from "./responseCode"

import * as Urls from "./urls"
axios.defaults.baseURL = Urls.IP_CONFIG
// axios.defaults.headers = {
//     ["x-AccessToken"]: window.localStorage.getItem("x-AccessToken"),
//     ["x-OnetimeToken"]: window.localStorage.getItem("x-OnetimeToken"),
//     ["x-Userid"]: window.localStorage.getItem("x-Userid"),
// }

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        console.log(response, "11113344")
        return response
    },
    function (error) {
        //重新获取token
        // if (error.response.status == "401") {
        //     // 说明token过期了,刷新token
        //     // get(Urls.TOKEN + "/", "")
        //     //     .then((res: any) => {
        //     //         console.log(res, "标签数据初始化")
        //     //         console.log(res.detail.onetimetoken.token, "newToken")
        //     //         setToken(res)
        //     //         const config = error.config
        //     //         return axios(config)
        //     //     })
        //     //     .catch((res) => {
        //     //         console.error("refreshtoken error =>", res)
        //     //         //刷新token失败，神仙也救不了了，跳转到首页重新登录吧
        //     //         // window.location.href = '/'
        //     //     })
        //     // return getOneTimeToken()
        //     //     .then((res) => {
        //     //         // 刷新token成功，将最新的token更新到header中，同时保存在localStorage中
        //     //         // const { token } = res
        //     //         setToken(res)
        //     //         // 获取当前失败的请求
        //     //         const config = error.config
        //     //         // 重置一下配置
        //     //         // config.headers['X-Token'] = token
        //     //         // config.baseURL = '' // url已经带上了/api，避免出现/api/api的情况
        //     //         // 重试当前请求并返回promise
        //     //         return axios(config)
        //     //     })
        //     //     .catch((res) => {
        //     //         console.error("refreshtoken error =>", res)
        //     //         //刷新token失败，神仙也救不了了，跳转到首页重新登录吧
        //     //         // window.location.href = '/'
        //     //     })
        // } else {
        //     // 对响应错误做点什么
        //     responseCode(error.response)
        // }
        responseCode(error.response)
        console.log(error.response, "adjalkdjalkdjalkdjaldjliqejlkjalkdjqlkjeklqjaslkdjlakjdla")
        return Promise.reject(error)
    }
)

function setToken(token: any) {
    window.localStorage.setItem("x-OnetimeToken", token)
}

function getOneTimeToken() {
    // res.config.url
    // res.config.params
    return get(Urls.TOKEN + "/", "").then((res: any) => {
        console.log(res, "标签数据初始化")
        console.log(res.detail.onetimetoken.token, "newToken")
    })
    // await requestData.then((res: any) => {
    //     console.log(res, "标签数据初始化")
    //     console.log(res.detail.onetimetoken.token, "newToken")
    // })
}

//处理错误code
function resHandel(res: any, resolve: any) {
    console.log(res, "beforeHandel")
    if (res.data.code !== 100) {
        //status 200 内部 不是 100 报警
        // responseCode(res)
    } else {
        reLoadOneTimeToken(res)
        resolve(res.data.detail)
    }
}

//刷新oneTimeToken
function reLoadOneTimeToken(res: any) {
    let newToken = res.headers["x-onetimetoken"]
    if (newToken !== undefined && newToken !== null && newToken !== "") {
        window.localStorage.setItem("x-OnetimeToken", newToken)
        //加入token有效期
        var timestamp = new Date().getTime() + 15 * 60 * 1000
        console.log(timestamp) //打印当前时间戳
        console.log(timestamp + 15 * 60 * 1000) //当前时间戳（毫秒） - 1天毫秒数 = 前一天时间戳
        window.localStorage.setItem("x-OnetimeToken-ValidityTime", JSON.stringify(timestamp))
    }
}

function xGet() {
    let validityTime = window.localStorage.getItem("x-OnetimeToken-ValidityTime")
    var nowTimestamp = new Date().getTime()
    if (validityTime != null && validityTime != "" && validityTime != undefined) {
        if (parseInt(validityTime) < nowTimestamp) {
            window.localStorage.clear()
            window.location.href = "/"
            return false
        }
    }

    axios.defaults.headers = {
        ["x-AccessToken"]: window.localStorage.getItem("x-AccessToken"),
        ["x-OnetimeToken"]: window.localStorage.getItem("x-OnetimeToken"),
        ["x-Userid"]: window.localStorage.getItem("x-Userid"),
    }

    return true
}

//loading key
const key = "updatable"
function loadingStart() {
    message.loading({ content: "加载中...", key })
}

function loadingEnd() {
    message.success({ content: "加载成功!", key, duration: 2 })
}

function urlHandle(url: string, status: string) {
    Urls.LOADING_API.forEach((item: any) => {
        if (url == item) {
            status === "start" ? loadingStart() : loadingEnd()
        }
    })
    return false
}

/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
const get = function (url: string, params: any) {
    let dealParams = JSON.parse(JSON.stringify(params))
    Object.keys(dealParams).forEach((key) => {
        if (dealParams[key] === "") {
            console.log(key, "params[key]")
            delete dealParams[key]
        }
    })
    //获取header
    let flag = xGet()

    if (!flag) {
        return new Promise((resolve, reject) => {})
    }
    //是否loading
    urlHandle(url, "start")
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: dealParams,
            })
            .then((res: any) => {
                //是否loading
                urlHandle(url, "end")
                resHandel(res, resolve)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
const post = function (url: string, params: any) {
    //获取header
    let flag = xGet()

    if (!flag) {
        return new Promise((resolve, reject) => {})
    }
    //是否loading
    urlHandle(url, "start")
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then((res: any) => {
                //是否loading
                urlHandle(url, "end")
                resHandel(res, resolve)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const put = (url: string, params: any) => {
    //获取header
    let flag = xGet()

    if (!flag) {
        return new Promise((resolve, reject) => {})
    }
    //是否loading
    urlHandle(url, "start")
    return new Promise((resolve, reject) => {
        axios
            .put(url, params)
            .then((res: any) => {
                //是否loading
                urlHandle(url, "end")
                resHandel(res, resolve)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}
const deleteMethod = (url: string, params: any) => {
    //获取header
    let flag = xGet()

    if (!flag) {
        return new Promise((resolve, reject) => {})
    }
    //是否loading
    urlHandle(url, "start")
    return new Promise((resolve, reject) => {
        axios
            .delete(url, {
                params: params,
            })
            .then((res: any) => {
                //是否loading
                urlHandle(url, "end")
                resHandel(res, resolve)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}
export default {
    get,
    post,
    put,
    deleteMethod,
}
