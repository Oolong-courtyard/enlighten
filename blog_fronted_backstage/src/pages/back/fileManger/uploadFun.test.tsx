import React from "react"
import { BrowserRouter } from "react-router-dom"
import UploadFun from "./uploadFun"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import mockAxios from "../../../__mocks__/axios"
import * as TestData from "../../../tests/mockData/testUploadFun"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

let getImgProps = { type: "logo", pickerClass: "logoPicker", uploadType: "image", successUrl: "testSuccessUrl", uploadResult: jest.fn(), SetNewFile: jest.fn() }
let getFileProps = { type: "file", pickerClass: "filePicker", uploadType: "file", successUrl: "testSuccessUrl", uploadResult: jest.fn(), SetNewFile: jest.fn() }
let getOtherFileProps = { type: "otherFile", pickerClass: "otherFilePicker", uploadType: "image", successUrl: "testSuccessUrl", uploadResult: jest.fn(), SetNewFile: jest.fn() }
let getVideoImgProps = { type: "videoImage", pickerClass: "tempVideoImage", uploadType: "image", successUrl: "testSuccessUrl", uploadResult: jest.fn(), SetNewFile: jest.fn() }
let getVideoProps = { type: "otherFile", pickerClass: "otherFilePicker1", uploadType: "video", successUrl: "testSuccessUrl", uploadResult: jest.fn(), SetNewFile: jest.fn() }

