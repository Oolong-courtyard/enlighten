import * as React from "react"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import OfflineListManage from "./offlineListManage"
import mockAxios from "../../__mocks__/axios"
import * as TestData from "../../tests/mockData/testOfflineListManageData"

import "../../plugin/matchData/matchData.mock"
import Adapter from "enzyme-adapter-react-16"
import { findAllByAltText } from "@testing-library/react"
Enzyme.configure({ adapter: new Adapter() })

import moment from "moment"

describe("<FileList/>", () => {
    let container: any
    let mountContainer: any
    let props = { history: { push: jest.fn() }, location: { pathname: "/manager/appListManage" } }
    beforeEach(() => {
        container = shallow(<OfflineListManage {...props} />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    describe("已下架应用列表 页面快照", () => {
        // 页面快照
        it("应用列表页面快照", () => {
            expect(container.html()).toMatchSnapshot()
        })
    })
    describe("应用列表 functions", () => {
        let targetEle
        let event
        let tagetBind
        // 软件名称输入
        it("软件名称输入", () => {
            targetEle = container.find("#input-id-content")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "软件1", name: "content_name" } }
            targetEle.simulate("blur", event)
            targetEle = container.find("#input-id-content")
            expect(targetEle.props().defaultValue).toBe("软件1")
        })
        // 作者名称输入
        it("作者名称输入", () => {
            targetEle = container.find("#input-id-publisher")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "作者1", name: "publisher" } }
            targetEle.props().onBlur(event)
            targetEle = container.find("#input-id-publisher")
            expect(targetEle.props().defaultValue).toBe("作者1")
        })
        // 产品分类选择
        it("产品分类选择", () => {
            targetEle = container.find("#select-id-product")
            event = ""
            // 内容为空时
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-product")
            expect(targetEle.props().value).toBeFalsy()

            event = "any_share_cloud"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-product")
            expect(targetEle.props().value).toBe("any_share_cloud")

            event = "any_backup_cloud"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-product")
            expect(targetEle.props().value).toBe("any_backup_cloud")

            event = "any_robot_cloud"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-product")
            expect(targetEle.props().value).toBe("any_robot_cloud")
        })
        // 内容分类选择
        it("内容分类选择", () => {
            targetEle = container.find("#select-id-content")
            event = ""
            // 内容为空时
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-content")
            expect(targetEle.props().value).toBeFalsy()

            event = "application"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-content")
            expect(targetEle.props().value).toBe("application")

            event = "service"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-content")
            expect(targetEle.props().value).toBe("service")

            event = "solution"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-content")
            expect(targetEle.props().value).toBe("solution")
        })
        // 下架时间选择
        it("下架时间选择", () => {
            targetEle = container.find(".range-picker").at(0)
            // 内容为空
            event = ["", ""]
            targetEle.props().onChange("date", event)
            tagetBind = container.find("#range-picker-start")
            expect(tagetBind.props().value).toBeFalsy()
            tagetBind = container.find("#range-picker-to")
            expect(tagetBind.props().value).toBeFalsy()
            // 内容选择
            event = ["20200712", "20200713"]
            targetEle.props().onChange("date", event)
            tagetBind = container.find("#range-picker-start")
            expect(tagetBind.props().value).toBe("20200712 00:00:00")
            tagetBind = container.find("#range-picker-to")
            expect(tagetBind.props().value).toBe("20200713 23:59:59")
            let dateReturn = targetEle.props().disabledDate(moment("20200712"))
            expect(dateReturn).toBeFalsy()
            dateReturn = targetEle.props().disabledDate(moment("30200712"))
            expect(dateReturn).toBeTruthy()
        })
    })
    describe("应用列表 初始化 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        it("初始化 获取应用列表list 数据列表参数不存在", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_NO_CONTENTS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<OfflineListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取应用列表list 数据列表为空", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN0,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<OfflineListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取应用列表list 成功", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<OfflineListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(2)
        })
        it("初始化 获取应用列表list 成功-cancel_date为null ", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_HAS_CONTENTS_CANCEL_DATE_NULL,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await mount(<OfflineListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
    describe("应用列表查询 api-mock请求数据", () => {
        let targetEle
        it("应用列表查询按钮点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find(".file-search-button").at(0)
            await targetEle.props().onClick()
            await shallow(<OfflineListManage />, container)
            await expect(container.find("#table").props().dataSource.length).toBe(2)
        })
    })
    describe("应用列表删除应用 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        let testLocalStorage: any

        it("应用列表 删除应用 SUCCESS", async () => {
            props.location.pathname = "/manager/appListManage"
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<OfflineListManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            // 删除回调mock数据
            await mockAxios.delete.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLICATION_DELETE_DATA_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 删除按钮点击回调成功后，重新取得应用列表list
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 找到删除按钮
            targetEle = await mountEle.find(".delele").at(0).props()
            testLocalStorage = { user_id_short: "123" }
            await window.localStorage.setItem("userData", JSON.stringify(testLocalStorage))
            // 删除按钮点击
            await targetEle.onConfirm()
            // 更新页面
            await mountEle.update()
            // 找到更新后的页面的table列表的list
            targetEle = await mountEle.find("#table").at(0).props()
            // 删除一条数据后，重新更新的页面列表有一条数据
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
    describe("应用列表上架应用 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        let testLocalStorage: any

        it("应用列表 上架应用 SUCCESS", async () => {
            props.location.pathname = "/manager/appListManage"
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<OfflineListManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            // 上架应用回调mock数据
            await mockAxios.put.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLICATION_UPDATE_DATA_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 上架应用按钮点击回调成功后，重新取得应用列表list
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 找到上架应用按钮
            targetEle = await mountEle.find(".update").at(0).props()
            // 删除按钮点击
            await targetEle.onConfirm()
            // 更新页面
            await mountEle.update()
            // 找到更新后的页面的table列表的list
            targetEle = await mountEle.find("#table").at(0).props()
            // 上架应用数据后，重新更新的页面列表有一条数据
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
    describe("应用列表 数据list操作", () => {
        let mountEle: any
        let targetEle: any
        let clickEle: any

        it("数据list操作 页码点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<OfflineListManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onChange(1, 10)
            await mount(<OfflineListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
        it("数据list操作 当页显示数目选择", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN200,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<OfflineListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<OfflineListManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(200)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLIST_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onShowSizeChange(1, 20)
            await mount(<OfflineListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
})
