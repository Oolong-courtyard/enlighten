import { notification, message } from "antd"
import * as Urls from "./urls"
import request from "./baseApi"
//系统错误异常
const responseCodeMessage: any = {
    101: "参数丢失",
    102: "无效参数",
    103: "用户名或密码错误，请重新输入",
    104: "OBS access error",
    105: "AISHU HUB access error",
    107: "invalid client_id or client_secret",
    108: "Forbidden",
    109: "用户不存在或者更新对象不存在",
    110: "Data Already Modified",
    111: "应用已存在,请勿重复发布相同的应用",
    112: "Internal server error",
    113: "Data integration error",
    114: "OIDC CallBack error",
    115: "Incorrect email or password",
    150: "Your client permission denied",
    151: "Your ip add is not white list",
    159: "Invalid userId",
    65534: "Unhandled http exception",
    65535: "Unhandled system exception",
}
//不需要报错
const noResponse: any = {
    158: "Invalid userType",
}

//需要重新登录
const responseCodeLoginMessage: any = {
    106: "access_token is invalid",
    155: "Invalid accessToken",
    156: "Invalid accessToken structure",
    157: "AccessToken expired",
}
//需要重新获取Token
const responseCodeTokenMessage: any = {
    152: "Invalid onetimeToken",
    153: "Invalid onetimeToken structure",
    154: "OnetimeToken expired",
}

function codeHandel(res: any) {
    console.log(res, "qqqqqqqqqqqqqqqqq")
    //422为参数缺失
    if (res.status == 422) {
        notification.error({
            description: "请确认是否有参数未填写",
            message: "系统错误",
            placement: "bottomRight",
        })
        return false
    }

    //需要重新获取Token
    for (var i in responseCodeTokenMessage) {
        if (res.data.code == i) {
            // getOneTimeToken(res)

            // notification.warning({
            //     description: responseCodeMessage[i],
            //     message: "登录过期，请重新登录",
            //     placement: "bottomRight",
            // })
            setTimeout(() => {
                window.location.href = Urls.IP_CONFIG + Urls.USER_LOGIN + "?url_path=" + window.location.origin + window.location.pathname
            }, 2000)
            return responseCodeMessage[i]
        }
    }
    //需要重新登录
    for (var i in responseCodeLoginMessage) {
        if (res.data.code == i) {
            // notification.warning({
            //     description: responseCodeMessage[i],
            //     message: "登录过期，请重新登录",
            //     placement: "bottomRight",
            // })
            setTimeout(() => {
                window.location.href = Urls.IP_CONFIG + Urls.USER_LOGIN + "?url_path=" + window.location.origin + window.location.pathname
            }, 2000)
        }
    }
    //系统错误异常
    for (var i in responseCodeMessage) {
        if (res.data.code == i) {
            notification.error({
                description: responseCodeMessage[i],
                message: "系统错误",
                placement: "bottomRight",
            })
            return responseCodeMessage[i]
        }
    }
}

async function getOneTimeToken(res: any) {
    // res.config.url
    // res.config.params
    const requestData = request.get(Urls.TOKEN + "/", "")
    await requestData.then((res: any) => {
        console.log(res, "标签数据初始化")
        console.log(res.detail.onetimetoken.token, "newToken")
    })
}

export default codeHandel