describe("图片展示组件", () => {
    let container: any
    let mountContainer: any
    let props = { history: { push: jest.fn() }, location: { pathname: "/manager/appListManage" } }
    beforeEach(() => {
        container = shallow(<UploadFun />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("图片上传", async () => {
        mountContainer = await mount(<UploadFun pickerClass={getImgProps.pickerClass} type={getImgProps.type} uploadType={getImgProps.uploadType} successUrl={getImgProps.successUrl} uploadResult={getImgProps.uploadResult} SetNewFile={getImgProps.SetNewFile} />)
        let hopeFun = mountContainer.find("#hope").props().value
        //上传方法挂载
        let fileQueuedFun: any
        let beforeFileQueuedFun: any
        let uploadProgressFun: any
        let uploadSuccessFun: any
        let uploadAcceptFun: any
        hopeFun["_events"].map((item: any) => {
            if (item.e == "beforeFileQueued") {
                beforeFileQueuedFun = item
            }
            if (item.e == "fileQueued") {
                fileQueuedFun = item
            }
            if (item.e == "uploadProgress") {
                uploadProgressFun = item
            }
            if (item.e == "uploadSuccess") {
                uploadSuccessFun = item
            }
            if (item.e == "uploadAccept") {
                uploadAcceptFun = item
            }
        })
        //mock接口数据
        beforeFileQueuedFun.cb({ formData: "testMe" })
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_INIT,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_COMPLETE,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        //选择文件
        await fileQueuedFun.cb({ name: "testMe.png" })
        await mountContainer.update()
        await expect(mountContainer.state("uploadStatus")).toBe(true)
        //计算上传文件百分比
        await uploadProgressFun.cb({ name: "testMe" }, 1)
        await expect(mountContainer.state("uploadProgress")).toBe(99)
        //分配上传回调
        await uploadAcceptFun.cb({ name: "testMe" }, { detail: { PartNumber: 1, ETag: "d850c0d6f83f988940bf864ff3854d9b" } })
        await expect(mountContainer.state("ETagArr")).toStrictEqual([{ PartNumber: 1, ETag: "850c0d6f83f988940bf864ff3854d9" }])
        //整个文件的所有分片都上传成功后，调用该方法
        await uploadSuccessFun.cb({ name: "testMe" })
        await expect(mountContainer.state("uploadOver")).toBe(true)
        //错误的文件类型
        await fileQueuedFun.cb({ name: "testMe.pnaadadadadadadag" })
        await expect(mountContainer.state("progreeShow")).toBe(true)
    })
})

describe("文件上传组件", () => {
    let container: any
    let mountContainer: any
    let props = { history: { push: jest.fn() }, location: { pathname: "/manager/appListManage" } }
    beforeEach(() => {
        container = shallow(<UploadFun />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("文件上传", async () => {
        let simulateClass = "." + getImgProps.pickerClass
        mountContainer = await mount(<UploadFun pickerClass={getFileProps.pickerClass} type={getFileProps.type} uploadType={getFileProps.uploadType} successUrl={getFileProps.successUrl} uploadResult={getFileProps.uploadResult} SetNewFile={getFileProps.SetNewFile} />)

        let hopeFun = mountContainer.find("#hope").props().value
        //生命周期挂载
        let fileQueuedFun: any
        let beforeFileQueuedFun: any
        let uploadProgressFun: any
        let uploadSuccessFun: any
        let uploadAcceptFun: any
        hopeFun["_events"].map((item: any) => {
            if (item.e == "beforeFileQueued") {
                beforeFileQueuedFun = item
            }
            if (item.e == "fileQueued") {
                fileQueuedFun = item
            }
            if (item.e == "uploadProgress") {
                uploadProgressFun = item
            }
            if (item.e == "uploadSuccess") {
                uploadSuccessFun = item
            }
            if (item.e == "uploadAccept") {
                uploadAcceptFun = item
            }
        })
        //加入队列
        beforeFileQueuedFun.cb({ formData: "testMe" })
        //选择文件
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_INIT,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })

        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_COMPLETE,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })

        // await fileQueuedFun.cb({ name: "testMe.png" })
        // //计算上传文件百分比
        // uploadProgressFun.cb({ name: "testMe" }, 100)
        // //分配上传回调
        // uploadAcceptFun.cb({ name: "testMe" })
        //整个文件的所有分片都上传成功后，调用该方法
        // await uploadSuccessFun.cb({ name: "testMe", size: 100 })
        // await mountContainer.update()
        // //文件下载 文件再上传
        // await mountContainer.find("#downLoadButton").at(0).simulate("click")
        // await mountContainer.find("#uploadAgainButton").at(0).simulate("click")

        //选择文件
        await fileQueuedFun.cb({ name: "testMe.png" })
        await mountContainer.update()
        await expect(mountContainer.state("uploadStatus")).toBe(true)
        //计算上传文件百分比
        await uploadProgressFun.cb({ name: "testMe" }, 1)
        await expect(mountContainer.state("uploadProgress")).toBe(99)
        //分配上传回调
        await uploadAcceptFun.cb({ name: "testMe" }, { detail: { PartNumber: 1, ETag: "d850c0d6f83f988940bf864ff3854d9b" } })
        await expect(mountContainer.state("ETagArr")).toStrictEqual([{ PartNumber: 1, ETag: "850c0d6f83f988940bf864ff3854d9" }])
        //整个文件的所有分片都上传成功后，调用该方法
        await uploadSuccessFun.cb({ name: "testMe" })
        await expect(mountContainer.state("uploadOver")).toBe(true)
        await mountContainer.update()
        //文件下载 文件再上传
        await mountContainer.find("#downLoadButton").at(0).simulate("click")
        await mountContainer.find("#uploadAgainButton").at(0).simulate("click")
    })
})

describe("预览信息上传", () => {
    let container: any
    let mountContainer: any
    let props = { history: { push: jest.fn() }, location: { pathname: "/manager/appListManage" } }
    beforeEach(() => {
        container = shallow(<UploadFun />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("预览信息上传", async () => {
        let simulateClass = "." + getImgProps.pickerClass
        mountContainer = await mount(<UploadFun pickerClass={getOtherFileProps.pickerClass} type={getOtherFileProps.type} uploadType={getOtherFileProps.uploadType} successUrl={getOtherFileProps.successUrl} uploadResult={getOtherFileProps.uploadResult} SetNewFile={getOtherFileProps.SetNewFile} />)
        let hopeFun = mountContainer.find("#hope").props().value
        //生命周期挂载
        let fileQueuedFun: any
        let beforeFileQueuedFun: any
        let uploadProgressFun: any
        let uploadSuccessFun: any
        let uploadAcceptFun: any
        hopeFun["_events"].map((item: any) => {
            if (item.e == "beforeFileQueued") {
                beforeFileQueuedFun = item
            }
            if (item.e == "fileQueued") {
                fileQueuedFun = item
            }
            if (item.e == "uploadProgress") {
                uploadProgressFun = item
            }
            if (item.e == "uploadSuccess") {
                uploadSuccessFun = item
            }
            if (item.e == "uploadAccept") {
                uploadAcceptFun = item
            }
        })
        //加入队列
        beforeFileQueuedFun.cb({ formData: "testMe" })
        //选择文件
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_INIT,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_COMPLETE,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        //（小文件）
        fileQueuedFun.cb({ name: "testMe.png", size: 2 })
        //计算上传文件百分比
        uploadProgressFun.cb({ name: "testMe" }, 100)
        // //分配上传回调
        // uploadAcceptFun.cb({ name: "testMe" })
        //整个文件的所有分片都上传成功后，调用该方法（小文件）
        uploadSuccessFun.cb({ name: "testMe", size: 2 })
        // hopeFun.on("fileQueued", { name: "testMe" })
    })
})

describe("预览信息视频上传组件", () => {
    let container: any
    let mountContainer: any
    let props = { history: { push: jest.fn() }, location: { pathname: "/manager/appListManage" } }
    beforeEach(() => {
        container = shallow(<UploadFun />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("预览信息视频上传", async () => {
        let simulateClass = "." + getImgProps.pickerClass
        mountContainer = await mount(<UploadFun pickerClass={getVideoImgProps.pickerClass} type={getVideoImgProps.type} uploadType={getVideoImgProps.uploadType} successUrl={getVideoImgProps.successUrl} uploadResult={getVideoImgProps.uploadResult} SetNewFile={getVideoImgProps.SetNewFile} />)
        // await console.log(mountContainer.find(simulateClass).length, "上传按钮长度")
        // await mountContainer.find(simulateClass).simulate("click")

        let hopeFun = mountContainer.find("#hope").props().value
        //生命周期挂载
        let fileQueuedFun: any
        let beforeFileQueuedFun: any
        let uploadProgressFun: any
        let uploadSuccessFun: any
        let uploadAcceptFun: any
        hopeFun["_events"].map((item: any) => {
            if (item.e == "beforeFileQueued") {
                beforeFileQueuedFun = item
            }
            if (item.e == "fileQueued") {
                fileQueuedFun = item
            }
            if (item.e == "uploadProgress") {
                uploadProgressFun = item
            }
            if (item.e == "uploadSuccess") {
                uploadSuccessFun = item
            }
            if (item.e == "uploadAccept") {
                uploadAcceptFun = item
            }
        })
        //加入队列
        beforeFileQueuedFun.cb({ formData: "testMe" })
        //选择文件
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_INIT,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })

        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_COMPLETE,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        fileQueuedFun.cb({ name: "testMe.png" })
        // //计算上传文件百分比
        // uploadProgressFun.cb({ name: "testMe" }, 100)
        // //分配上传回调
        // uploadAcceptFun.cb({ name: "testMe" })
        //整个文件的所有分片都上传成功后，调用该方法
        uploadSuccessFun.cb({ name: "testMe", size: 100 })

        // hopeFun.on("fileQueued", { name: "testMe" })
    })
})

describe("预览信息视频上传组件", () => {
    let container: any
    let mountContainer: any
    let props = { history: { push: jest.fn() }, location: { pathname: "/manager/appListManage" } }
    beforeEach(() => {
        container = shallow(<UploadFun />)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("预览信息视频", async () => {
        // let simulateClass = "." + getVideoProps.pickerClass
        mountContainer = await mount(<UploadFun pickerClass={getVideoProps.pickerClass} type={getVideoProps.type} uploadType={getVideoProps.uploadType} successUrl={getVideoProps.successUrl} uploadResult={getVideoProps.uploadResult} SetNewFile={getVideoProps.SetNewFile} />)

        let hopeFun = mountContainer.find("#hope").props().value
        console.log(hopeFun)
        //生命周期挂载
        let fileQueuedFun: any
        let beforeFileQueuedFun: any
        let uploadProgressFun: any
        let uploadSuccessFun: any
        let uploadAcceptFun: any
        hopeFun["_events"].map((item: any) => {
            if (item.e == "beforeFileQueued") {
                beforeFileQueuedFun = item
            }
            if (item.e == "fileQueued") {
                fileQueuedFun = item
            }
            if (item.e == "uploadProgress") {
                uploadProgressFun = item
            }
            if (item.e == "uploadSuccess") {
                uploadSuccessFun = item
            }
            if (item.e == "uploadAccept") {
                uploadAcceptFun = item
            }
        })
        //加入队列
        beforeFileQueuedFun.cb({ formData: "testMe" })
        //选择文件
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_INIT,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        await mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
                data: TestData.GET_UNPLOAD_COMPLETE,
                headers: { "x-onetimetoken": "adadaahdjkahdajkhkajdhjkad" },
            })
        })
        //选择文件
        fileQueuedFun.cb({ name: "testMe.mp4" })
        // //计算上传文件百分比
        // uploadProgressFun.cb({ name: "testMe" }, 100)
        // //分配上传回调
        // uploadAcceptFun.cb({ name: "testMe" })
        //整个文件的所有分片都上传成功后，调用该方法
        uploadSuccessFun.cb({ name: "testMe", size: 100 })
        // hopeFun.on("fileQueued", { name: "testMe" })
    })
})
