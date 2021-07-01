import React from "react"
import renderer from "react-test-renderer"
import { BrowserRouter } from "react-router-dom"
import { shallow, mount } from "enzyme"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import "../../plugin/matchData/matchData.mock"
import * as TestData from "../../tests/mockData/testAppDetailActionData"
import mockAxios from "../../__mocks__/axios"
import AppDetailAction from "./appDetailAction"
Enzyme.configure({ adapter: new Adapter() })

const addPropsLocation = { hash: "", key: "lzjfzd", pathname: "/manager/addAppDetailAction", search: "", state: undefined }
const addPropsMatch = { isExact: true, params: {}, path: "/manager/addAppDetailAction/:record_id/:record_type", url: "/manager/addAppDetailAction" }
const props = { history: { push: jest.fn() } }
const propsLocation = { hash: "", key: "lzjfzd", pathname: "/manager/appDetailAction/12/AnyShare Cloud", search: "", state: undefined }
const propsMatch = { isExact: true, params: { recordId: "12", recordType: "AnyShare Cloud" }, path: "/manager/appDetailAction/:record_id/:record_type", url: "/manager/appDetailAction/12/AnyShare Cloud" }

describe("详情页面 页面快照", () => {
    let propsLocation = { hash: "", key: "lzjfzd", pathname: "/manager/appDetailAction/12/AnyShare Cloud", search: "", state: undefined }
    let propsMatch = { isExact: true, params: { recordId: "12", recordType: "AnyShare Cloud" }, path: "/manager/appDetailAction/:record_id/:record_type", url: "/manager/appDetailAction/12/AnyShare Cloud" }
    const container = mount(
        <BrowserRouter>
            <AppDetailAction location={propsLocation} match={propsMatch} />
        </BrowserRouter>
    )

    // 页面快照
    it("详情页面快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
})

describe("新增应用", () => {
    let wrapper: any = mount(
        <BrowserRouter>
            <AppDetailAction {...props} location={addPropsLocation} match={addPropsMatch} />
        </BrowserRouter>
    )
    let contentProps: any
    let event

    it("输入框测试", async () => {
        //初始为空
        event = { target: { value: "", name: "" } }
        contentProps = await wrapper.find("#validate_other_content_name").at(0).props()
        await contentProps.onBlur(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_content_name").at(0).props()
        await expect(contentProps.defaultValue).toBe("")

        //赋值
        event = { target: { value: "aaa", name: "content_name" } }
        contentProps = await wrapper.find("#validate_other_content_name").at(0).props()
        await contentProps.onBlur(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_content_name").at(0).props()
        await expect(contentProps.defaultValue).toBe("aaa")

        //初始为空
        event = { target: { value: "", name: "" } }
        contentProps = await wrapper.find("#validate_other_phone").at(0).props()
        await contentProps.onBlur(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_phone").at(0).props()
        await expect(contentProps.defaultValue).toBe("")

        event = { target: { value: "aaa", name: "phone" } }
        contentProps = await wrapper.find("#validate_other_phone").at(0).props()
        await contentProps.onBlur(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_phone").at(0).props()
        await expect(contentProps.defaultValue).toBe("aaa")
    })

    // it("API 保存草稿箱", async () => {
    //     await mockAxios.put.mockImplementationOnce(() => {
    //         return Promise.resolve({
    //             data: TestData.RES_SUCCESS,
    //             headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
    //         })
    //     })
    //     contentProps = await wrapper.find("#draftSaveButton").at(0)
    //     await contentProps.props().onClick()
    //     await expect(props.history.push).toBeCalled()
    // })
    it("下拉框测试", async () => {
        event = "AnyRobot"
        contentProps = await wrapper.find("#validate_other_product_type").at(0).props()
        await contentProps.onChange(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_product_type").at(0).props()
        await expect(contentProps.value).toBe("AnyRobot")

        event = "servers"
        contentProps = await wrapper.find("#validate_other_content_type").at(0).props()
        await contentProps.onChange(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_content_type").at(0).props()
        await expect(contentProps.value).toBe("servers")
    })

    it("tag多选测试", async () => {
        event = ""
        contentProps = await wrapper.find("#validate_other_group_id_list").at(0).props()
        await contentProps.onChange(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_group_id_list").at(0).props()
        await expect(contentProps.value).toBeFalsy()

        event = ["groupId_mock", "groupId_mock2"]
        contentProps = await wrapper.find("#validate_other_group_id_list").at(0).props()
        await contentProps.onChange(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_group_id_list").at(0).props()
        await expect(contentProps.value).toStrictEqual(["groupId_mock", "groupId_mock2"])

        event = ""
        contentProps = await wrapper.find("#validate_other_tag_id_list").at(0).props()
        await contentProps.onChange(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_tag_id_list").at(0).props()
        await expect(contentProps.value).toBeFalsy()

        event = ["tagId_mock", "tagId_mock2"]
        contentProps = await wrapper.find("#validate_other_tag_id_list").at(0).props()
        await contentProps.onChange(event)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_tag_id_list").at(0).props()
        await expect(contentProps.value).toStrictEqual(["tagId_mock", "tagId_mock2"])
    })

    it("radio测试", async () => {
        event = {
            target: {
                value: "video",
            },
        }
        contentProps = await wrapper.find("#radioGroup").at(0).props()
        await contentProps.onChange(event)
        await wrapper.update()
        contentProps = await wrapper.find("#radioGroup").at(0).props()
        await expect(contentProps.value).toBe("video")
    })

    it("设置验证数据", async () => {
        //填数据
        let data = {
            content_id: "1f3f099333784f2998acb8124128b9e8",
            old_record_id: "c3a9c7ff14e24985aab109f72c7822e3",
            product_type: "any_share_cloud",
            content_name: "我我我",
            publisher: "aaa",
            description: "aaaa",
            content_type: "application",
            version: "1",
            product_info: "aaa",
            logo_url: "aaaa",
            thumbnail_url: "test",
            preview_media_urls: {
                value: [{ name: "aaaa" }],
            },
            support_info: {
                phone: "18221824120",
                email: "overflowys@163.com",
            },
            file_id_list: [1111],
            tag_id_list: [22222],
            tagDom_list: [3333],
            tagPre_list: [44444],
            //暂无
            group_id_list: [55555],
            group_full_list: [3333],
            groupDom_list: [222222],
            sort_key: 1,
            file_list: [
                {
                    file_name: "aaaaa",
                    file_id: "1231312321",
                },
            ],
            initCount: 0,
            tempVideoImage: "asdadadssdsd",
        }
        let PreviewList = [{ indexId: 1, file_name: "aaa", progress: 100, file_type: "image", objectUrl: "www.baidu.com", videoImageUrl: "www.google.com" }]
        let obj = { data: data, list: PreviewList }
        wrapper.find("#testInput").at(0).props().onClick(obj)
        await wrapper.update()
        contentProps = await wrapper.find("#validate_other_content_name").at(0).props()
        await expect(contentProps.defaultValue).toBe("我我我")
    })

    it("API 保存草稿箱", async () => {
        await mockAxios.put.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.RES_SUCCESS,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })

        contentProps = await wrapper.find("#draftSaveButton").at(0)
        await contentProps.props().onClick()
        // await expect(props.history.push).toBeCalled()
    })

    it("API 发布应用", async () => {
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.RES_SUCCESS,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        contentProps = await wrapper.find("#releaseButton").at(0)
        await contentProps.props().onClick()
        await expect(props.history.push).toBeCalled()
    })

    it("API 预览", async () => {
        contentProps = await wrapper.find("#previewButton").at(0)
        await contentProps.props().onClick()
        await expect(props.history.push).toBeCalled()
    })

    describe("应用上传页面", () => {
        let eventEle: any
        let targetEle: any
        let mountEle: any
        it("图片上传 删除 排序", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_ACTION_TAG_TERMS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_ACTION_GROUP_TERMS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <AppDetailAction {...props} location={addPropsLocation} match={addPropsMatch} />
                </BrowserRouter>
            )
            await mountEle.update()

            //添加数据
            targetEle = await mountEle.find("#webUploadThree").at(0)
            await console.log(targetEle.props(), "targetele")
            eventEle = {
                type: "fileData",
                msg: {
                    name: "testName",
                },
            }
            let eventEle1 = {
                type: "fileData",
                msg: {
                    name: "testName1",
                },
            }
            await targetEle.props().SetNewFile(eventEle.type, eventEle.msg)
            await targetEle.props().SetNewFile(eventEle1.type, eventEle1.msg)
            await mountEle.update()
            targetEle = await mountEle.find("#previewTable").at(0).props()
            await console.log(targetEle, "previewTable")
            await expect(targetEle.dataSource.length).toBe(2)
            await mountEle.update()

            //修改进度条
            event = {
                type: "uploadProgress",
                msg: 100,
                fileName: "testName",
                objectUrl: "testUrl",
            }
            targetEle = await mountEle.find("#webUploadThree").at(0)
            await targetEle.props().SetNewFile(event.type, event.msg, event.fileName, event.objectUrl)
            await mountEle.update()
            targetEle = await mountEle.find("#previewTable").at(0).props()
            console.log(targetEle.dataSource, "who am i")
            await expect(targetEle.dataSource[0].progress).toBe(100)

            //排序
            //下移
            targetEle = await mountEle.find(".downSortTrigger").at(0).props().onClick()
            await mountEle.update()
            targetEle = await mountEle.find("#previewTable").at(0).props()
            await expect(targetEle.dataSource[0].file_name).toBe("testName1")
            //上移
            targetEle = await mountEle.find(".upSortTrigger").at(0).props().onClick()
            await mountEle.update()
            targetEle = await mountEle.find("#previewTable").at(0).props()
            await expect(targetEle.dataSource[0].file_name).toBe("testName1")

            //删除
            targetEle = await mountEle.find(".delTrigger").at(0).props()
            await targetEle.onConfirm()
            await mountEle.update()
            targetEle = await mountEle.find("#previewTable").at(0).props()
            await expect(targetEle.dataSource.length).toBe(1)
        })

        it("视频上传测试", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_ACTION_TAG_TERMS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_ACTION_GROUP_TERMS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <AppDetailAction {...props} location={addPropsLocation} match={addPropsMatch} />
                </BrowserRouter>
            )
            await mountEle.update()

            event = {
                target: {
                    value: "video",
                },
            }
            contentProps = await mountEle.find("#radioGroup").at(0).props()
            await contentProps.onChange(event)
            await mountEle.update()
            contentProps = await mountEle.find("#radioGroup").at(0).props()
            await expect(contentProps.value).toBe("video")

            targetEle = await mountEle.find("#webUploadOther").at(0)
            eventEle = {
                type: "fileData",
                msg: {
                    name: "testVideo",
                },
            }
            await targetEle.props().SetNewFile(eventEle.type, eventEle.msg)
            await mountEle.update()
            targetEle = await mountEle.find("#previewTable").at(0).props()
            await console.log(targetEle, "previewTable")
            await expect(targetEle.dataSource.length).toBe(1)
        })

        it("上传成功回调", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_ACTION_TAG_TERMS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_ACTION_GROUP_TERMS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <AppDetailAction {...props} location={addPropsLocation} match={addPropsMatch} />
                </BrowserRouter>
            )
            await mountEle.update()

            //添加数据
            targetEle = await mountEle.find("#webUploadThree").at(0)
            eventEle = {
                type: "logo",
                uploadType: "test",
                fileId: "test",
                fileUrl: "testUrl",
            }
            await targetEle.props().uploadResult(eventEle.type, eventEle.uploadType, eventEle.fileId, eventEle.fileUrl)
            await mountEle.update()
            targetEle = await mountEle.find("#formDataInput").at(0).props().value
            await expect(targetEle.logo_url).toBe(eventEle.fileUrl)
            await mountEle.update()

            targetEle = await mountEle.find("#webUploadThree").at(0)
            eventEle = {
                type: "thumbnail",
                uploadType: "test",
                fileId: "test",
                fileUrl: "testUrl",
            }
            await targetEle.props().uploadResult(eventEle.type, eventEle.uploadType, eventEle.fileId, eventEle.fileUrl)
            await mountEle.update()
            targetEle = await mountEle.find("#formDataInput").at(0).props().value
            await expect(targetEle.thumbnail_url).toBe(eventEle.fileUrl)
            await mountEle.update()

            targetEle = await mountEle.find("#webUploadThree").at(0)
            eventEle = {
                type: "file",
                uploadType: "test",
                fileId: "test",
                fileUrl: "testUrl",
            }
            await targetEle.props().uploadResult(eventEle.type, eventEle.uploadType, eventEle.fileId, eventEle.fileUrl)
            await mountEle.update()
            targetEle = await mountEle.find("#formDataInput").at(0).props().value
            await expect(targetEle.file_id_list).toStrictEqual([eventEle.fileId])
            await mountEle.update()

            targetEle = await mountEle.find("#webUploadThree").at(0)
            eventEle = {
                type: "videoImage",
                uploadType: "test",
                fileId: "test",
                fileUrl: "testUrl",
            }
            await targetEle.props().uploadResult(eventEle.type, eventEle.uploadType, eventEle.fileId, eventEle.fileUrl)
            await mountEle.update()
            targetEle = await mountEle.find("#formDataInput").at(0).props().value
            await expect(targetEle.tempVideoImage).toBe(eventEle.fileUrl)
            await mountEle.update()
        })
    })
})

describe("编辑应用", () => {
    let eventEle: any
    let targetEle: any
    let mountEle: any
    it("上传成功回调", async () => {
        await mockAxios.get.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_APP_DETAIL,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        await mockAxios.get.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_EDIT_TAG,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        await mockAxios.get.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_EDIT_GROUP,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        await mockAxios.get.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_EDIT_GROUP,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        mountEle = await mount(
            <BrowserRouter>
                <AppDetailAction {...props} location={propsLocation} match={propsMatch} />
            </BrowserRouter>
        )
        await mountEle.update()
        await mount(
            <BrowserRouter>
                <AppDetailAction {...props} location={propsLocation} match={propsMatch} />
            </BrowserRouter>,
            mountEle
        )
        await mountEle.update()
        // targetEle = await mountEle.find("input[name='content_name']").at(0).props()
        // await expect(targetEle.value).toBe("ys测试应用0011111")
    })
})
