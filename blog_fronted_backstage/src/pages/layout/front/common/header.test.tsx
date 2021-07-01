import React from "react"
import { BrowserRouter } from "react-router-dom"
import Header from "./header"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import mockAxios from "../../../../__mocks__/axios"
Enzyme.configure({ adapter: new Adapter() })

describe("<Header/>", () => {
    let container: any
    let mountContainer: any
    const props = { history: { push: jest.fn() } }
    beforeEach(() => {
        container = shallow(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    describe("Header组件 页面快照", () => {
        // 页面快照
        it("Header组件 页面快照", () => {
            expect(container.html()).toMatchSnapshot()
        })
    })
    describe("顶部导航 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any

        it("导航初始化 -未登录", async () => {
            // 初始化页面
            mountEle = await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            // 用户处于未登录状态时，顶部显示登录按钮
            await expect(mountEle.find(".login").length).toBe(1)
            // 用户处于未登录状态时，用户信息卡片不显示
            await expect(mountEle.find(".userInfo").length).toBe(0)
        })
        it("导航初始化 -本地有usrid -已经登陆过 重新进入当前页面", async () => {
            const userInfo = { user_id_short: "123", nickname: "数数", email: "shushu@163.com", phone: "18226137228", user_type: "user" }
            window.localStorage.setItem("x-Userid", "4JKQKzw2eNqFthqLpnFNS9")
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        code: 100,
                        message: "success",
                        detail: userInfo,
                    },
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            // 用户处于登录状态时，顶部登录按钮隐藏
            await expect(mountEle.find(".login").length).toBe(0)
            // 用户处于登录状态时，用户信息卡片显示
            await expect(mountEle.find(".userInfo").length).toBe(1)
        })
        it("导航初始化 -已登录 获取用户情报检索信息SUCCESS", async () => {
            let testLocationHref = window.location.href + '?user_id="test3333"&access_token="eeeeeeeeeeeeee"&onetime_token="333333'
            delete window.location
            Object.defineProperty(window, "location", {
                value: {
                    href: testLocationHref,
                    hash: "",
                },
            })
            console.log(testLocationHref, "testLocationHref")
            const userInfo = { user_id_short: "123", nickname: "数数", email: "shushu@163.com", phone: "18226137228", user_type: "user" }
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        code: 100,
                        message: "success",
                        detail: userInfo,
                    },
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            // 用户处于登录状态时，顶部登录按钮隐藏
            await expect(mountEle.find(".login").length).toBe(0)
            // 用户处于登录状态时，用户信息卡片显示
            await expect(mountEle.find(".userInfo").length).toBe(1)
            await console.log(mountEle.find("Trigger"), "opopoopopo")
            // 卡片未触发下拉效果前,登出按钮处于隐藏状态
            await expect(mountEle.find(".logout-btn").length).toBe(0)
            // 触发卡片下拉效果展示
            await mountEle.find("Trigger").simulate("click")
            await mountEle.update()
            // 卡片下拉后,当前的登出按钮钮显示
            await expect(mountEle.find(".logout-btn").length).toBe(1)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        code: 100,
                        message: "success",
                        detail: {
                            desc: "用户登出按钮点击回调成功",
                        },
                    },
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            let nowLocalStorage = await window.localStorage.length
            // 登出按钮点击前,本地存在用户信息缓存
            await expect(nowLocalStorage).toBeTruthy()
            // 点击登出按钮
            targetEle = await mountEle.find(".logout-btn").at(0)
            await targetEle.props().onClick()
            await mountEle.update()
            // 等待登出回调成功后,本地缓存已清空
            nowLocalStorage = await window.localStorage.length
            await expect(nowLocalStorage).toBeFalsy()
        })

        it("导航初始化 -已登录 获取用户情报检索信息为null", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        code: 100,
                        message: "success",
                        detail: null,
                    },
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            // 用户处于登录状态时，顶部登录按钮隐藏
            await expect(mountEle.find(".login").length).toBe(1)
            // 用户处于登录状态时，用户信息为null，用户信息卡片不显示
            await expect(mountEle.find(".userInfo").length).toBe(0)
        })
        it("用户登录按钮点击", async () => {
            // const shallowContainer = shallow(<Header {...props} />)
            // 初始化页面
            let mountEle = await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            await mount(
                <BrowserRouter>
                    <Header {...props} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            mountEle.find(".login-button").at(0).simulate("click")
            const nowLocation = window.location.href
            expect(nowLocation.indexOf("url_path") > -1).toBeTruthy()
        })
    })
})
