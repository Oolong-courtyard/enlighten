import React, { useState, useEffect } from "react"
import { Button, Dropdown, notification } from "antd"
import { SmileOutlined } from "@ant-design/icons"
import { withRouter } from "react-router-dom"
//axios共通
import * as Urls from "../../../../api/urls"
import request from "../../../../api/baseApi"
import Until from "../../../../until/until"

const { NavLink } = require("react-router-dom")
interface UserInfo {
    user_id_short: string | null
    nickname: string | null
    email: string | null
    phone: string | null
    user_type: string | null
}
export default withRouter(function Header(props: any) {
    let [userInfo, setUserInfo] = useState({ user_id_short: "", nickname: "", email: "", phone: "", user_type: "" })
    const [loginStatus, setLoginStatus] = useState(false)
    const [userType, setUserType] = useState(1)
    const linkData = {
        AnyBackup: {
            pathname: "/searchList/AnyBackup",
            data: { type: "AnyBackup" },
        },
        AnyShare: {
            pathname: "/searchList/AnyShare",
            data: { type: "AnyShare" },
        },
        AnyRobot: {
            pathname: "/searchList/AnyRobot",
            data: { type: "AnyRobot" },
        },
    }

    const login = () => {
        let dataJson = {
            scope: "1",
            state: "aaaaaaaa",
        }
        console.log(Urls.IP_CONFIG + Urls.USER_LOGIN, "ssssss")
        // window.location.href = Urls.IP_CONFIG + Urls.USER_LOGIN + "?scope=1&state=aaaaaaaa"
        window.location.href = Urls.IP_CONFIG + Urls.USER_LOGIN + "?url_path=" + Urls.IP_BASE
    }
    // 用户情报检索
    const getUserInfo = async () => {
        // 用户情报检索
        let getUserInfoStr = {
            user_id: "",
        }
        let locationHref = window.location.href.split("?")
        if (locationHref.length > 1) {
            // 如果当前是登录回调页面
            let locationCode = locationHref[1].split("&")
            console.log(locationCode, "locationCode")

            locationCode.map((item, index) => {
                if (item.indexOf("user_id") > -1) {
                    getUserInfoStr.user_id = locationCode[index].split("user_id=")[1]
                }
                // if (item.indexOf("access_token") > -1) {
                //     getUserInfoStr.access_token = locationCode[index].split("access_token=")[1]
                // }
            })
            console.log(getUserInfoStr, "获取索引的请求头")
            // window.localStorage.setItem("access_token", getUserInfoStr.access_token)
            const requestData = request.get(Urls.USER_INFO, getUserInfoStr)
            await requestData.then((res) => {
                getUserInfoCallback(res)
            })
        } else {
            setLoginStatus(false)
            // 如果本地存在用户id，用户已经登录过，尝试进行信息检索
            let userId = window.localStorage.getItem("x-Userid")
            if (userId != "undefined" && userId != null) {
                getUserInfoStr.user_id = userId
                console.log(getUserInfoStr, "获取本地的user_id")
                const requestData = request.get(Urls.USER_INFO, getUserInfoStr)
                await requestData.then((res) => {
                    getUserInfoCallback(res)
                })
            }

            console.log("这是初始化页面")
        }
    }
    // 获取用户情报检索回调
    const getUserInfoCallback = (res: any) => {
        let data = res
        setLoginStatus(true)
        if (data != null) {
            setUserInfo({ ...data })
            window.localStorage.setItem("userData", JSON.stringify(data))
            if (data.user_type == "manager") {
                window.localStorage.setItem("userType", "2")
                props.typeHandle("2")
                setUserType(2)
            } else if (data.user_type == "user") {
                window.localStorage.setItem("userType", "1")
                props.typeHandle("1")
                setUserType(1)
            }
            console.log(res, "这是用户情报检索回调")
        }
    }

    //用户退出登录
    const userLogout = async () => {
        console.log("用户登出按钮点击到了")
        const requestData = request.get(Urls.USER_LOGOUT, "")
        await requestData.then((res) => {
            console.log(res, "用户登出按钮点击回调")
            window.localStorage.clear()
            window.location.href = "/"
            // props.history.push("/")
        })
    }
    const menu = (
        <div className="drop-block">
            {userInfo.phone != "" ? <div className="drop-item">手机账号：{userInfo.phone}</div> : ""}
            {userInfo.email != "" ? <div className="drop-item btn-bottom">邮箱账号：{userInfo.email}</div> : ""}
            <div className="logout-btn" onClick={userLogout}>
                退出登录
            </div>
            {userType == 2 ? (
                <NavLink style={{ backgroundColor: "white", width: "73px", color: "#7c99ef" }} className="update-btn" to={"/manager/appListManage"}>
                    管理员页面
                </NavLink>
            ) : (
                ""
            )}
        </div>
    )
    useEffect(() => {
        let userid = Until.getQueryString(props, "userid")
        let access_token = Until.getQueryString(props, "access_token")
        let onetime_token = Until.getQueryString(props, "onetime_token")
        if (userid !== undefined && access_token !== undefined && onetime_token !== undefined && userid !== null && access_token !== null && onetime_token !== null) {
            window.localStorage.setItem("x-AccessToken", access_token)
            window.localStorage.setItem("x-OnetimeToken", onetime_token)
            window.localStorage.setItem("x-Userid", userid)
        }
        getUserInfo()
    }, [])
    return (
        <div className="page-header">
            <div className="header-box">
                <div className="right-block">
                    <div className="logo-block">
                        <img className="logo-img" src={require("@/assets/images/logo.png")} />
                    </div>
                    <div className="dividing-line"></div>
                    <NavLink className="check-point" to="/">
                        Exchange
                    </NavLink>
                </div>
                <div className="left-block">
                    {/* <NavLink className="check-point" to={linkData.AnyBackup}>
                        AnyBackup Exchange
                    </NavLink> */}
                    <div
                        className="check-point"
                        onClick={() => {
                            notification.open({
                                placement: "bottomRight",
                                message: "正在建设中，敬请期待",
                                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                            })
                        }}>
                        AnyBackup Exchange
                    </div>
                    <NavLink className="check-point" to={linkData.AnyShare}>
                        AnyShare Exchange
                    </NavLink>
                    {/* <NavLink className="check-point" to={linkData.AnyRobot}>
                        AnyRobot Exchange
                    </NavLink> */}
                    <div
                        className="check-point"
                        onClick={() => {
                            notification.open({
                                placement: "bottomRight",
                                message: "正在建设中，敬请期待",
                                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                            })
                        }}>
                        AnyRobot Exchange
                    </div>
                    {!loginStatus ? (
                        <div className="login">
                            <Button className="login-button log-btn" onClick={login}>
                                登录
                            </Button>
                        </div>
                    ) : (
                        <div className="userInfo">
                            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                                <Button className="login-button nickname" title={userInfo.nickname}>
                                    {userInfo.nickname}{" "}
                                </Button>
                            </Dropdown>
                        </div>
                    )}

                    {/* <Popconfirm title="Are you sure delete this task?">
                        <Button className="login-button">登录 </Button>
                    </Popconfirm> */}
                </div>
            </div>
        </div>
    )
})
