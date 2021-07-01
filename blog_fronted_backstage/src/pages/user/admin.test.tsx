import React from "react"
import Enzyme, { shallow, mount, render } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import AdminForm from "./admin"
import FileSaver from "file-saver"
import "../../plugin/matchData/matchData.mock"
import mockAxios from "../../__mocks__/axios"
import * as TestData from "../../tests/mockData/testadminListData"

Enzyme.configure({ adapter: new Adapter() })
jest.mock("file-saver", () => ({ saveAs: jest.fn() }))
describe("admin user列表页", () => {
    let container: any
    let props = { history: { push: jest.fn() } }
    beforeEach(() => {
        container = shallow(<AdminForm {...props} />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("页面快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
    describe("admin user List functions", () => {
        let targetEle
        let event
        let tagetBind
        it("输入用户名", () => {
            targetEle = container.find("#from-group-input")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "test", name: "nickname" } }
            targetEle.props().onBlur(event)
            targetEle = container.find("#from-group-input")
            expect(targetEle.props().defaultValue).toBe("test")
        })
        it("产品分类选择", () => {
            targetEle = container.find("#select-id-userClass")
            event = ""
            // 内容为空时
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-userClass")
            expect(targetEle.props().value).toBeFalsy()

            event = "普通用户"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-userClass")
            expect(targetEle.props().value).toBe("普通用户")

            event = "exchange管理员"
            targetEle.props().onChange(event)
            targetEle = container.find("#select-id-userClass")
            expect(targetEle.props().value).toBe("exchange管理员")
        })
    })
    describe("条件查询 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        let clickEle: any
        it("草稿箱查询按钮点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find(".file-search-button").at(0)
            await targetEle.props().onClick()
            await shallow(<AdminForm />, container)
            await expect(container.find("#table").props().dataSource.length).toBe(2)
        })
        it("数据list操作 页码点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<AdminForm {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<AdminForm {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得ADMIN的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onChange(1, 10)
            await mount(<AdminForm {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
        it("数据list操作 当页显示数目选择", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN200,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<AdminForm {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<AdminForm {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(200)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onShowSizeChange(1, 20)
            await mount(<AdminForm {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
    describe("CSV", () => {
        let mountEle: any
        let targetEle: any
        let clickEle: any

        it("导出用户列表-页面有数据时", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<AdminForm {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<AdminForm {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            targetEle = await mountEle.find(".exportCSV").at(0)
            await targetEle.simulate("click")
        })
        it("导出用户列表-页面无数据时", () => {
            console.log("aaaa", container.find(".exportCSV").props())
            container.find(".exportCSV").at(0).simulate("click")
            expect(FileSaver.saveAs).toBeCalled()
        })
    })
    describe("权限设置", () => {
        let mountEle: any
        let targetEle: any
        let clickEle: any

        it("设置权限 user设置为manager-SUCCESS", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<AdminForm {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<AdminForm {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            // 设置为exchange管理员/为普通用户按钮点击回调成功后，重新取得应用列表list
            await mockAxios.put.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_EDIT_CONTENT_ID_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 点击设置为管理员按钮
            targetEle = await mountEle.find(".setBtn").at(0).props()
            await targetEle.onConfirm()
            await mountEle.update()
            // 设置回调成功,找到更新后的页面的table列表的list
            targetEle = await mountEle.find("#table").at(0).props()
            // 设置一条数据后，重新更新的页面列表有一条数据
            await expect(targetEle.dataSource.length).toBe(2)
        })

        it("设置权限 manager设置为user-SUCCESS", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<AdminForm {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<AdminForm {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(1)
            // 设置为exchange管理员/为普通用户按钮点击回调成功后，重新取得应用列表list
            await mockAxios.put.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_ADMIN_EDIT_CONTENT_ID_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 点击设置为管理员按钮
            targetEle = await mountEle.find(".setBtn").at(0).props()
            await targetEle.onConfirm()
            await mountEle.update()
            // 设置回调成功,找到更新后的页面的table列表的list
            targetEle = await mountEle.find("#table").at(0).props()
            // 设置一条数据后，重新更新的页面列表有一条数据
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
})
