import React, { useState } from "react"
import { Modal, Form, Input, message, Row, Col, Button } from "antd"
import { LogoutOutlined, EditOutlined } from "@ant-design/icons"
//axios共通
import * as Urls from "../../../api/urls"
import request from "../../../api/baseApi"

const ChangeAdmin = (props: any) => {
    //logout
    const logOut = async () => {
        const resolveData = request.deleteMethod(Urls.IP_CONFIG + "/admin/logout", {})
        await resolveData.then((res: any) => {
            window.localStorage.clear()
            window.location.href = window.location.origin + "/login"
        })
    }
    //确认密码是否一致
    const checkPsd = (rule: any, value: any, callback: any) => {
        let password2 = values.newpassword2
        if (password2 && value && password2 !== value) {
            callback(new Error("两次密码输入不一致"))
        } else {
            callback()
        }
    }

    const checkPsd2 = (rule: any, value: any, callback: any) => {
        let password = values.newpassword
        if (password && value && password !== value) {
            callback(new Error("两次密码输入不一致"))
        } else {
            callback()
        }
    }

    const changePwd = async () => {
        let params = {
            password_new: values.newpassword,
        }
        const resolveData = request.put(Urls.IP_CONFIG + "/admin/chgpasswd", params)
        await resolveData.then((res: any) => {
            message.success("密码修改成功!")
        })
    }
    let [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const showModal = () => {
        setVisible(true)
    }

    const handleOk = (e: any) => {
        form.submit()
    }

    const handleCancel = (e: any) => {
        setVisible(false)
        form.resetFields()
    }
    const onFinish = (values: any) => {
        changePwd()
        setVisible(false)
        form.resetFields()
    }
    const [values, setValues] = useState({
        newpassword: "",
        newpassword2: "",
    })
    const onChange = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <a style={{ float: "right", marginRight: "40px" }} onClick={showModal} className="update-button">
                <EditOutlined style={{ fontSize: "20", paddingRight: "10px" }} />
                更改密码
            </a>
            <a style={{ float: "right", marginRight: "40px" }} onClick={logOut} className="logoutBtn">
                <LogoutOutlined style={{ fontSize: "20", paddingRight: "10px" }} />
                退出登录
            </a>
            <Modal className="modal" title="更改密码" visible={visible} cancelText="取消" okText="确定" onOk={handleOk} onCancel={handleCancel} centered destroyOnClose={true} forceRender>
                <Form
                    id="pwd-input"
                    className="pwd-input"
                    form={form}
                    labelCol={{ span: 5 }}
                    onFinish={(e) => {
                        onFinish(e)
                    }}>
                    <Row justify="center">
                        <Col>
                            <Form.Item
                                id="from-group-change"
                                name="newpassword"
                                rules={[
                                    { required: true, message: "请输入新密码" },
                                    {
                                        validator: (rule, value, callback) => {
                                            checkPsd(rule, value, callback)
                                        },
                                    },
                                ]}>
                                <Input.Password
                                    id="form-password-input"
                                    className="from-password-input"
                                    placeholder="请输入新密码"
                                    name="newpassword"
                                    // defaultValue={values.newpassword}
                                    value={values.newpassword}
                                    onBlur={(e) => {
                                        onChange(e)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                id="from-group-change1"
                                className="from-group"
                                name="newpassword2"
                                rules={[
                                    { required: true, message: "确认新密码" },
                                    {
                                        validator: (rule, value, callback) => {
                                            checkPsd2(rule, value, callback)
                                        },
                                    },
                                ]}>
                                <Input.Password
                                    id="form-password-input1"
                                    className="from-password-input"
                                    placeholder="再次输入密码"
                                    name="newpassword2"
                                    // defaultValue={values.newpassword2}
                                    value={values.newpassword2}
                                    onBlur={(e) => {
                                        onChange(e)
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default ChangeAdmin
