import * as React from "react"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import DraftListManage from "./draftListManage"
import mockAxios from "../../__mocks__/axios"
import * as TestData from "../../tests/mockData/testDraftListData"

import "../../plugin/matchData/matchData.mock"
import Adapter from "enzyme-adapter-react-16"
import { findAllByAltText } from "@testing-library/react"
Enzyme.configure({ adapter: new Adapter() })

describe("<DraftListManage/>", () => {
    let container: any
    let mountContainer: any
    const props = { history: { push: jest.fn() } }
    beforeEach(() => {
        container = shallow(<DraftListManage {...props} />)
        mountContainer = mount(<DraftListManage />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    describe("草稿箱 页面快照", () => {
        // 页面快照
        it("草稿箱页面快照", () => {
            expect(container.html()).toMatchSnapshot()
        })
    })
    describe("草稿箱 functions", () => {
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
        // 日期选择器
        it("日期选择器start", () => {
            targetEle = container.find(".datapicker-start").at(0)
            // 内容为空的话
            targetEle.props().onChange("date", "")
            tagetBind = container.find("#datapicker-start")
            expect(tagetBind.props().value).toBeFalsy()

            targetEle.props().onChange("date", "20200713")
            tagetBind = container.find("#datapicker-start")
            expect(tagetBind.props().value).toBe("20200713 00:00:00")
            // expect(targetEle.props().value).toBe("20200713 00:00:00")
        })
        it("日期选择器end", () => {
            targetEle = container.find(".datapicker-end").at(0)
            // 内容为空的话
            targetEle.props().onChange("date", "")
            tagetBind = container.find("#datapicker-start")
            expect(tagetBind.props().value).toBeFalsy()

            targetEle.props().onChange("date", "20200713")
            tagetBind = container.find("#datapicker-end")
            expect(tagetBind.props().value).toBe("20200713 23:59:59")
        })
    })

    describe("应用列表 初始化 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        it("初始化 获取草稿箱列表list 数据列表参数不存在", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_NO_CONTENTS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<DraftListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await mount(<DraftListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取草稿箱列表list 数据列表为空", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN0,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<DraftListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await mount(<DraftListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取应用列表list 成功", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN3,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<DraftListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await mount(<DraftListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(3)
        })
        it("初始化 获取应用列表list 成功-release_date为null ", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_draft_search_data_HasContents_created_date_null,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = mount(<DraftListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await mount(<DraftListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
    describe("草稿箱条件查询 api-mock请求数据", () => {
        let targetEle
        it("草稿箱查询按钮点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN3,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find(".file-search-button").at(0)
            await targetEle.props().onClick()
            await shallow(<DraftListManage />, container)
            await expect(container.find("#table").props().dataSource.length).toBe(3)
        })
    })

    describe("草稿箱新增应用按钮 api-mock请求数据", () => {
        let targetEle
        it("新增应用-获取contentid-成功", async () => {
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLICATION_CONTENT_ID_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find(".file-add-button").at(0)
            await targetEle.props().onClick()
            await expect(props.history.push).toBeCalled()
        })
        it("新增应用-获取contentid-失败", async () => {
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APPLICATION_CONTENT_ID_FAILED,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find(".file-add-button").at(0)
            await targetEle.props().onClick()
            await expect(props.history.push).toBeCalledTimes(0)
        })
    })
    describe("草稿箱删除应用 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        it("草稿箱 应用删除-SUCCESS", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN3,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<DraftListManage />)
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<DraftListManage />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为3
            await expect(targetEle.dataSource.length).toBe(3)
            // 删除回调mock数据
            await mockAxios.delete.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DFAFT_DELETE_DATA_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 删除按钮点击回调成功后，重新取得应用列表list
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 找到删除按钮
            targetEle = await mountEle.find(".delele").at(0).props()
            // 删除按钮点击
            await targetEle.onConfirm()
            // 更新页面
            await mountEle.update()
            // 找到更新后的页面的table列表的list
            targetEle = await mountEle.find("#table").at(0).props()
            // 删除一条数据后，重新更新的页面列表有一条数据
            await expect(targetEle.dataSource.length).toBe(2)
        })
        // it("草稿箱 应用删除-FAILED", async () => {
        //     await mockAxios.get.mockImplementationOnce(() => {
        //         return Promise.resolve({
        //             data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN3,
        //             headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
        //         })
        //     })
        //     let deleteList: any
        //     let tempMount = mount(<DraftListManage />, mountContainer)
        //     let tempProps: any = tempMount.find(".file-search-button").at(0).props()
        //     await tempProps.onClick()
        //     await tempMount.update()
        //     // 删除回调mock数据
        //     await mockAxios.delete.mockImplementationOnce(() => {
        //         return Promise.resolve({
        //             data: TestData.GET_DFAFT_DELETE_DATA_FAILED,
        //             headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
        //         })
        //     })
        //     deleteList = await tempMount.find(".delele").at(0).props()
        //     await deleteList.onConfirm()
        //     await tempMount.update()
        //     deleteList = await tempMount.find("#table").at(0).props()
        //     await expect(deleteList.dataSource.length).toBe(3)
        // })
    })
    describe("草稿箱 数据list操作 ", () => {
        let mountEle: any
        let targetEle: any
        let clickEle: any
        it("数据list操作 编辑按钮点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN3,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<DraftListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<DraftListManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(3)
            clickEle = await mountEle.find(".edit").at(0).props()
            await clickEle.onClick()
            await mountEle.update()
            // await expect(props.history.push).toBeCalled()
        })
        it("数据list操作 页码点击点击", async () => {
            let targetEle
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN3,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find(".file-search-button").at(0)
            await targetEle.props().onClick()
            await shallow(<DraftListManage />, container)
            await console.log(container.find("#table").props().pagination, "paginationpagination")
            await container.find("#table").props().pagination.onChange(1, 10)
            await shallow(<DraftListManage />, container)
            await expect(container.find("#table").props().dataSource.length).toBe(3)
        })
        it("数据list操作 当页显示数目选择", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN200,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<DraftListManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<DraftListManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(200)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_DRAFT_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onShowSizeChange(1, 20)
            await mount(<DraftListManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
})
