import React, { useState, useEffect } from "react"
import { Form, Select, Button, Input, Radio, Space, Row, Col, Card, Progress, List, Avatar, Modal, Table, Popconfirm, message, notification } from "antd"
import { ColumnProps } from "antd/lib/table"
import { UploadOutlined, FileAddOutlined, PictureOutlined, VideoCameraAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import "@/assets/css/back/appDetailAction.less"
import { Link } from "react-router-dom"

//文件上传
import WebuploaderCreate from "./fileManger/uploadFun"

//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
import Until from "../../until/until"
const { Option } = Select
const children: any[] = []
const { TextArea } = Input
let timeout: any
let currentValue: any

function AppDetailAction(props: any) {
    //获取form实例
    const [form] = Form.useForm()
    //判断是否是草稿编辑
    const [draft, setDraft] = useState(false)
    const [contentNameStatus, setContentNameStatus] = useState(false)
    // 隐藏表单的必选标记
    const [hideRequiredMarkStatus, setHideRequiredMark] = useState(true)
    // 标签搜索
    const [tagListSearch, setTagListSearch] = useState({
        text: "",
        per_page: 100,
        page: 1,
    })
    // 页面初始化
    useEffect(() => {
        // tagListGet()
        // groupListGet()
        //判断是否是新增
        let pathName = props.location.pathname
        if (pathName.indexOf("addAppDetailAction") != -1) {
            //更新content_id
            formData.content_id = window.sessionStorage.getItem("content_id")
            formData.old_record_id = window.sessionStorage.getItem("record_id")
            setFormData({ ...formData })
            fire()
            //新增
            setInit(true)
            groupListGet()
            tagListGet()
            console.log("初始化走的页面setInit")
        } else {
            //是否是草稿
            console.log(props, "adadadadadad")
            setContentNameStatus(true)
            if (props.location.hasOwnProperty("query")) {
                if (props.location.query.editType == "draft") {
                    setDraft(true)
                }
            }
            //编辑传递
            detailInit()
            console.log("初始化走的页面detailInit")
        }
    }, [])

    //--------------表单部分
    //表单布局
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    //单选框
    const plainOptions = [
        { label: "图片", value: "image" },
        { label: "视频", value: "video" },
    ]
    //获取单选框内容
    const [uploadType, setUploadType] = useState("image")
    const onChangeRadio = (e: any) => {
        childFuntion.uploadType(e.target.value)
        setUploadType(e.target.value)
        //清空封面链接
        formData.tempVideoImage = ""
        setFormData({ ...formData })
    }
    //标签选择
    const selectTagHandleChange = (value: any, option: any) => {
        console.log(value, option, "tagtagtagtagtagtagtagtagtagtagtag")
        let tempArr: any = []
        option.forEach((item: any) => {
            tempArr.push(item.key)
        })
        formData.tag_id_list = tempArr
        setFormData({ ...formData })
    }
    // 标签搜索
    const selectTagHandleSearch = (value: any) => {
        if (value) {
            tagListSearch.text = value
        } else {
            tagListSearch.text = ""
        }
        tagListGet()
    }
    const selectGroupHandleChange = (value: any, option: any) => {
        console.log(value, option, "groupgroupgroupgroupgroupgroupgroupgroup")
        let tempArr: any = []
        option.forEach((item: any) => {
            tempArr.push(item.key)
        })
        formData.group_id_list = tempArr
        // formData.group_id_list = option.key
        setFormData({ ...formData })
    }

    //标签数据初始化
    async function tagListGet() {
        // let parm = {
        //     text: "s",
        //     per_page: 100,
        //     page: 1,
        // }
        const requestData = request.get(Urls.TERM_LIST + "/tag", tagListSearch)
        await requestData.then((res: any) => {
            console.log(res, "标签数据初始化")
            formData.tag_full_list = res.terms
            formData.tagPre_list = res.terms
            formData.initCount += 1
            setFormData({ ...formData })
            optionSet("tag")
        })
    }

    //标签数据是否全部抽取
    function fetchTag(value: any) {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        currentValue = value

        function searchTag() {
            let dataJson = {
                text: value,
            }
            request.get(Urls.TERM_LIST + "/tag", dataJson).then((res: any) => {
                console.log(res, "分类数据初始化")
                formData.tag_full_list = res.terms
                setFormData({ ...formData })
                optionSet("tag")
            })
        }

        timeout = setTimeout(searchTag, 300)
    }

    function handleTag(value: any) {
        if (value) {
            fetchTag(value)
        }
    }

    //分类数据初始化
    async function groupListGet(flag?: string) {
        console.log(formData, "formDataformDataformDataformDataformData")
        let dataJson = {
            product_type: formData.product_type,
            content_type: formData.content_type,
        }
        const requestData = request.get(Urls.TERM_LIST + "/group", dataJson)
        await requestData.then((res: any) => {
            console.log(res, "分类数据初始化")
            formData.group_full_list = res.terms
            formData.initCount += 1
            setFormData({ ...formData })
            optionSet("group", flag)
        })
    }

    function optionSet(type: string, flag?: string) {
        let tempArray: any = []
        if (type === "tag") {
            formData.tag_full_list.forEach((item: any, index: number) => {
                tempArray.push(
                    <Select.Option key={item.term_id} value={item.text}>
                        {item.text}
                    </Select.Option>
                )
            })
            formData.tagDom_list = tempArray
        } else if (type === "group") {
            formData.group_full_list.forEach((item: any, index: number) => {
                tempArray.push(
                    <Select.Option key={item.term_id} value={item.text}>
                        {item.text}
                    </Select.Option>
                )
            })
            if (flag == "clear") {
                console.log("999888")
                form.setFieldsValue({
                    group_id_list: [],
                    group_full_list: [],
                })
                formData.group_id_list = []
                formData.group_full_list = []
            }
            formData.groupDom_list = tempArray
        }
        setFormData({ ...formData })
    }
    // for (let i = 10; i < 36; i++) {
    //     children.push(<option key={i.toString(36) + i}>{i.toString(36) + i}</option>)
    // }

    // 输入框输入监听
    const InputOnChange = (e: any) => {
        console.log(e.target.name, "name")
        console.log(e.target.value, "value")
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const objectOnChange = (e: any) => {
        formData.support_info[e.target.name] = e.target.value
        setFormData({ ...formData })
    }

    // 下拉框选择
    const SelectProductOnChange = async (value: string, type: number) => {
        switch (type) {
            case 0:
                formData["product_type"] = value
                await setFormData({ ...formData })
                await groupListGet("clear")
                break
            case 1:
                formData["content_type"] = value
                await setFormData({ ...formData })
                await groupListGet("clear")
                break
            default:
                break
        }
    }

    //-------------文件上传部分
    //子组件的函数
    const [childFuntion, setChildFuntion] = useState<any>("")
    interface IUserCommona {
        indexId: number
        file_name: string
        file_type: string
        progress: number
    }
    //预览信息表格定义
    const columnsReally: ColumnProps<IUserCommona>[] = [
        {
            title: "序号",
            dataIndex: "indexId",
        },
        {
            title: "文件名称",
            dataIndex: "file_name",
            width: "400px",
        },
        {
            title: "文件类型",
            dataIndex: "file_type",
        },
        {
            title: "上传进度",
            key: "progress",
            render: (text) => <Progress className="fileList-progress" percent={text.progress} />,
            width: "600px",
        },
        {
            title: "操作",
            key: "action",
            render: (text, record: any) => (
                <Space size="middle">
                    <a
                        className="upSortTrigger"
                        style={{ color: "#1890ff" }}
                        onClick={() => {
                            sortUpdate(text, record, "up")
                        }}>
                        上移
                    </a>
                    <a
                        className="downSortTrigger"
                        style={{ color: "#1890ff" }}
                        onClick={() => {
                            sortUpdate(text, record, "down")
                        }}>
                        下移
                    </a>
                    <Popconfirm
                        className="delTrigger"
                        title="是否删除?"
                        onConfirm={() => {
                            otherFileDelete(text)
                        }}>
                        <a style={{ display: record.progress === 100 ? "block" : "none", color: "#FF7875" }}>删除</a>
                    </Popconfirm>
                    {/* {record.status != "未发布" && <a>下架 {record.name}</a> */}
                </Space>
            ),
        },
    ]

    interface previewList {
        indexId: number
        file_name: string
        file_type: string
        progress: number
        objectUrl: string
        videoImageUrl?: string | undefined
    }

    let [previewList, setPreviewList] = useState<previewList[]>([])

    //预览信息 上移 下移
    function sortUpdate(text: previewList, record: any, action: string) {
        let temp = text.indexId
        if (action === "up" && text.indexId !== 1) {
            previewList[temp - 1].indexId = temp - 1
            previewList[temp - 2].indexId = temp
        } else if (action === "down" && text.indexId !== previewList.length) {
            previewList[temp - 1].indexId = temp + 1
            previewList[temp].indexId = temp
        }
        sortbyKey(previewList, "indexId")
        setPreviewList([...previewList])
    }

    //对象排序
    function sortbyKey(arr: any, key: string) {
        if (arr.length > 0) {
            return arr.sort((a: any, b: any) => {
                let x = a[key]
                let y = b[key]
                return x - y
            })
        }
    }

    //预览信息中的删除
    function otherFileDelete(obj: previewList) {
        let tempIndex = 0
        previewList.forEach((item: any, index: number) => {
            if (item.indexId == obj.indexId) {
                tempIndex = index
            }
        })
        previewList.splice(tempIndex, 1)
        previewList.forEach((item, index) => {
            item.indexId = index + 1
        })
        setPreviewList([...previewList])
    }

    // function sortAgain(obj: previewList[]) {
    //     obj.forEach((item, index) => {
    //         item.indexId = index + 1
    //     })
    // }

    const otherFileUploader = (type: any, msg: any, fileName?: string, objectUrl?: string) => {
        console.log("老弟来了吗老弟来了吗老弟来了吗老弟来了吗老弟来了吗")
        console.log(type, "type")
        console.log(uploadType, "uploadType")
        if (type == "fileData") {
            if (uploadType == "video") {
                if (formData.tempVideoImage == "") {
                    notification.error({
                        description: "视频封面未上传",
                        message: "封面文件为空",
                        placement: "bottomRight",
                    })
                } else {
                    previewList.push({ indexId: previewList.length + 1, file_name: msg.name, progress: 0, file_type: uploadType, objectUrl: "", videoImageUrl: formData.tempVideoImage })
                }
            } else {
                previewList.push({ indexId: previewList.length + 1, file_name: msg.name, progress: 0, file_type: uploadType, objectUrl: "" })
            }
            console.log(previewList, "来了老弟来了老弟来了老弟来了老弟来了老弟")
            setPreviewList([...previewList])
            //清空封面链接
            formData.tempVideoImage = ""
        }

        if (type == "uploadProgress") {
            console.log(fileName, "0")
            console.log(previewList, "0.5")
            previewList.forEach((item: any) => {
                console.log(1)
                if (item.file_name == fileName) {
                    console.log(2)
                    item.progress = msg
                    item.objectUrl = objectUrl
                }
            })
            setPreviewList([...previewList])
        }
    }

    //上传附件处理
    interface listData {
        type?: string
        title?: string
        progress?: number
        objectUrl?: string
    }
    const listData: listData[] = []
    const [fileListData, setFileListData] = useState(listData)
    // const otherFileUploader = (type: any, msg: any, fileName?: string, objectUrl?: string) => {
    //     if (type == "fileData") {
    //         fileListData.push({ title: msg.name, progress: 0, type: uploadType, objectUrl: "" })
    //         setFileListData([...fileListData])
    //     }

    //     if (type == "uploadProgress") {
    //         fileListData.forEach((item: any) => {
    //             if (item.title == fileName) {
    //                 item.progress = msg
    //                 item.objectUrl = objectUrl
    //             }
    //         })
    //         setFileListData([...fileListData])
    //     }
    // }

    //附件中的删除
    // function otherFileDelete(obj: previewList) {
    //     let tempIndex = 0
    //     previewList.forEach((item: any, index: number) => {
    //         if (item.indexId == obj.indexId) {
    //             tempIndex = index
    //         }
    //     })
    //     previewList.splice(tempIndex, 1)
    //     sortAgain(previewList)
    //     setPreviewList([...previewList])
    //     console.log(previewList, "看我看我看我看我看我看我看我看我看我看我")
    // }

    // function sortAgain(obj: previewList[]) {
    //     obj.forEach((item, index) => {
    //         item.indexId = index + 1
    //     })
    // }

    //确认删除弹窗
    // const reloadCheck = (fileName: string | undefined) => {
    //     Modal.confirm({
    //         title: "是否删除此文件",
    //         icon: <ExclamationCircleOutlined />,
    //         onOk() {
    //             otherFileDelete(fileName)
    //         },
    //     })
    // }
    //视频封面组件 重新渲染
    const [reloadKey, setReloadKey] = useState(1)
    //上传成功回调
    const uploadResult = (type: string, uploadType: string, fileId: string, fileUrl: string) => {
        if (type === "logo") {
            formData.logo_url = fileUrl
            formData.thumbnail_url = fileUrl + "?x-image-process=image/resize,w_70,h_70"
        } else if (type === "thumbnail") {
            formData.thumbnail_url = fileUrl
        } else if (type === "file") {
            formData.file_id_list = [fileId]
        } else if (type === "videoImage") {
            formData.tempVideoImage = fileUrl
        } else if (type === "otherFileVideo") {
            let temp = reloadKey
            temp = temp + 1
            setReloadKey(temp)
        }
        setFormData({ ...formData })
    }

    //弹出层显示隐藏
    const [showModalState, setShowModalState] = useState(false)
    const [showModalSrc, setShowModalSrc] = useState<any>("")

    //应用详情
    let defaultData = {
        content_id: "1f3f099333784f2998acb8124128b9e8",
        old_record_id: "c3a9c7ff14e24985aab109f72c7822e3",
        product_type: "any_share_cloud",
        content_name: "",
        publisher: "",
        description: "",
        content_type: "application",
        version: "",
        product_info: "",
        logo_url: "",
        thumbnail_url: "test",
        preview_media_urls: {
            value: [],
        },
        support_info: {
            phone: "",
            email: "",
        },
        file_id_list: [],
        tag_id_list: [],
        tag_id_list_pre: [],
        tag_text_list: [],
        tagDom_list: [],
        tagPre_list: [],
        //暂无
        group_id_list: [],
        group_text_list: [],
        group_full_list: [],
        groupDom_list: [],
        sort_key: 1,
        file_list: [
            {
                file_name: "",
                file_id: "",
            },
        ],
        initCount: 0,
        tempVideoImage: "",
    }

    //页面数据初始化，如果有recordId传入，则查询数据
    let [formData, setFormData] = useState<any>(defaultData)
    const [init, setInit] = useState<Boolean>(false)
    async function detailInit() {
        let dataJson = {
            record_id: props.match.params.record_id,
            record_type: props.match.params.record_type,
        }
        const requestData = request.get(Urls.MGR_CONTENT_DETAILS + "/" + dataJson.record_type + "/" + dataJson.record_id, "")
        await requestData.then((res) => {
            console.log(res, "详情接口res")
            initSuccess(res)
        })
    }

    async function getItemTag() {
        let dataJson = {
            record_id: props.match.params.record_id,
            record_type: props.match.params.record_type,
        }
        let parm = {
            per_page: 100,
            page: 1,
        }
        let tempArr: any = []
        let realIdArr: any = []
        const requestData = request.get(Urls.USER_TERMS + "/tag/" + dataJson.record_id, parm)
        let temp = await requestData.then((res: any) => {
            console.log(res, "详情接口Tag")
            res.relations.terms.forEach((item: any) => {
                tempArr.push(item.text)
                realIdArr.push(item.term_id)
            })
            return tempArr
        })
        console.log(tempArr, "tempArrTag")
        return [tempArr, realIdArr]
    }

    async function getItemGroup() {
        let dataJson = {
            record_id: props.match.params.record_id,
            record_type: props.match.params.record_type,
        }
        let tempArr: any = []
        let realIdArr: any = []

        const requestData = request.get(Urls.USER_TERMS + "/group/" + dataJson.record_id, "")
        await requestData.then((res: any) => {
            console.log(res, "详情接口Group")
            res.relations.terms.forEach((item: any) => {
                tempArr.push(item.text)
                realIdArr.push(item.term_id)
            })
        })
        return [tempArr, realIdArr]
    }

    async function initSuccess(res: any) {
        console.log(res, "res")
        let temp = res
        let tempTagArr = []
        let tempGroupArr = []
        temp.file_list.map((item: any) => {
            formData.file_id_list.push(item.file_id)
        })
        temp.old_record_id = window.sessionStorage.getItem("record_id")
        tempTagArr = await getItemTag()
        temp.tag_id_list = tempTagArr[1]
        temp.tag_text_list = tempTagArr[0]
        tempGroupArr = await getItemGroup()
        temp.group_id_list = tempGroupArr[1]
        temp.group_text_list = tempGroupArr[0]
        console.log(temp.tag_id_list, "我拿到了")
        // temp.record_id = window.sessionStorage.getItem("record_id")
        temp = Until.deleteDataNull(temp)
        console.log("删除了nulll的数据", temp)
        if (temp.file_list.length == 0) {
            delete temp.file_list
        }
        let tempJson: any = { ...formData, ...temp }
        formData = tempJson
        formData.product_type = temp.product_type
        formData.content_type = temp.content_type
        console.log("hebning", formData)
        setFormData({ ...tempJson })
        console.log(formData.tag_id_list, "我真的拿到了吗")
        groupListGet()
        tagListGet()

        fire()

        //预览信息
        setPreviewList(formData.preview_media_urls.value)
        setInit(true)
        // let tempList = res.content.preview_media_urls
        // //加载已有附件数据
        // let tempArr: listData[] = []
        // if (tempList.image_urls.length != 0) {
        //     tempList.image_urls.forEach((item: any) => {
        //         let dataJson = {
        //             type: "image",
        //             title: "预览图",
        //             progress: 100,
        //             objectUrl: item,
        //         }
        //         tempArr.push(dataJson)
        //     })
        // }
        // if (tempList.video_urls.length != 0) {
        //     tempList.video_urls.forEach((item: any) => {
        //         let dataJson = {
        //             type: "video",
        //             title: "预览视频",
        //             progress: 100,
        //             objectUrl: item,
        //         }
        //         tempArr.push(dataJson)
        //     })
        // }
        // setFileListData(tempArr)
        // await termGet()
    }

    function termGet() {
        getItemTag()
        getItemGroup()
    }

    useEffect(() => {
        if (props.location.pathname.indexOf("addAppDetailAction") != -1) {
            //新增
            if (formData.initCount === 2) {
                setInit(true)
            }
        } else {
            if (formData.initCount === 3) {
                setInit(true)
            }
        }
    }, [formData])

    function preTagHandle() {
        let tagList = formData.tagPre_list
        let selectTag = formData.tag_id_list
        let tempList: any = []
        tagList.forEach((item1: any) => {
            selectTag.forEach((item2: any) => {
                if (item1.term_id == item2) {
                    tempList.push({ text: item1.text })
                }
            })
        })
        formData.tag_id_list_pre = tempList
    }

    //表单验证
    function formValidateFields(type: string) {
        form.validateFields()
            .then((values: any) => {
                formData.preview_media_urls.value = previewList
                if (formData.logo_url != "" && formData.file_id_list.length != 0 && formData.preview_media_urls.value.length != 0) {
                    if (uploadStatus) {
                        notification.error({
                            description: "文件上传中，请稍等",
                            message: "文件上传中",
                            placement: "bottomRight",
                        })
                        return false
                    } else {
                        if (type == "changePreview") {
                            changePreview()
                        } else if (type == "draftSave") {
                            // draftSave()
                        } else if (type == "release") {
                            release()
                        }
                    }
                } else {
                    notification.error({
                        description: "请检查是否有文件未上传",
                        message: "上传文件为空",
                        placement: "bottomRight",
                    })
                    return false
                }
            })
            .catch((errorInfo: any) => {
                notification.error({
                    description: "请检查是否有参数未填写",
                    message: "参数验证不通过",
                    placement: "bottomRight",
                })
                console.log(errorInfo, "errorInfo")
                return false
            })
    }

    //上传状态监测
    const [uploadStatus, setUploadStatus] = useState(false)
    function uploadStatusWatch() {
        if (uploadStatus) {
            notification.error({
                description: "上传中，请稍等",
                message: "文件上传中",
                placement: "bottomRight",
            })
            return false
        } else {
            setUploadStatus(true)
            return true
        }
    }

    function uploadStatusSet(flag: boolean) {
        setUploadStatus(flag)
    }

    function otherFileNameCheck(fileName: string) {
        let temp = true
        previewList.forEach((item) => {
            if (item.file_name == fileName) {
                notification.error({
                    description: "文件名重复，请修改文件名",
                    message: "文件名重复",
                    placement: "bottomRight",
                })
                temp = false
            }
        })
        if (temp) {
            return true
        } else {
            return false
        }
    }

    //----------------API交互
    //应用发布
    async function release() {
        let postData = JSON.parse(JSON.stringify(formData))

        delete postData.file_list
        delete postData.groupDom_list
        delete postData.tagDom_list
        delete postData.tagPre_list
        delete postData.initCount
        delete postData.tempVideoImage
        delete postData.group_full_list
        delete postData.group_text_list
        delete postData.tag_full_list
        delete postData.tag_id_list_pre
        delete postData.tag_text_list
        // delete postData.record_id
        console.log(postData, "release")
        const requestData = request.post(Urls.MGR_CONTENT_RELEASE, postData)
        await requestData.then((res) => {
            console.log(res, "草稿箱callback")
            message.success("发布成功")
            if (draft) {
                delDraft(postData.content_id)
            } else {
                props.history.push("/manager/appListManage")
            }
        })
    }
    //保存到草稿箱
    async function draftSave() {
        if (uploadStatus) {
            notification.error({
                description: "文件上传中，请稍等",
                message: "文件上传中",
                placement: "bottomRight",
            })
            return false
        } else {
            formData.preview_media_urls.value = previewList
            let postData = JSON.parse(JSON.stringify(formData))

            delete postData.file_list
            delete postData.groupDom_list
            delete postData.tagDom_list
            delete postData.tagPre_list
            delete postData.initCount
            delete postData.tempVideoImage
            delete postData.group_full_list
            delete postData.group_text_list
            delete postData.tag_full_list
            delete postData.tag_id_list_pre
            delete postData.tag_text_list
            console.log(JSON.parse(JSON.stringify(postData)), "保存草稿删除")
            postData = Until.cleanData(postData)
            console.log(postData, "清除空数据")

            const requestData = request.put(Urls.MGR_DRAFT_SAVE, postData)
            await requestData.then((res) => {
                message.success("草稿箱保存成功")
                props.history.push("/manager/draftListManage")
                // console.log(res, "草稿箱callback")
            })
        }
    }

    //应用预览
    const changePreview = () => {
        preTagHandle()
        let postData = JSON.parse(JSON.stringify(formData))

        delete postData.file_list
        delete postData.groupDom_list
        delete postData.tagDom_list
        delete postData.tagPre_list
        delete postData.initCount
        delete postData.tempVideoImage
        delete postData.group_full_list
        delete postData.group_text_list
        delete postData.tag_full_list
        delete postData.tag_text_list
        window.sessionStorage.setItem("formData", JSON.stringify(postData))

        window.open("/appDetailPreview")
        // props.history.push("/appDetailPreview")
    }

    //删除草稿
    function delDraft(contentId: string) {
        let deleteData = {
            content_id: contentId,
            record_type: "draft",
        }
        const resolveData = request.deleteMethod(Urls.MGR_DRAFT_DELETE + "/" + contentId, deleteData)
        resolveData.then((res: any) => {
            props.history.push("/manager/appListManage")
        })
    }

    function fire() {
        form.setFieldsValue({
            content_name: formData.content_name,
            product_type: formData.product_type,
            content_type: formData.content_type,
            publisher: formData.publisher,
            version: formData.version,
            tag_id_list: formData.tag_text_list,
            group_id_list: formData.group_text_list,
            description: formData.description,
            product_info: formData.product_info,
            phone: formData.support_info.phone,
            email: formData.support_info.email,
        })
    }

    const testSet = (e: any) => {
        console.log(e.data, "newForm")
        console.log(e.list, "newForm")

        form.setFieldsValue({
            content_name: e.data.content_name,
            product_type: e.data.product_type,
            content_type: e.data.content_type,
            publisher: e.data.publisher,
            version: e.data.version,
            tag_id_list: e.data.tag_id_list,
            group_id_list: e.data.group_id_list,
            description: e.data.description,
            product_info: e.data.product_info,
            phone: e.data.support_info.phone,
            email: e.data.support_info.email,
        })

        formData = e.data
        previewList = e.list
        setFormData({ ...formData })
        setPreviewList([...previewList])
        console.log(previewList, "testSuccess")
        console.log(formData, "testSuccess")
    }

    return (
        <div className="rootMount">
            {init ? (
                <Form form={form} className="form-block" name="validate_other" {...formItemLayout} size="middle">
                    <Card
                        title={
                            <div>
                                <span>基本信息</span>
                                <span className="card-small-title">应用名称保存草稿箱或发布之后，将无法修改</span>
                            </div>
                        }>
                        <Row>
                            <Col className="gutter-row" span={12}>
                                <Form.Item
                                    className="form-group"
                                    label="应用名称"
                                    name="content_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入应用名称",
                                        },
                                        { pattern: new RegExp(/^[-\w\-s\-S\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                                    ]}>
                                    <Input id="contentName" className="form-group-input" placeholder="请输入应用名称" maxLength={50} onBlur={InputOnChange} name="content_name" disabled={contentNameStatus} defaultValue={formData.content_name} />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item className="form-group" label="分类" name="product_type" rules={[{ required: true, message: "请选择应用分类" }]}>
                                    <Select
                                        id="productType"
                                        placeholder="请选择应用分类"
                                        defaultValue={formData.product_type}
                                        value={formData.product_type}
                                        onChange={(e) => {
                                            SelectProductOnChange(e, 0)
                                        }}>
                                        <Select.Option value="any_share_cloud">AnyShare Cloud</Select.Option>
                                        <Select.Option value="any_backup_cloud">AnyBackup Cloud</Select.Option>
                                        <Select.Option value="any_robot_cloud">AnyRobot Cloud</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item className="form-group" label="服务类别" name="content_type" rules={[{ required: true, message: "请选择服务类别" }]}>
                                    <Select
                                        id="contentType"
                                        placeholder="请选择服务类别"
                                        defaultValue={formData.content_type}
                                        value={formData.content_type}
                                        onChange={(e) => {
                                            SelectProductOnChange(e, 1)
                                        }}>
                                        <Select.Option value="application">应用</Select.Option>
                                        <Select.Option value="service">服务方案</Select.Option>
                                        <Select.Option value="solution">解决方案</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col className="gutter-row" span={12}>
                                <Form.Item
                                    className="form-group"
                                    label="作者"
                                    name="publisher"
                                    rules={[
                                        { required: true, message: "请输入作者名称" },
                                        { pattern: new RegExp(/^[-\w\-s\-S\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                                    ]}>
                                    <Input className="form-group-input" placeholder="请输入作者名称" maxLength={50} name="publisher" onBlur={InputOnChange} defaultValue={formData.publisher} value={formData.publisher} />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item
                                    className="form-group"
                                    label="版本号"
                                    name="version"
                                    rules={[
                                        { required: true, message: "请输入版本号" },
                                        { pattern: new RegExp(/^[-\w\-s\-S\u4E00-\u9FA5\uF900-\uFA2D\.]*$/, "g"), message: "不允许输入非法字符" },
                                    ]}>
                                    <Input className="form-group-input" placeholder="请输入版本号" maxLength={10} name="version" defaultValue={formData.version} value={formData.version} onBlur={InputOnChange} />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item className="form-group" label="标签" name="tag_id_list" rules={[{ required: true, message: "请选择标签" }]}>
                                    <Select mode="multiple" style={{ width: "100%" }} placeholder="请选择标签" onChange={selectTagHandleChange} onSearch={selectTagHandleSearch}>
                                        {formData.tagDom_list}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item className="form-group" label="分类" name="group_id_list" rules={[{ required: true, message: "请选择分类" }]}>
                                    <Select mode="multiple" style={{ width: "100%" }} placeholder="请选择分类" onChange={selectGroupHandleChange}>
                                        {formData.groupDom_list}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={24}>
                                <Form.Item className="form-group label-resize" name="description" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} label="应用简介" rules={[{ required: true, message: "请输入应用简介" }]}>
                                    <TextArea className="form-group-textarea" placeholder="请输入应用简介" name="description" maxLength={100} value={formData.description} onBlur={InputOnChange} style={{ height: "60px" }} />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={24}>
                                <Form.Item className="form-group label-resize" name="product_info" label="详细介绍" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} rules={[{ required: true, message: "请输入详细介绍" }]}>
                                    <TextArea className="form-group-textarea" placeholder="请输入详细介绍" name="product_info" maxLength={1000} value={formData.product_info} onBlur={InputOnChange} style={{ height: "100px" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="服务与支持" style={{ marginTop: 16 }}>
                        <Form.Item
                            className="form-group"
                            label="联系电话"
                            labelCol={{ span: 2 }}
                            name="phone"
                            wrapperCol={{ span: 8 }}
                            rules={[
                                { required: true, message: "请输入联系电话" },
                                {
                                    pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
                                    message: "请输入正确的联系电话!",
                                },
                            ]}>
                            <Input id="tel" className="form-group-input" placeholder="请输入联系电话" name="phone" defaultValue={formData.support_info.phone} onBlur={objectOnChange} />
                        </Form.Item>
                        <Form.Item className="form-group" label="服务邮箱" labelCol={{ span: 2 }} name="email" wrapperCol={{ span: 8 }} rules={[{ required: true, message: "请输入服务邮箱", type: "email" }]}>
                            <Input className="form-group-input" placeholder="请输入服务邮箱" name="email" defaultValue={formData.support_info.email} onBlur={objectOnChange} />
                        </Form.Item>
                        {/* <Form.Item className="form-group label-resize" label="服务与支持" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                            <TextArea className="form-group-TextArea" placeholder="请输入服务与支持信息" style={{ height: "100px" }} />
                        </Form.Item> */}
                    </Card>
                    <Card
                        title={
                            <div>
                                <span>文件上传</span>
                                <span className="card-small-title">图片支持 png / jpg / jpeg logo推荐140*140 视频支持 mp4 </span>
                            </div>
                        }
                        style={{ marginTop: 16 }}>
                        <Form.Item className="form-group label-resize" label="LOGO上传" labelCol={{ span: 2 }}>
                            {/* <Button id="picker" type="dashed" className="upload-btn">
                            <PictureOutlined className="upload-icon" />
                        </Button> */}
                            {/* <span id="picker">
                            <PictureOutlined className="upload-icon" />
                        </span> */}
                            <WebuploaderCreate
                                id="webUploadOne"
                                pickerClass="logoPicker"
                                type="logo"
                                uploadType="image"
                                successUrl={formData.logo_url}
                                uploadResult={uploadResult}
                                SetNewFile={(e: any, msg: any) => {
                                    console.log(msg, "setNewFile")
                                }}>
                                <PictureOutlined className="upload-icon" />
                            </WebuploaderCreate>

                            {/* <Progress className="progress-circle" width={60} type="circle" percent={preData.uploadProgress} /> */}
                        </Form.Item>
                        {/* <Form.Item className="form-group label-resize" label="缩略图上传" labelCol={{ span: 2 }}>
                            <WebuploaderCreate
                                pickerClass="thumbnailsPicker"
                                type="thumbnails"
                                uploadType="image"
                                successUrl={formData.thumbnail_url}
                                uploadResult={uploadResult}
                                SetNewFile={(e: any, msg: any) => {
                                    console.log(msg, "setNewFile")
                                }}>
                                <PictureOutlined className="upload-icon" />
                            </WebuploaderCreate>
                        </Form.Item> */}
                        <Form.Item className="form-group label-resize" label="文件上传" labelCol={{ span: 2 }}>
                            <WebuploaderCreate
                                id="webUploadTwo"
                                type="file"
                                uploadType="file"
                                pickerClass="filePicker"
                                successUrl={formData.file_list[0].file_name}
                                uploadResult={uploadResult}
                                SetNewFile={(e: any, msg: any) => {
                                    console.log(msg, "setNewFile")
                                }}>
                                <FileAddOutlined className="upload-icon" />
                            </WebuploaderCreate>
                            {/* <Button type="dashed" className="upload-btn">
                            <FileAddOutlined className="upload-icon" />fileName
                        </Button> */}
                        </Form.Item>
                        <Form.Item className="form-group" label="预览类型" labelCol={{ span: 2 }}>
                            <Radio.Group id="radioGroup" options={plainOptions} onChange={onChangeRadio} value={uploadType} />
                        </Form.Item>
                        <Form.Item className="form-group1" label="选择预览信息" valuePropName="fileList" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                            {uploadType == "image" ? (
                                <WebuploaderCreate id="webUploadThree" className="webUploader" OtherFileNameCheck={otherFileNameCheck} type="otherFile" uploadType={uploadType} pickerClass="otherFilePicker" SetUploadStatus={uploadStatusSet} WatchUploadStatus={uploadStatusWatch} SetNewFile={otherFileUploader} uploadResult={uploadResult} ref={(r: any) => setChildFuntion(r)}>
                                    <UploadOutlined />
                                    上传图片
                                </WebuploaderCreate>
                            ) : (
                                <div className="flex videoFlex">
                                    <div style={{ marginRight: "20px" }}>
                                        <WebuploaderCreate
                                            id="webUploadA"
                                            key={reloadKey}
                                            pickerClass="tempVideoImage"
                                            type="videoImage"
                                            uploadType="image"
                                            SetUploadStatus={uploadStatusSet}
                                            WatchUploadStatus={uploadStatusWatch}
                                            successUrl={formData.tempVideoImage}
                                            uploadResult={uploadResult}
                                            SetNewFile={(e: any, msg: any) => {
                                                console.log(msg, "setNewFile")
                                            }}>
                                            <UploadOutlined />
                                            上传视频封面
                                        </WebuploaderCreate>
                                    </div>
                                    <div>
                                        <WebuploaderCreate id="webUploadOther" type="otherFileVideo" uploadType={uploadType} pickerClass="otherFilePicker1" OtherFileNameCheck={otherFileNameCheck} SetUploadStatus={uploadStatusSet} WatchUploadStatus={uploadStatusWatch} SetNewFile={otherFileUploader} uploadResult={uploadResult} ref={(r: any) => setChildFuntion(r)}>
                                            <UploadOutlined />
                                            上传视频
                                        </WebuploaderCreate>
                                    </div>
                                    {/* <WebuploaderCreate type="otherFile" uploadType={uploadType} pickerClass="otherFilePicker" SetNewFile={otherFileUploader} uploadResult={uploadResult} ref={(r: any) => setChildFuntion(r)}>
                                        <UploadOutlined />
                                        上传视频封面
                                    </WebuploaderCreate>
                                    <WebuploaderCreate type="otherFile" uploadType={uploadType} pickerClass="otherFilePicker1" SetNewFile={otherFileUploader} uploadResult={uploadResult} ref={(r: any) => setChildFuntion(r)}>
                                        <UploadOutlined />
                                        上传视频
                                    </WebuploaderCreate> */}
                                </div>
                            )}
                            {/* <WebuploaderCreate className="webUploader" type="otherFile" uploadType={uploadType} pickerClass="otherFilePicker" SetNewFile={otherFileUploader} uploadResult={uploadResult} ref={(r: any) => setChildFuntion(r)}>
                                <UploadOutlined />
                                上传预览信息
                            </WebuploaderCreate> */}

                            <Table id="previewTable" className="otherFileTable" rowKey="indexId" pagination={false} columns={columnsReally} dataSource={previewList}></Table>

                            {/* <Button>
                            <UploadOutlined /> 上传附件
                        </Button> */}
                            {/* <List
                                className="fileList"
                                itemLayout="horizontal"
                                dataSource={fileListData}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <span>
                                                <span
                                                    style={{ cursor: "pointer", marginRight: "20px" }}
                                                    onClick={() => {
                                                        setShowModalState(true)
                                                        setShowModalSrc(item.objectUrl)
                                                    }}>
                                                    查看
                                                </span>
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        reloadCheck(item.title)
                                                    }}>
                                                    删除
                                                </span>
                                            </span>,
                                        ]}>
                                        <List.Item.Meta avatar={<Avatar icon={item.type === "image" ? <PictureOutlined /> : <VideoCameraAddOutlined />} />} title={<div>{item.title}</div>} description={<Progress className="fileList-progress" percent={item.progress} />} />
                                    </List.Item>
                                )}
                            /> */}
                        </Form.Item>
                    </Card>
                    <Row justify="start" style={{ marginTop: 40 }}>
                        <Col>
                            <Form.Item>
                                <Space size="small">
                                    <Button
                                        id="previewButton"
                                        onClick={(e) => {
                                            formValidateFields("changePreview")
                                        }}
                                        type="primary">
                                        预览
                                    </Button>
                                    <Button
                                        id="draftSaveButton"
                                        type="primary"
                                        onClick={(e) => {
                                            draftSave()
                                        }}>
                                        保存草稿
                                    </Button>
                                    <Button
                                        id="releaseButton"
                                        type="primary"
                                        htmlType="submit"
                                        onClick={(e) => {
                                            formValidateFields("release")
                                        }}>
                                        发布
                                    </Button>
                                    {/* <Button type="primary" htmlType="submit" onClick={statusUpdate} danger>
                                        下架
                                    </Button> */}
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Modal
                        title="图片"
                        visible={showModalState}
                        footer={null}
                        onCancel={() => {
                            setShowModalState(false)
                        }}>
                        <img style={{ width: "100%" }} src={showModalSrc} />
                    </Modal>
                    <input className="formDataInput" id="formDataInput" type="hidden" value={formData} />
                </Form>
            ) : (
                ""
            )}
            <input
                id="testInput"
                type="hidden"
                onClick={(e) => {
                    testSet(e)
                }}
            />
        </div>
    )
}
export default AppDetailAction
