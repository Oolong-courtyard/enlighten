import React from "react"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import SearchList from "./searchList"
import mockAxios from "../../__mocks__/axios"
import * as TestData from "../../tests/mockData/testListContentData"

import "../../plugin/matchData/matchData.mock"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

describe("<SearchList/>", () => {
    const propsAnyBackup = {
        history: { length: 13, action: "POP", location: { hash: "", key: "onx5id", pathname: "/searchList/AnyBackup", search: "", state: undefined }, createHref: jest.fn, push: jest.fn },
        location: { pathname: "/searchList/AnyBackup", search: "", hash: "", state: undefined, key: "onx5id" },
        match: { path: "/searchList/:search_type", url: "/searchList/AnyBackup", isExact: true, params: { search_type: "AnyBackup" } },
    }
    const propsAnyShare = {
        history: { length: 13, action: "POP", location: { hash: "", key: "onx5id", pathname: "/searchList/AnyShare", search: "", state: undefined }, createHref: jest.fn, push: jest.fn },
        location: { pathname: "/searchList/AnyShare", search: "", hash: "", state: undefined, key: "onx5id", data: { type: "AnyShare" } },
        match: { path: "/searchList/:search_type", url: "/searchList/AnyShare", isExact: true, params: { search_type: "AnyShare" } },
    }
    const propsAnyRobot = {
        history: { length: 13, action: "POP", location: { hash: "", key: "onx5id", pathname: "/searchList/AnyRobot", search: "", state: undefined }, createHref: jest.fn, push: jest.fn },
        location: { pathname: "/searchList/AnyRobot", search: "", hash: "", state: undefined, key: "onx5id", data: { type: "AnyRobot" } },
        match: { path: "/searchList/:search_type", url: "/searchList/AnyRobot", isExact: true, params: { search_type: "AnyRobot" } },
    }
    const propsAnyError = {
        history: { length: 13, action: "POP", location: { hash: "", key: "onx5id", pathname: "/searchList/zzxzczczczc", search: "", state: undefined }, createHref: jest.fn, push: jest.fn },
        location: { pathname: "/searchList/AnyRobot", search: "", hash: "", state: undefined, key: "onx5id", data: { type: "zzxzczczczc" } },
        match: { path: "/searchList/:search_type", url: "/searchList/AnyRobot", isExact: true, params: { search_type: "zzxzczczczc" } },
    }
    let container = shallow(<SearchList {...propsAnyBackup} />)
    let tagrgetEle: any
    it("组件快照 AnyBackup", () => {
        expect(container.html()).toMatchSnapshot()
    })
    it("组件快照 AnyShare", () => {
        container = shallow(<SearchList {...propsAnyShare} />)
        expect(container.html()).toMatchSnapshot()
    })
    it("组件快照 AnyRobot", () => {
        container = shallow(<SearchList {...propsAnyRobot} />)
        expect(container.html()).toMatchSnapshot()
    })
    it("组件快照 Error", () => {
        container = shallow(<SearchList {...propsAnyError} />)
        expect(container.html()).toMatchSnapshot()
    })
    it("tab 点击", () => {
        tagrgetEle = container.find(".tab-block").at(0)
        tagrgetEle.props().onChange("solution")
        tagrgetEle = container.find("#table-key").at(0)
        expect(tagrgetEle.props().value).toBe("solution")
    })
})
