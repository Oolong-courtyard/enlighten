import React from "react"
import {BrowserRouter} from "react-router-dom"
import Router from "./router"
import Enzyme from "enzyme"
import {shallow, mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()})

describe("<Header/>", () => {
    let container: any
    let mountContainer: any
    const props = {history: {push: jest.fn()}}
    beforeEach(() => {
        container = mount(<Router/>)
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
})
