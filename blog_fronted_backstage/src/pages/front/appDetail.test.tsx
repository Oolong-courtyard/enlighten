import React from "react"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import AppDetail from "./appDetail"
import mockAxios from "../../__mocks__/axios"
import * as TestData from "../../tests/mockData/testAppDetail"

import "../../plugin/matchData/matchData.mock"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

const props = {
    history: { push: jest.fn(), goBack: jest.fn() },
    location: { hash: "", key: "lzjfzd", pathname: "/manager/appDetail/12/AnyShare Cloud", search: "", state: undefined },
    match: { isExact: true, params: { recordId: "12", recordType: "AnyShare Cloud" }, path: "/manager/appDetail/:record_id/:record_type", url: "/manager/appDetail/12/AnyShare Cloud" },
}

describe("<AppDetail/>", () => {
    let container: any
    it("官网应用详细页面快照 ", () => {
        container = shallow(
            <BrowserRouter>
                <AppDetail {...props} />
            </BrowserRouter>
        )
        expect(container.html()).toMatchSnapshot()
    })
    it("页面返回按钮点击", () => {
        let mountEle: any
        mountEle = mount(
            <BrowserRouter>
                <AppDetail {...props} />
            </BrowserRouter>
        )
        mountEle.update()
        mountEle.find(".back-icon").at(0).simulate("click")

        expect(props.history.goBack).toBeCalled()
    })
    describe("官网应用详细页面初始化", () => {
        let mountEle: any
        let targetEle: any
        it("初始化应用信息取得 该作者只有一个应用时", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_CONTENTS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_TERMS_GROUP,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_PUBLISHER_OTHER_APPLICATION_LEN1,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <AppDetail {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            await console.log("first update")
            await console.log(mountEle.html(), "mountElemountElemountEle")
            // 页面未更新前,该作者的其它应用为空,
            targetEle = await mountEle.find(".app-card")
            await expect(targetEle.length).toBe(0)
            // // 标签组为空
            targetEle = await mountEle.find(".tag-style")
            await expect(targetEle.length).toBe(0)
            // 页面更新
            await mount(
                <BrowserRouter>
                    <AppDetail {...props} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            await console.log("second update")
            await console.log(mountEle.html(), "mountElemountElemountEleNEw")
            // // 页面未更新前,该作者的其它应用为空,
            targetEle = await mountEle.find(".app-card")
            await expect(targetEle.length).toBe(0)
            // // 标签组为空
            targetEle = await mountEle.find(".tag-style")
            await expect(targetEle.length).toBe(0)

            //测试下载方法
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_DOWNLOAD,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await window.localStorage.setItem("x-Userid", "aaaa")
            await mountEle.find("#downLoadBtn").at(0).simulate("click")
            await mountEle.update()
        })
        it("初始化应用信息取得 该作者有两个以上应用时", async () => {
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_CONTENTS,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_TERMS_GROUP,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_PUBLISHER_OTHER_APPLICATION_LEN2,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            mountEle = await mount(
                <BrowserRouter>
                    <AppDetail {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            await console.log(mountEle.html(), "mountElemountElemountEle")
            // 页面未更新前,该作者的其它应用为空,
            targetEle = await mountEle.find(".app-card")
            await expect(targetEle.length).toBe(0)
            // // 标签组为空
            targetEle = await mountEle.find(".tag-style")
            await expect(targetEle.length).toBe(0)
            // 页面更新
            await mount(
                <BrowserRouter>
                    <AppDetail {...props} />
                </BrowserRouter>,
                mountEle
            )
            await mountEle.update()
            await console.log(mountEle.find(".other-block").html(), "other-blockother-block")
            // // 页面未更新前,该作者的其它应用为空,
            targetEle = await mountEle.find(".app-card")
            await expect(targetEle.length).toBe(2)
            // // 标签组为空
            targetEle = await mountEle.find(".tag-style")
            await expect(targetEle.length).toBe(0)

            //测试下载失败方法
            await mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: TestData.GET_APP_DETAIL_DOWNLOAD,
                    headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
                })
            })
            await window.localStorage.removeItem("x-Userid")
            await mountEle.find("#downLoadBtn").at(0).simulate("click")
            await mountEle.update()
        })
        it("初始化应用信息 进入预览", async () => {
            props.location.pathname = "/appDetailPreview"
            const testFormData = await TestData.GET_APP_DETAIL_CONTENTS.detail.contents
            await window.sessionStorage.setItem("formData", JSON.stringify(testFormData))
            mountEle = await mount(
                <BrowserRouter>
                    <AppDetail {...props} />
                </BrowserRouter>
            )
            await mountEle.update()
            targetEle = mountEle.find(".app-name")
            await expect(targetEle.text()).toBe("test测试")
        })
    })
})
// describe("官网应用详细页面 快照", () => {
//     it("官网详细页面快照", () => {
//         const container = shallow(<AppDetail />)
//         expect(container.html()).toMatchSnapshot()
//     })
// })
// describe("官网应用详细页面 API-mock 请求数据", () => {
//     it("应用详情取得", async () => {
//         await mockAxios.get.mockImplementationOnce(() => {
//             return Promise.resolve({
//                 data: {
//                     contents: {
//                         content_id: "",
//                         content_name: "mock-test content_name",
//                         content_type: 1,
//                         created_date: "",
//                         description: "这是单元测试mock",
//                         logo_url: "",
//                         preview_media_urls: {
//                             image: "",
//                         },
//                         preview_media_urls1: {
//                             image_urls: [],
//                             video_urls: [],
//                         },
//                         product_info: "这是单元测试mock",
//                         product_type: 1,
//                         publisher: "test",
//                         record_id: "",
//                         support_info: {
//                             phone: "18205649876",
//                             email: "2678245634@qq.com",
//                         },
//                         version: "1.0.0",
//                         tag_id_list: [],
//                         count: 0,
//                     },
//                 },
//             })
//         })
//         const container = shallow(<AppDetail {...props} />)
//         await container.props()["data-detailsearch"]()
//         const returnResult = await container.props()["data-returntestvalue"]()[0]
//         await expect(returnResult.content_name).toBe("mock-test content_name")
//     })
//     // 其它应用作者取得
//     it("作者上传的其他应用取得", async () => {
//         mockAxios.get.mockImplementationOnce(() => {
//             return Promise.resolve({
//                 data: {
//                     response_data: {
//                         contents: [
//                             {
//                                 created_date: "2020-06-28 17:04:15",
//                                 content_id: "c0ab3f50f85943d18a2f8468daad1ab0",
//                                 record_id: "bd219f70879f4acdb866bdabdebf706c",
//                                 reversion: "536b4d0826fd47909edba8ea654a3e26",
//                                 record_type: "publish",
//                                 product_type: null,
//                                 content_name: "adadadadasd",
//                                 publisher: null,
//                                 description: null,
//                                 content_type: null,
//                                 version: null,
//                                 thumbnail_url: null,
//                                 sort_key: 0,
//                                 delete_flg: 0,
//                             },
//                             {
//                                 created_date: "2020-07-02 11:04:15",
//                                 content_id: "c0ab3f50f85943d18a2f8468daad1ab0",
//                                 record_id: "bd219f70879f4acdb866bdabdebf706c",
//                                 reversion: "536b4d0826fd47909edba8ea654a3e26",
//                                 record_type: "publish",
//                                 product_type: null,
//                                 content_name: "adadadadasd",
//                                 publisher: null,
//                                 description: null,
//                                 content_type: null,
//                                 version: null,
//                                 thumbnail_url: null,
//                                 sort_key: 0,
//                                 delete_flg: 0,
//                             },
//                         ],
//                     },
//                 },
//             })
//         })
//         const container = shallow(<AppDetail {...props} />)
//         await container.props()["data-publisherotherappget"]("test")
//         const returnResult = await container.props()["data-returntestvalue"]()[1]
//         await expect(returnResult.length).toBe(2)
//     })
//     // 获取标签
//     it("获取标签", async () => {
//         mockAxios.get.mockImplementationOnce(() => {
//             return Promise.resolve({
//                 data: {
//                     relations: {
//                         terms: [{ text: "标签1" }, { text: "标签2" }],
//                     },
//                 },
//             })
//         })
//         const container = shallow(<AppDetail {...props} />)
//         await container.props()["data-termtagget"]("id1234")
//         const returnResult = await container.props()["data-returntestvalue"]()[0]
//         await expect(returnResult.tag_id_list.length).toBe(2)
//     })
//     // 获取下载地址
//     it("获取下载地址", async () => {
//         mockAxios.get.mockImplementationOnce(() => {
//             return Promise.resolve({
//                 data: {
//                     download_url_list: "htttp://testDownload.mp3",
//                 },
//             })
//         })
//         const container = shallow(<AppDetail {...props} />)
//         await container.props()["data-filedownLoadget"]("id1234")
//         const returnResult = await container.props()["data-returntestvalue"]()[2]
//         await expect(returnResult).toBe("htttp://testDownload.mp3")
//         // 下载地址获取后，触发下载按钮
//         await container.find(".download-btn").at(0).simulate("click")
//         const nowLocation = await window.location.href
//         expect(nowLocation).toBeTruthy()
//     })
// })

// describe("应用详细页面 functions测试", () => {
//     const wrapper = shallow(<AppDetail {...props} />)
//     it("返回按钮点击", () => {
//         const container = shallow(<AppDetail {...props} />)
//         container.props()["data-back"]()
//         expect(props.history.goBack).toBeCalled()
//     })
// })
