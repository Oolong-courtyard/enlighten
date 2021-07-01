import React from "react"
import Enzyme, { shallow, mount, render } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import TagManage from "./tagManage"
import "../../plugin/matchData/matchData.mock"
import * as TestData from "../../tests/mockData/testTagListData"
import mockAxios from "../../__mocks__/axios"
Enzyme.configure({ adapter: new Adapter() })

describe("标签列表页", () => {
    let container: any
    let mountContainer: any
    const props = { history: { push: jest.fn() } }
    beforeEach(() => {
        container = shallow(<TagManage {...props} />)
        mountContainer = mount(<TagManage />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("页面快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
    let targetEle
    let event
    // 标签名称输入
    it("标签名称输入", () => {
        targetEle = container.find("#input-id-group")
        event = { target: { value: "", name: "" } }
        // 默认无输入
        targetEle.props().onBlur(event)
        expect(targetEle.props().defaultValue).toBeFalsy()
        event = { target: { value: "标签1", name: "text" } }
        targetEle.simulate("blur", event)
        targetEle = container.find("#input-id-group")
        expect(targetEle.props().defaultValue).toBe("标签1")
    })
    // 标签slug输入
    it("标签slug输入", () => {
        targetEle = container.find("#input-id-slug")
        event = { target: { value: "", name: "" } }
        // 默认无输入
        targetEle.props().onBlur(event)
        expect(targetEle.props().defaultValue).toBeFalsy()
        event = { target: { value: "标签描述1", name: "slug" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#input-id-slug")
        expect(targetEle.props().defaultValue).toBe("标签描述1")
    })
    // 添加按钮点击
    it("添加按钮点击", () => {
        // 添加按钮点击之前，modal 的visible为false
        expect(container.find(".modal").props().visible).toBeFalsy()
        targetEle = container.find(".file-add-button")
        targetEle.simulate("click")
        shallow(<TagManage />, container)
        // 添加按钮点击之后，modal的visible为true
        expect(container.find(".modal").props().visible).toBeTruthy()
        console.log(container.find(".modal").length, "modal length")
        // modal弹框弹出后，点击取消，关闭按钮,modal的visibleb变为为true
        container.find(".modal").props().onCancel()
        expect(container.find(".modal").props().visible).toBeFalsy()
    })
    // modal标签名称输入
    it("modal标签名称输入", () => {
        targetEle = container.find("#modal-input-id-group1")
        event = { target: { value: "", name: "" } }
        // 默认无输入
        targetEle.props().onBlur(event)
        expect(targetEle.props().defaultValue).toBeFalsy()
        event = { target: { value: "name1", name: "text" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#modal-input-id-group1")
        expect(targetEle.props().defaultValue).toBe("name1")
    })
    // 标签描述输入
    it("modal标签slug输入", () => {
        targetEle = container.find("#modal-input-id-slug1")
        event = { target: { value: "", name: "" } }
        // 默认无输入
        targetEle.props().onBlur(event)
        expect(targetEle.props().defaultValue).toBeFalsy()
        event = { target: { value: "slug1", name: "slug" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#modal-input-id-slug1")
        expect(targetEle.props().defaultValue).toBe("slug1")
    })
    // 标签描述输入
    it("modal标签描述输入", () => {
        targetEle = container.find("#modal-input-id-desc")
        event = { target: { value: "", name: "" } }
        // 默认无输入
        targetEle.props().onBlur(event)
        expect(targetEle.props().defaultValue).toBeFalsy()
        event = { target: { value: "标签描述1", name: "description" } }
        targetEle.props().onBlur(event)
        targetEle = container.find("#modal-input-id-desc")
        expect(targetEle.props().defaultValue).toBe("标签描述1")
    })

    describe("标签列表 API-mock 请求数据", () => {
        let mountEle: any
        let targetEle: any
        it("get term_list api ", async () => {
            mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_NO_CONTENTS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<TagManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            // 更新页面
            await mount(<TagManage {...props} />, mountEle)
            await mountEle.update()
            // 更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取标签管理列表list 数据列表为空", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN0,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<TagManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            // 更新页面
            await mount(<TagManage {...props} />, mountEle)
            await mountEle.update()
            //更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBeFalsy()
        })
        it("初始化 获取分类管理列表list 成功", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<TagManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<TagManage {...props} />, mountEle)
            await mountEle.update()
            // 更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(2)
        })
    })
    describe("分类管理条件查询 api-mock请求数据", () => {
        let targetEle, targetEvent
        it("分类管理查询按钮点击", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 按钮点击
            targetEle = await container.find(".file-search-button").at(0)
            await targetEle.props().onClick()
            await shallow(<TagManage />, container)
            // 点击后， 取得数据
            await expect(container.find("#table").props().dataSource.length).toBe(1)
        })
    })

    describe("分类管理新增标签 api-mock请求数据", () => {
        let targetEle
        it("新增标签 弹框弹出后 点击确定 SUCCESS", async () => {
            // 页面新增按钮点击
            targetEle = container.find(".file-add-button")
            targetEle.simulate("click")
            // 页面更新
            shallow(<TagManage />, container)
            // 添加按钮点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            // modal弹出后，点击form 表单的确定按钮
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.POST_TAG_GROUP_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find("#modal-form").props()
            await targetEle.onFinish()
            // 页面更新
            await shallow(<TagManage />, container)
            await expect(container.find(".modal").props().visible).toBeFalsy()
        })
        it("新增标签 弹框弹出后 点击确定 FAILED", async () => {
            // 页面新增按钮点击
            targetEle = container.find(".file-add-button")
            targetEle.simulate("click")
            // 页面更新
            shallow(<TagManage />, container)
            // 添加按钮点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            // modal弹出后，点击form 表单的确定按钮
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.POST_TAG_GROUP_FAILED,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find("#modal-form").props()
            await targetEle.onFinish()
            // 页面更新
            await shallow(<TagManage />, container)
            await expect(container.find(".modal").props().visible).toBeFalsy()
        })
    })

    describe("标签管理 数据list操作 api-mock", () => {
        let mountEle: any
        let targetEle: any
        it("编辑按钮点击  弹框弹出后 点击确定 SUCCESS", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<TagManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<TagManage {...props} />, mountEle)
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
            // 设置弹框内的组别slug
            await console.log(mountEle.html(), "aaaaaa")
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
                    data: TestData.GET_TAG_EDIT_CONTENT_ID_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 表单确定按钮点击后，重新取得应用列表list
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN3,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 找到表单元素
            targetEle = await mountEle.find(".modal").at(0).props()
            // 表单确定按钮点击
            await targetEle.onOk()
            // 更新页面
            await mountEle.update()
            // 确定按钮点击后，表单验证通过，提交数据成功，弹框关闭
            targetEle = await mountEle.find(".modal").at(0).props()
            await expect(targetEle.visible).toBeFalsy()
            // 更新页面
            await mountEle.update()
            //这一行不能删
            await mountEle.update()
            // 重新获取数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(3)
        })

        it("数据list操作 删除按钮点击-SUCCESS", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<TagManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // 页面未更新前，数据为空
            await expect(targetEle.dataSource.length).toBeFalsy()
            await mount(<TagManage {...props} />, mountEle)
            await mountEle.update()
            //更新后， 取得数据
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(2)
            // 删除回调mock数据
            await mockAxios.delete.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_DELETE_DATA_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 删除按钮点击回调成功后，重新取得应用列表list
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN1,
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
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<TagManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<TagManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(2)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onChange(1, 10)
            await mount(<TagManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
        it("数据list操作 当页显示数目选择", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN200,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            // 初始化页面
            mountEle = mount(<TagManage {...props} />)
            targetEle = await mountEle.find("#table").at(0).props()
            // await console.log(targetEle, "更新前")
            // 初始化页面获得数据，重新渲染页面
            await mount(<TagManage {...props} />, mountEle)
            // 页面更新
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            // 先初始化页面取得applist的length为2
            await expect(targetEle.dataSource.length).toBe(200)
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_TAG_SEARCH_DATA_CONTENTS_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await console.log(targetEle.pagination, "targetEle.paginationtargetEle.paginationtargetEle.pagination")
            await targetEle.pagination.onShowSizeChange(1, 20)
            await mount(<TagManage {...props} />, mountEle)
            await mountEle.update()
            targetEle = await mountEle.find("#table").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })
    })

    describe("分类管理新增标签 api-mock请求数据", () => {
        let targetEle
        it("新增标签 弹框弹出后 点击确定 SUCCESS", async () => {
            // 页面新增按钮点击
            targetEle = container.find(".file-add-button")
            targetEle.simulate("click")
            // 页面更新
            shallow(<TagManage />, container)
            // 添加按钮点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            // modal弹出后，点击form 表单的确定按钮
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.POST_TAG_GROUP_SUCCESS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find("#modal-form").props()
            await targetEle.onFinish()
            // 页面更新
            await shallow(<TagManage />, container)
            await expect(container.find(".modal").props().visible).toBeFalsy()
        })
        it("新增标签 弹框弹出后 点击确定 FAILED", async () => {
            // 页面新增按钮点击
            targetEle = container.find(".file-add-button")
            targetEle.simulate("click")
            // 页面更新
            shallow(<TagManage />, container)
            // 添加按钮点击之后，modal的visible为true
            expect(container.find(".modal").props().visible).toBeTruthy()
            // modal弹出后，点击form 表单的确定按钮
            await mockAxios.post.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.POST_TAG_GROUP_FAILED,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            targetEle = await container.find("#modal-form").props()
            await targetEle.onFinish()
            // 页面更新
            await shallow(<TagManage />, container)
            await expect(container.find(".modal").props().visible).toBeFalsy()
        })
    })
})
