import React from "react"
import UserLayout from "./userLayout"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })
describe("路由导航组件", () => {
    const container = shallow(<UserLayout />)
    it("路由导航组件快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
})
