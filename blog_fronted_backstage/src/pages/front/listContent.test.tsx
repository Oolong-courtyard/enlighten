import React from "react"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import ListContent from "./listContent"
import mockAxios from "../../__mocks__/axios"
import * as TestData from "../../tests/mockData/testListContentData"

import "../../plugin/matchData/matchData.mock"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

describe("<listContent/>", () => {
    const anyBackupProps = {
        propData: {
            history: { push: jest.fn(), goBack: jest.fn() },
            location: { data: { type: "AnyBackup" }, search: "" },
            match: {
                isExact: true,
                params: { search_type: "AnyBackup" },
                path: "",
                url: "",
            },
        },
        tabData: "application",
    }
    const anyShareProps = {
        propData: {
            history: { push: jest.fn(), goBack: jest.fn() },
            location: { data: { type: "AnyShare" } },
            match: {
                isExact: true,
                params: { search_type: "AnyShare" },
                path: "",
                url: "",
            },
        },
        tabData: "application",
    }
    const anyRobotProps = {
        propData: {
            history: { push: jest.fn(), goBack: jest.fn() },
            location: { data: {} },
            match: {
                isExact: true,
                params: { search_type: "AnyRobot" },
                path: "",
                url: "",
            },
        },
        tabData: "application",
    }
    let container: any
    describe("搜索页tab组件快照", () => {
        it("组件快照 anyBackupProps", () => {
            container = shallow(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>
            )
            expect(container.html()).toMatchSnapshot()
        })
        it("组件快照 anyShareProps", () => {
            container = shallow(
                <BrowserRouter>
                    <ListContent {...anyShareProps} />
                </BrowserRouter>
            )
            expect(container.html()).toMatchSnapshot()
        })
        it("组件快照 anyRobotProps", () => {
            container = shallow(
                <BrowserRouter>
                    <ListContent {...anyRobotProps} />
                </BrowserRouter>
            )
            expect(container.html()).toMatchSnapshot()
        })
    })
    describe("页面初始化 ", () => {
        let mountEle: any
        let targetEle: any
        it("用户一览检索 -AnyBackup groupLen0", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_TERMS_LEN0,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>
            )
            // 页面未更新前,标签数组长度为0
            targetEle = await mountEle.find(".type-content")
            await expect(targetEle.length).toBe(1)
            // 页面未更新前,应用内容为空
            targetEle = await mountEle.find(".app-card")
            await expect(targetEle.length).toBeFalsy()
            // 页面更新
            await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>,
                mountEle
            )
            // await mountEle.update()
            targetEle = await mountEle.find(".type-content")
            expect(targetEle.length).toBe(1)
            // // 获取当前页面的内容长度
            targetEle = await mountEle.find(".app-card")
            let html = await mountEle.find(".right-content").at(0).html()
            await expect(html).toBeTruthy()
        })
        it("用户一览检索 -AnyBackup groupLen2", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_TERMS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>
            )
            // 页面未更新前,标签数组长度为0
            targetEle = await mountEle.find(".type-content")
            expect(targetEle.length).toBe(1)
            // 页面未更新前,应用内容为空
            targetEle = await mountEle.find(".app-card")
            expect(targetEle.length).toBeFalsy()
            // 页面更新
            await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            targetEle = await mountEle.find(".type-content")
            expect(targetEle.length).toBe(3)
            // // 获取当前页面的内容长度
            targetEle = await mountEle.find(".app-card")
            expect(targetEle.length).toBe(0)
            // 获取到标签组的数据后,点击标签(后查询数据,先mock数据)

            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await mountEle.find(".type-content").at(0).parents().at(0)

            // 当前标签点击
            await targetEle.props().onClick()
            // 页面更新
            await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            targetEle = await mountEle.find(".app-card")
            expect(targetEle.length).toBe(2)
        })
    })
    describe("页面搜索框", () => {
        let mountEle: any
        let targetEle: any
        let eventEle: any
        //
        it("页面搜索框输入搜索", async () => {
            mountEle = await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>
            )
            targetEle = await mountEle.find(".search-input").at(0)
            eventEle = { target: { name: "search-input", value: "test input" } }
            await targetEle.props().onChange(eventEle)
            await mountEle.update()
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await targetEle.props().onSearch()
            await mountEle.update()
            // // 获取当前页面的内容长度
            targetEle = await mountEle.find(".app-card")
            expect(targetEle.length).toBe(0)
        })
    })
    describe("页面分页点击", () => {
        let mountEle: any
        let targetEle: any
        //
        it("页面分页点击", async () => {
            mountEle = await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>
            )
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle.update()
            targetEle = await mountEle.find("#paginationTest").at(0)
            await targetEle.props().onClick(1, 10)
            // 页面更新
            await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            // // 获取当前页面的内容长度
            targetEle = await mountEle.find(".app-card")
            expect(targetEle.length).toBe(2)
        })
        it("页面当页显示数目选择", async () => {
            mountEle = await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>
            )
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await mountEle.find("#paginationTest").at(0)
            await targetEle.props().onMouseOver(1, 10)
            // 页面更新
            await mount(
                <BrowserRouter>
                    <ListContent {...anyBackupProps} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            // // 获取当前页面的内容长度
            targetEle = await mountEle.find(".app-card")
            expect(targetEle.length).toBe(2)
        })
    })
    describe("错误情况", () => {
        let mountEle: any
        let mountEle1: any
        let targetEle: any
        it("用户一览检索 -AnyBackup groupLen0", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_TERMS_LEN0,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_LIST_CONTENT_ANYBACKUP_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <ListContent {...anyShareProps} />
                </BrowserRouter>
            )
            mountEle1 = await mount(
                <BrowserRouter>
                    <ListContent {...anyRobotProps} />
                </BrowserRouter>
            )
        })
    })
})
