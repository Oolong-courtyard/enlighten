import React from "react"
import Enzyme, { shallow, mount, render } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import ChangeAdmin from "./change"
import "../../../plugin/matchData/matchData.mock"
import mockAxios from "../../../__mocks__/axios"
Enzyme.configure({ adapter: new Adapter() })

describe("修改密码及退出登录按钮测试", () => {
    let container: any
    const props = { history: { push: jest.fn() } }
    beforeEach(() => {
        container = shallow(<ChangeAdmin {...props} />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("页面快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
    describe("页码functions", () => {
        let targetEle: any
        let event: any
        // modal新密码输入
        it("新密码输入", () => {
            targetEle = container.find("#form-password-input")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().value).toBeFalsy()
            event = { target: { value: "pwd", name: "newpassword" } }
            targetEle.props().onBlur(event)
            targetEle = container.find("#form-password-input")
            expect(targetEle.props().value).toBe("pwd")
        })
        //  确认新密码输入
        it("确认新密码输入", () => {
            targetEle = container.find("#form-password-input1")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().value).toBeFalsy()
            event = { target: { value: "pwd1", name: "newpassword2" } }
            targetEle.props().onBlur(event)
            targetEle = container.find("#form-password-input1")
            expect(targetEle.props().value).toBe("pwd1")
        })
        it("更新密码", async () => {
            // console.log(container.find(".update-button").length)
            targetEle = container.find(".update-button").simulate("click")
            shallow(<ChangeAdmin />, container)
            // 更改密码点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            //修改密码弹窗取消按钮点击
            targetEle = await container.find(".modal").at(0).props().onCancel()
            await shallow(<ChangeAdmin />, container)
            await container.update()
            expect(container.find(".modal").at(0).props().visible).toBeFalsy()
            //修改密码弹窗确认按钮点击
            //修改密码接口mock
            await mockAxios.put.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        code: 100,
                        message: "success",
                        detail: { desc: "新增组别成功回调" },
                    },
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find(".modal").at(0).props().onOk()
            // console.log("targetCancel", container.find(".modal").at(0).props())
            await shallow(<ChangeAdmin />, container)
            await container.update()
            expect(container.find(".modal").at(0).props().visible).toBeFalsy()
            //修改密码弹窗onFinish
            targetEle = await container.find("#pwd-input").at(0).props().onFinish()
            console.log("pwd-input", container.find("#pwd-input").at(0).props())
            await shallow(<ChangeAdmin />, container)
            await container.update()
            expect(container.find("#pwd-input").at(0).props().visible).toBeFalsy()
        })
    })
    it("用户登出按钮点击", async () => {
        let targetEle: any
        await mockAxios.delete.mockImplementationOnce(() => {
            return Promise.resolve({
                data: {
                    code: 100,
                    message: "success",
                    detail: { desc: "成功回调" },
                },
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        targetEle = await container.find(".logoutBtn").at(0)
        // 点击登出按钮
        await targetEle.simulate("click")
        let url = window.location.href + "/login"
        //在给location重定义之前删除原有属性
        delete window.location
        Object.defineProperty(window, "location", {
            value: {
                href: url,
                hash: "",
            },
        })
        const nowLocation = await window.location.href
        await console.log("nowLocation", nowLocation)
        await expect(nowLocation.indexOf("login") > -1).toBeTruthy()
    })
    it("输入密码确认,提交表单", async () => {
        let targetEle: any
        let event: any
        let mockfn = jest.fn()
        // 两次密码输入一致
        targetEle = container.find("#form-password-input")
        event = { target: { value: "pwd", name: "newpassword" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#form-password-input1")
        event = { target: { value: "pwd", name: "newpassword2" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#from-group-change")
        // 两次密码一致
        targetEle.props().rules[1].validator("pwd", "pwd", mockfn)
        expect(mockfn).toBeCalledTimes(1)
        targetEle = container.find("#from-group-change1")
        // 两次密码一致
        targetEle.props().rules[1].validator("pwd", "pwd", mockfn)
        expect(mockfn).toBeCalledTimes(2)
        // 两次密码输入不一致
        targetEle = container.find("#form-password-input")
        event = { target: { value: "pwd1", name: "newpassword" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#form-password-input1")
        event = { target: { value: "pwd", name: "newpassword2" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#from-group-change")
        // 两次密码一致
        targetEle.props().rules[1].validator("pwd", "pwd1", mockfn)
        expect(mockfn).toBeCalledTimes(3)
        targetEle = container.find("#from-group-change1")
        // 两次密码输入不一致
        targetEle.props().rules[1].validator("pwd", "pwd", mockfn)
        expect(mockfn).toBeCalledTimes(4)

        // console.log(targetEle.props().rules[1].validator("pwd", "pwd", mockfn), "targetEletargetEle")
    })
})
