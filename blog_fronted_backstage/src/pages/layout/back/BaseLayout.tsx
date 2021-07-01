import React, { useState, useEffect } from "react"
import { Layout, Menu, ConfigProvider } from "antd"
import { UserOutlined, UnorderedListOutlined, DeleteOutlined, TagsOutlined, FolderOpenOutlined, EditOutlined, SwitcherOutlined } from "@ant-design/icons"
import { NavLink, withRouter } from "react-router-dom"
import ChangeAdmin from "./change"
import Until from "../../../until/until"
import "./BaseLayout.less"

const { Header, Sider, Content } = Layout

function BaseLayout(props: any) {
    let [baseParameter, setBaseParameter] = useState<any>({
        selectedKeys: "",
        userType: 0,
        sliderStyle: {
            overflow: "hidden",
        },
    })

    useEffect(() => {
        let userid = Until.getQueryString(props, "userid")
        let access_token = Until.getQueryString(props, "access_token")
        let onetime_token = Until.getQueryString(props, "onetime_token")
        if (userid !== undefined && access_token !== undefined && onetime_token !== undefined && userid !== null && access_token !== null && onetime_token !== null) {
            window.localStorage.setItem("x-AccessToken", access_token)
            window.localStorage.setItem("x-OnetimeToken", onetime_token)
            window.localStorage.setItem("x-Userid", userid)
        }
        baseParameter.userType = window.localStorage.getItem("userType")
        setBaseParameter({ ...baseParameter })
    }, [])

    useEffect(() => {
        handleSelectedKeys(props.location.pathname)
    }, [props])

    // 修改地址栏手动输入地址与菜单激活不一致方法
    function handleSelectedKeys(pathname: any) {
        let selectKey = pathname
        console.log(selectKey, "selectKey")
        if (selectKey === "/manager" || selectKey === "/manager/") {
            selectKey = "/manager/appListManage"
        }
        baseParameter.selectedKeys = selectKey
        console.log("baseParameter.selectedKeys", baseParameter.selectedKeys)
        setBaseParameter({ ...baseParameter })
    }

    return (
        <ConfigProvider>
            {baseParameter.userType == 2 ? (
                <Layout>
                    <Sider style={baseParameter.sliderStyle} breakpoint="xs" collapsedWidth="0" width={200} className="site-layout-background">
                        <NavLink to="/">
                            <div className="logo" />
                        </NavLink>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[baseParameter.selectedKeys]} key={baseParameter.selectedKeys} style={{ borderRight: 0 }}>
                            <Menu.Item key="/manager/appListManage">
                                <NavLink to="/manager/appListManage">
                                    <UnorderedListOutlined />
                                    应用列表
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/manager/offlineListManage">
                                <NavLink to="/manager/offlineListManage">
                                    <SwitcherOutlined />
                                    已下架应用
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/manager/draftListManage">
                                <NavLink to="/manager/draftListManage">
                                    <DeleteOutlined />
                                    草稿箱
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/manager/tagManage">
                                <NavLink to="/manager/tagManage">
                                    <TagsOutlined />
                                    标签管理
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/manager/classManage">
                                <NavLink to="/manager/classManage">
                                    <FolderOpenOutlined />
                                    分类管理
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ minHeight: "100vh" }}>
                        <Header className="site-layout-background" style={{ padding: 0 }}></Header>

                        <Content
                            className="site-layout-background"
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                minHeight: 280,
                                overflow: "initial",
                            }}>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            ) : (
                ""
            )}
            {baseParameter.userType == 3 ? (
                <Layout>
                    <Sider style={baseParameter.sliderStyle} breakpoint="xs" collapsedWidth="0" width={200} className="site-layout-background">
                        <NavLink to="/">
                            <div className="logo" />
                        </NavLink>
                        <Menu theme={baseParameter.theme} mode="inline" defaultSelectedKeys={[baseParameter.selectedKeys]} style={{ borderRight: 0 }}>
                            <Menu.Item key="/manager/admin">
                                <NavLink to="/manager/admin">
                                    <UserOutlined />
                                    用户管理
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ minHeight: "100vh" }}>
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            <ChangeAdmin />
                        </Header>

                        <Content
                            className="site-layout-background"
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                minHeight: 280,
                                overflow: "initial",
                            }}>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            ) : (
                ""
            )}
        </ConfigProvider>
    )
}

export default withRouter(BaseLayout)
