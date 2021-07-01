import React from "react"
import Footer from "./footer"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })
describe("底部导航组件", () => {
    const container = shallow(<Footer />)
    it("底部导航组件快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
})
