import React from "react"
import HomePage from "./homePage"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import Adapter from "enzyme-adapter-react-16"
import Until from "../../until/until"

Enzyme.configure({ adapter: new Adapter() })
const props = { history: { push: jest.fn() }, location: { search: "" } }
const props1 = { history: { push: jest.fn() }, location: { href: "http://localhost:3000/?userid=testUserId&access_token=testAccessToken&onetime_token=testOneTimeToken", search: "?userid=testUserId&access_token=testAccessToken&onetime_token=testOneTimeToken" } }
describe("官网首页 页面快照", () => {
    const container = shallow(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    )
    it("官网首页页面快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
})
