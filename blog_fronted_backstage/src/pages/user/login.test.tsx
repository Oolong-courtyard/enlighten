import React from "react"
import Enzyme, { shallow, mount, render } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Login from "./login"
import "../../plugin/matchData/matchData.mock"
import mockAxios from "../../__mocks__/axios"
Enzyme.configure({ adapter: new Adapter() })

describe("admin登陆", () => {
    let container: any
    const props = { history: { push: jest.fn() } }
    beforeEach(() => {
        container = shallow(<Login {...props} />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
    describe("输入用户名密码", () => {
        let targetEle
        let event
        it("input username", () => {
            targetEle = container.find("#username")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onChange(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "用户名", name: "username" } }
            targetEle.props().onChange(event)
            targetEle = container.find("#username")
            expect(targetEle.props().defaultValue).toBe("用户名")
        })
        it("input password", () => {
            targetEle = container.find("#password")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onChange(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "密码", name: "password" } }
            targetEle.simulate("change", event)
            targetEle = container.find("#password")
            expect(targetEle.props().defaultValue).toBe("密码")
        })
    })
    describe("mock登陆API", () => {
        let mountEle: any
        let targetEle: any
        it("login ", async () => {
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        code: 100,
                        message: "success",
                        detail: {
                            access_token_id: "37ac2efe-71ad-472a-aa65-e24c942e55d0",
                            generate_date: 1594189785,
                            refresh_token: "",
                            access_token: "c35fbb44bd0290369efd63ada695a349587af985",
                            x_access_token: "X_c35fbb44bd0290369efd63ada695a349587af985",
                            expires_in: 1594193385,
                            user_id_short: "22",
                            user_id: "11",
                            onetime_token: "29647949ad3c9c1ad28899d718dddefc12fa78fb",
                        },
                    },
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<Login {...props} />)
            await mountEle.update()
            await console.log("formBtn", mountEle.find("#formBtn").at(0).props())
            targetEle = await mountEle.find("#formBtn").at(0).props().onFinish()
            mountEle = mount(<Login {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#btn").at(0).simulate("click")
            // await expect(props.history.push).toBeCalled()
        })
    })
})
