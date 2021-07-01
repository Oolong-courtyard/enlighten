import React from "react"
import { BrowserRouter } from "react-router-dom"
import BaseLayout from "./BaseLayout"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })
const props = {
    history: { push: jest.fn(), goBack: jest.fn() },
    location: { hash: "", key: "", pathname: "/manager", search: "", state: undefined },
    match: { isExact: true, params: {} },
}
describe("基础导航组件", () => {
    const container = shallow(
        <BrowserRouter>
            <BaseLayout />
        </BrowserRouter>
    )
    it("基础导航组件快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
})

describe("基础导航组件初始化", () => {
    let mountEle: any
    let targetEle: any
    it("页面初始化 权限userType为2", () => {
        targetEle = 2
        window.localStorage.setItem("userType", targetEle)
        mountEle = mount(
            <BrowserRouter>
                <BaseLayout />
            </BrowserRouter>
        )
        expect(mountEle.html()).toMatchSnapshot()
        window.localStorage.removeItem("userType")
    })
    it("页面初始化 权限userType为2", () => {
        targetEle = 3
        window.localStorage.setItem("userType", targetEle)
        mountEle = mount(
            <BrowserRouter>
                <BaseLayout />
            </BrowserRouter>
        )
        expect(mountEle.html()).toMatchSnapshot()
        window.localStorage.removeItem("userType")
    })
    it("页面初始化 权限userType为2", () => {
        targetEle = 3
        window.localStorage.setItem("userType", targetEle)
        let newLocation = "/manager"
        console.log(newLocation, "newLocation")
        delete window.location
        Object.defineProperty(window, "location", {
            value: {
                pathname: newLocation,
                hash: "",
                state: "",
            },
        })

        mountEle = mount(
            <BrowserRouter>
                <BaseLayout />
            </BrowserRouter>
        )
        expect(mountEle.html()).toMatchSnapshot()
    })
})
