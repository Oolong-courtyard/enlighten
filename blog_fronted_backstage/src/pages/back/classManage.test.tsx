import * as React from "react"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import ClassManage from "./classManage"
import mockAxios from "../../__mocks__/axios"
import * as TestData from "../../tests/mockData/testClassManageData"
import "../../plugin/matchData/matchData.mock"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

describe("<ClassManage/>", () => {
    let container: any
    const props = { history: { push: jest.fn() } }
    beforeEach(() => {
        container = shallow(<ClassManage />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    describe("分类管理 页面快照", () => {
        // 页面快照
        it("分类管理页面快照", () => {
            expect(container.html()).toMatchSnapshot()
        })
    })
    describe("分类管理 functions", () => {
        let targetEle
        let event
        // 软件名称输入
        it("组别名称输入", () => {
            targetEle = container.find("#input-id-group")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "组别1", name: "text" } }
            targetEle.simulate("blur", event)
            targetEle = container.find("#input-id-group")
            expect(targetEle.props().defaultValue).toBe("组别1")
        })
        // 作者名称输入
        it("组别slug输入", () => {
            targetEle = container.find("#input-id-slug")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "组别描述1", name: "slug" } }
            targetEle.props().onBlur(event)
            targetEle = container.find("#input-id-slug")
            expect(targetEle.props().defaultValue).toBe("组别描述1")
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
        // 添加按钮点击
        it("添加按钮点击", () => {
            // 添加按钮点击之前，modal 的visible为false
            expect(container.find(".modal").props().visible).toBeFalsy()
            targetEle = container.find(".file-add-button")
            targetEle.simulate("click")
            shallow(<ClassManage />, container)
            // 添加按钮点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            // modal弹框弹出后，点击取消，关闭按钮,modal的visibleb变为为true
            container.find(".modal").props().onCancel()
            expect(container.find(".modal").props().visible).toBeFalsy()
        })
        it("modal弹出框 产品分类选择", () => {
            targetEle = container.find("#modal-select-id-product")
            event = ""
            // 内容为空时
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-product")
            expect(targetEle.props().value).toBeFalsy()

            event = "any_share_cloud"
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-product")
            expect(targetEle.props().value).toBe("any_share_cloud")

            event = "any_backup_cloud"
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-product")
            expect(targetEle.props().value).toBe("any_backup_cloud")

            event = "any_robot_cloud"
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-product")
            expect(targetEle.props().value).toBe("any_robot_cloud")
        })
        it("modal弹出框 内容分类选择", () => {
            targetEle = container.find("#modal-select-id-content")
            event = ""
            // 内容为空时
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-content")
            expect(targetEle.props().value).toBeFalsy()

            event = "application"
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-content")
            expect(targetEle.props().value).toBe("application")

            event = "service"
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-content")
            expect(targetEle.props().value).toBe("service")

            event = "solution"
            targetEle.props().onChange(event)
            targetEle = container.find("#modal-select-id-content")
            expect(targetEle.props().value).toBe("solution")
        })
        it("modal弹出框 组别名称输入", () => {
            targetEle = container.find("#modal-input-id-group")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "组别1", name: "text" } }
            targetEle.simulate("blur", event)
            targetEle = container.find("#modal-input-id-group")
            expect(targetEle.props().defaultValue).toBe("组别1")
        })
        it("modal弹出框 组别slug输入", () => {
            targetEle = container.find("#modal-input-id-slug")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "组别slug1", name: "slug" } }
            targetEle.props().onBlur(event)
            targetEle = container.find("#modal-input-id-slug")
            expect(targetEle.props().defaultValue).toBe("组别slug1")
        })
        it("modal弹出框 组别描述输入", () => {
            targetEle = container.find("#modal-input-id-description")
            event = { target: { value: "", name: "" } }
            // 默认无输入
            targetEle.props().onBlur(event)
            expect(targetEle.props().defaultValue).toBeFalsy()
            event = { target: { value: "组别描述1", name: "description" } }
            targetEle.props().onBlur(event)
            targetEle = container.find("#modal-input-id-description")
            expect(targetEle.props().defaultValue).toBe("组别描述1")
        })
    })

    describe("分类管理 初始化 api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        it("初始化 获取分类管理列表list 数据列表参数不存在", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_NO_CONTENTS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<ClassManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            // 更新页面
            await mount(<ClassManage {...props} />, mountEle)
            await mountEle.update()
            // 更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取分类管理列表list 数据列表为空", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN0,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<ClassManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            // 更新页面
            await mount(<ClassManage {...props} />, mountEle)
            await mountEle.update()
            //更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取分类管理列表list 成功", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<ClassManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<ClassManage {...props} />, mountEle)
            await mountEle.update()
            // 更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(2)
        })
    })
    describe("分类管理条件查询 api-mock请求数据", () => {
        let targetEle
        it("分类管理查询按钮点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 按钮点击
            targetEle = await container.find(".file-search-button").at(0)
            await targetEle.props().onClick()
            await shallow(<ClassManage />, container)
            // 点击后， 取得数据
            await expect(container.find("#table").props().dataSource.length).toBe(1)
        })
    })

    describe("分类管理新增组别 api-mock请求数据", () => {
        let targetEle
        it("新增组别 弹框弹出后 点击确定 SUCCESS", async () => {
            // 页面新增按钮点击
            targetEle = container.find(".file-add-button")
            targetEle.simulate("click")
            // 页面更新
            shallow(<ClassManage />, container)
            // 添加按钮点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            // modal弹出后，点击form 表单的确定按钮
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.POST_CLASS_GROUP_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find("#modal-form").props()
            await targetEle.onFinish()
            // 页面更新
            await shallow(<ClassManage />, container)
            await expect(container.find(".modal").props().visible).toBeFalsy()
        })
        it("新增组别 弹框弹出后 点击确定 FAILED", async () => {
            // 页面新增按钮点击
            targetEle = container.find(".file-add-button")
            targetEle.simulate("click")
            // 页面更新
            shallow(<ClassManage />, container)
            // 添加按钮点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            // modal弹出后，点击form 表单的确定按钮
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.POST_CLASS_GROUP_FAILED,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find("#modal-form").props()
            await targetEle.onFinish()
            // 页面更新
            await shallow(<ClassManage />, container)
            await expect(container.find(".modal").props().visible).toBeFalsy()
        })
    })

    describe("分类管理 数据list操作 +api-mock请求数据", () => {
        let mountEle: any
        let targetEle: any
        it("数据list操作 编辑按钮点击  弹框弹出后 点击确定 SUCCESS", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<ClassManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<ClassManage {...props} />, mountEle)
            await mountEle.update()
            //更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(2)
            // find list的编辑按钮长度
            await expect(mountEle.find(".edit").length).toBe(2)
            // 第一条数据的编辑按钮点击前，modal弹框处于关闭状态
            targetEle = await mountEle.find(".modal").at(0).props()
            await expect(targetEle.visible).toBeFalsy()
            // 单条list的编辑按钮点击
            targetEle = await mountEle.find(".edit").at(0).props()
            await targetEle.onClick()
            await mountEle.update()
            // 编辑按钮点击后，modal弹框弹出，处于开启状态
            targetEle = await mountEle.find(".modal").at(0).props()
            await expect(targetEle.visible).toBeTruthy()

            // 找到表单元素
            targetEle = await mountEle.find(".modal").at(0).props()
            // 表单确定按钮点击
            await targetEle.onOk()
            // 更新页面
            await mountEle.update()
            // 确定按钮点击后，由于弹框存在空值，表单验证未通过，modal没有关闭，提示输入值
            targetEle = await mountEle.find(".modal").at(0).props()
            await expect(targetEle.visible).toBeTruthy()
            await mountEle.update()
            // 设置弹框内的产品分类
            targetEle = await mountEle.find(".modal-select-id-product").at(0).props()
            targetEle.onChange("test_any_share_cloud")
            // 设置弹框内的内容分类
            targetEle = await mountEle.find(".modal-select-id-content").at(0).props()
            targetEle.onChange("test_application")
            // 设置弹框内的组别slug
            targetEle = await mountEle.find("#text").at(0).props()
            targetEle.onBlur({ target: { value: "组别1", name: "text" } })
            targetEle = await mountEle.find("#slug").at(0).props()
            targetEle.onBlur({ target: { value: "组别slug1", name: "slug" } })
            targetEle = await mountEle.find("#description").at(0).props()
            targetEle.onBlur({ target: { value: "组别描述1", name: "description" } })
            await mountEle.update()
            // find 弹框确定按钮,调用eidit接口成功
            await mockAxios.put.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.POST_CLASS_GROUP_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 表单确定按钮点击后，重新取得应用列表list
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 找到表单元素
            targetEle = await mountEle.find("#modal-form").at(0).props()
            // 表单确定按钮点击
            await targetEle.onFinish()
            // 更新页面
            await mountEle.update()
            // 确定按钮点击后，表单验证通过，提交数据成功，弹框关闭
            targetEle = await mountEle.find(".modal").at(0).props()
            await expect(targetEle.visible).toBeFalsy()
            // // 更新页面
            await mountEle.update()
            // // 重新获取数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })

        it("数据list操作 删除按钮点击-SUCCESS", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<ClassManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<ClassManage {...props} />, mountEle)
            await mountEle.update()
            //更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(2)
            // 删除回调mock数据
            await mockAxios.delete.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_DATA_DELETE_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 删除按钮点击回调成功后，重新取得应用列表list
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 单条list的删除按钮点击
            targetEle = await mountEle.find(".delete").at(0).props()
            await targetEle.onConfirm()
            await mountEle.update()
            // 删除回调成功,找到更新后的页面的table列表的list
            targetEle = await mountEle.find("#table").at(0).props()
            // 删除一条数据后，重新更新的页面列表有一条数据
            await expect(targetEle.dataSource.length).toBe(1)
        })
        it("数据list操作 页码点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<ClassManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<ClassManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onChange(1, 10)
            await mount(<ClassManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
        it("数据list操作 当页显示数目选择", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN200,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<ClassManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<ClassManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(200)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_CLASS_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onShowSizeChange(1, 20)
            await mount(<ClassManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })
})
