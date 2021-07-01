import React, { useState } from "react"
import { Form, Input, Button, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import "./style.less"
//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"

const Login = (props: any) => {
    const onFinish = (values: any) => {
        handleSubmit()
    }
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })
    const onChange = (event: any) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
    }
    const handleSubmit = async () => {
        const postData = {
            username: userInfo.username,
            password: userInfo.password,
        }
        const resolveData = request.post(Urls.ADMIN_LOGIN_DEV, postData)
        await resolveData.then((res: any) => {
            let onetime_token = res.onetime_token,
                user_id_short = res.user_id_short,
                access_token = res.access_token
            window.localStorage.setItem("x-OnetimeToken", onetime_token)
            window.localStorage.setItem("x-Userid", user_id_short)
            window.localStorage.setItem("x-AccessToken", access_token)
            window.localStorage.setItem("userType", "3")
            message.success("登陆成功!")
            window.location.href = window.location.origin + "/manager/admin"
        })
    }

    return (
        <div>
            <div className="logo" />
            <Form name="normal_login" id="formBtn" className="login-form" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户名",
                        },
                    ]}>
                    <Input
                        id="username"
                        name="username"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="用户名"
                        defaultValue={userInfo.username}
                        onChange={(e) => {
                            onChange(e)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码",
                        },
                    ]}>
                    <Input
                        id="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        name="password"
                        type="password"
                        placeholder="密码"
                        defaultValue={userInfo.password}
                        onChange={(e) => {
                            onChange(e)
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button id="btn" type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
