import React from "react"
import { BrowserRouter } from "react-router-dom"
import FrontLayout from "./FrontLayout"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

describe("front layout", () => {
    const container = shallow(
        <BrowserRouter>
            <FrontLayout />
        </BrowserRouter>
    )
    it("组件页面快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
})
