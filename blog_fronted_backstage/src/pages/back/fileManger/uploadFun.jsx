import React, { Component } from "react"
import { Button, Progress, message, notification } from "antd"
import WebUploader from "webuploader"
// import "@/assets/css/back/appDetailAction.less"

//图片展示
import ImageShower from "./imageShower"

//axios共通
import * as Urls from "../../../api/urls"
import request from "../../../api/baseApi"
var fileInfo
//webUpload部分
export default class WebuploaderCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            upload_id: "",
            ETagArr: [],
            uploadStatus: false,
            key: "",
            file_type: "",
            uploadProgress: 0,
            progressStatus: "normal",
            progreeShow: false,
            pickerObject: {},
            otherFileType: "",
            uploadImageUrl: "",
            uploadFileUrl: "",
            uploadOver: false,
            fileName: "",
        }
    }

    componentDidMount() {
        console.log(this.props.uploadType, "this.props.uploadTypethis.props.uploadType")
        //初始化
        this.register()
        this.setState({
            otherFileType: this.props.uploadType,
        })

        if (this.props.uploadType == "file") {
            if (this.props.successUrl != undefined && this.props.successUrl != null && this.props.successUrl != "") {
                this.setState({
                    fileName: this.props.successUrl,
                    progreeShow: true,
                    uploadOver: true,
                    uploadProgress: 100,
                    progressStatus: "success",
                })
            }
        } else {
            if (this.props.successUrl != undefined && this.props.successUrl != null && this.props.successUrl != "") {
                this.setState({
                    uploadImageUrl: this.props.successUrl,
                    progreeShow: true,
                    uploadOver: true,
                    uploadProgress: 100,
                    progressStatus: "success",
                })
            }
        }
    }

    register = () => {
        let _this = this
        WebUploader.Uploader.register(
            {
                "before-send": "beforeSend", //每个分片上传前
            },
            {
                beforeSend: function (block) {},
            }
        )
        // var task_id = WebUploader.Base.guid() // 产生文件唯一标识符task_id

        //uploader初始化
        let temp = _this.state.pickerObject
        //限制图片大小，不可上传超过5MB
        if (_this.props.uploadType === "image") {
            temp[_this.props.pickerClass] = WebUploader.create({
                swf: "./static/webuploader/Uploader.swf",
                server: Urls.IP_CONFIG + Urls.UPLOAD_PART, // 上传分片地址
                pick: { id: "." + this.props.pickerClass, multiple: false },
                auto: false, // 是否选择完即上传
                chunked: true,
                chunkSize: 5 * 1024 * 1024,
                chunkRetry: 3,
                method: "POST",
                fileSingleSizeLimit: 5 * 1024 * 1024,
                threads: 1,
                fileVal: "upload_file",
                chunkRetry: 2, //如果某个分片由于网络问题出错，允许自动重传次数
                duplicate: true, // 不允许重复上传
            })
        } else {
            temp[_this.props.pickerClass] = WebUploader.create({
                swf: "./static/webuploader/Uploader.swf",
                server: Urls.IP_CONFIG + Urls.UPLOAD_PART, // 上传分片地址
                pick: { id: "." + this.props.pickerClass, multiple: false },
                auto: false, // 是否选择完即上传
                chunked: true,
                chunkSize: 5 * 1024 * 1024,
                chunkRetry: 3,
                method: "POST",
                threads: 1,
                fileVal: "upload_file",
                chunkRetry: 2, //如果某个分片由于网络问题出错，允许自动重传次数
                duplicate: true, // 不允许重复上传
            })
        }

        _this.setState({
            pickerObject: temp,
        })
        //错误收集
        _this.state.pickerObject[_this.props.pickerClass].on("error", function (type) {
            if (type == "Q_EXCEED_SIZE_LIMIT" || type == "F_EXCEED_SIZE") {
                notification.error({
                    description: type,
                    message: "图片上传不可超过5MB，请重新上传",
                    placement: "bottomRight",
                })
            } else {
                notification.error({
                    description: type,
                    message: "系统错误，请稍后再试",
                    placement: "bottomRight",
                })
            }
        })

        //文件队列 (点击"选择文件"按钮)
        _this.state.pickerObject[_this.props.pickerClass].on("fileQueued", function (file) {
            console.log(file, "testFiletestFiletestFiletestFiletestFiletestFile")
            if (_this.props.type === "otherFile" || _this.props.type === "otherFileVideo") {
                let temp = false
                let tempFileName = false
                tempFileName = _this.props.OtherFileNameCheck(file.name)
                if (!tempFileName) {
                    return false
                } else {
                    temp = _this.props.WatchUploadStatus()
                    if (!temp) {
                        return false
                    }
                }
            }

            //文件后缀名检测
            //文件类型
            let fileType = file.name
            let regResult = false
            if (_this.state.otherFileType === "image") {
                let reg = /\.(png|jpg|jpeg|webp)$/
                regResult = reg.test(fileType)
            } else if (_this.state.otherFileType === "video") {
                let reg = /\.(mp4)$/
                regResult = reg.test(fileType)
            } else {
                regResult = true
            }

            //如果是type是附件，需要传递将文件信息传递给父组件
            if (regResult) {
                fileInfo = file
                if (_this.props.uploadType == "file") {
                    console.log(fileInfo.name, "当前文件名")
                    _this.setState({
                        fileName: fileInfo.name,
                    })
                }
                if (_this.props.type === "otherFile" || _this.props.type === "otherFileVideo") {
                    _this.props.SetNewFile("fileData", fileInfo)
                    _this.uploadInit()
                } else {
                    //显示进度条
                    _this.setState({
                        progreeShow: true,
                        uploadOver: false,
                    })
                    _this.uploadInit()
                }
            } else {
                if (_this.props.type === "otherFile" || _this.props.type === "otherFileVideo") {
                    _this.props.SetUploadStatus(false)
                }
                _this.state.pickerObject[_this.props.pickerClass].removeFile(file)
                message.error("文件类型有误请重新选择")
            }
        })

        //加入队列之前，初始化参数
        _this.state.pickerObject[_this.props.pickerClass].on("beforeFileQueued", function (file) {
            file.formData = {
                upload_id: _this.state.upload_id,
            }
        })

        //开始上传时，调用该方法
        // _this.state.pickerObject[_this.props.pickerClass].on("startUpload", function (file) {})

        //计算上传文件百分比
        _this.state.pickerObject[_this.props.pickerClass].on("uploadProgress", function (file, percentage) {
            //如果是type是附件，需要传递将进度条的数值传递给父组件
            if (_this.props.type === "otherFile" || _this.props.type === "otherFileVideo") {
                _this.props.SetNewFile("uploadProgress", Math.floor(percentage * 100 - 1), fileInfo.name)
            }
            // _this.props.ChangeProgress("uploadProgress", Math.floor(percentage * 100 - 1))
            _this.setState({
                uploadProgress: Math.floor(percentage * 100 - 1),
            })
        })

        // 整个文件的所有分片都上传成功后，调用该方法
        _this.state.pickerObject[_this.props.pickerClass].on("uploadSuccess", async function (file, res) {
            //调用upload_complete,合并上传的分片
            let dataJson = {
                file_name: file.name,
                upload_id: _this.state.upload_id,
                key: _this.state.key,
                file_extra: _this.state.file_type,
                file_size: file.size,
                part_info: {
                    Parts: _this.state.ETagArr,
                },
            }
            // request.post(Urls.IP_CONFIG2 + Urls.UPLOAD_COMPLETE, dataJson, _this.uploadComplete)
            const requestData = request.post(Urls.UPLOAD_COMPLETE, dataJson)
            await requestData.then((res) => {
                _this.uploadComplete(res)
            })
        })

        // 上传过程中发生异常，调用该方法
        _this.state.pickerObject[_this.props.pickerClass].on("uploadError", function (file) {
            message.error("上传失败，网络不稳定，请稍后再试")
        })

        // 上传结束，无论文件最终是否上传成功，该方法都会被调用
        // _this.state.pickerObject[_this.props.pickerClass].on("uploadComplete", function (file) {})

        //上传回调
        _this.state.pickerObject[_this.props.pickerClass].on("uploadAccept", function (re, res) {
            if (typeof res.detail.ETag != "undefined") {
                //每个分片的回调，需要保存住ETag，和PartNumber,complete需要入力
                let arr = _this.state.ETagArr
                let temp = res.detail.ETag.slice(1, -1)
                let numTemp = res.detail.PartNumber
                let jsonData = {
                    PartNumber: numTemp,
                    ETag: temp,
                }
                arr.push(jsonData)
                _this.setState({
                    ETagArr: arr,
                })
            }
        })
    }

    uploadType = (type) => {
        let _this = this
        _this.setState({
            otherFileType: type,
        })
    }

    //初始化文件上传
    uploadInit = async () => {
        let _this = this
        //清空ETag数组
        _this.setState({
            ETagArr: [],
        })
        //上传初始化
        let dataJson = {
            file_name: fileInfo.name,
            file_size: fileInfo.size,
            file_type: this.state.otherFileType,
        }
        const requestData = request.post(Urls.UPLOAD_INIT, dataJson, this.uploadWork)
        await requestData.then((res) => {
            this.uploadWork(res)
        })
    }

    //分片上传
    uploadWork = (res) => {
        let _this = this
        //储存upload_id
        this.setState({
            upload_id: res.upload_id,
            key: res.key,
            file_type: res.file_extra,
            file_size: fileInfo.size,
        })
        _this.state.pickerObject[_this.props.pickerClass].options.formData.upload_id = res.upload_id
        _this.state.pickerObject[_this.props.pickerClass].options.formData.key = res.key
        //如果该问卷小于5MB不需要分片，手动添加参数chunk：0给后台
        if (fileInfo.size < 5 * 1024 * 1024) {
            _this.state.pickerObject[_this.props.pickerClass].options.formData.chunk = 0
        }
        // //更改上传状态
        _this.setState({
            uploadStatus: true,
        })
        //开始上传
        _this.state.pickerObject[_this.props.pickerClass].upload()
    }

    //上传片段合并
    uploadComplete = (res) => {
        console.log(res, "chenggong")
        let _this = this
        //判断合并是否成功
        //如果是type是附件，需要传递将进度条的数值传递给父组件
        if (_this.props.type === "otherFile" || _this.props.type === "otherFileVideo") {
            _this.props.SetNewFile("uploadProgress", 100, fileInfo.name, res.objectUrl)
            _this.props.SetUploadStatus(false)
        } else if (_this.props.type === "file") {
            //修改进度条的数值 预览图
            this.setState({
                uploadProgress: 100,
                progressStatus: "success",
                uploadOver: true,
                uploadFileUrl: res.objectUrl,
                // fileName: fileInfo.name,
            })
        } else {
            this.setState({
                uploadProgress: 100,
                progressStatus: "success",
                uploadOver: true,
                uploadImageUrl: res.objectUrl,
            })
        }
        //上传成功，传值回详情页(文件类型,上传类型,key,file_url)
        _this.props.uploadResult(_this.props.type, _this.props.uploadType, res.fileId, res.objectUrl)
        // } else {
        //     this.setState({
        //         progressStatus: "exception",
        //     })
        // }
    }

    //文件下载
    download = (url) => {
        const oa = document.createElement("a")
        oa.href = this.state.uploadFileUrl
        oa.setAttribute("target", "_blank")
        document.body.appendChild(oa)
        oa.click()
    }

    //重新下载
    uploadAgain = () => {
        this.setState({
            uploadOver: false,
            progreeShow: false,
            progressStatus: "normal",
            uploadProgress: 0,
        })
    }

    render() {
        let _this = this
        let result
        if (this.props.type === "otherFile" || this.props.type === "otherFileVideo") {
            result = (
                <div>
                    <input id="hope" type="hidden" value={this.state.pickerObject[this.props.pickerClass]} />
                    <div className={`otherFile ${this.props.pickerClass}`}>{this.props.children}</div>
                </div>
            )
        } else if (this.props.type === "file") {
            result = (
                <div>
                    <input id="hope" type="hidden" value={this.state.pickerObject[this.props.pickerClass]} />
                    <span className={`picker ${this.state.uploadOver ? "hide " : ""} ${this.props.pickerClass}`}>{this.props.children}</span>
                    <div className={!this.state.uploadOver ? "hide" : ""} style={{ float: "left", marginRight: "20px", height: "100px", lineHeight: "100px" }}>
                        <span>{this.state.fileName}</span>
                        {/* <Button id="downLoadButton" style={{ marginLeft: "20px" }} onClick={this.download} type="primary">
                            下载
                        </Button> */}
                        <Button id="uploadAgainButton" style={{ marginLeft: "20px" }} onClick={this.uploadAgain} type="primary">
                            重新上传
                        </Button>
                    </div>
                    {this.state.progreeShow ? <Progress className="progress-circle" style={{ lineHeight: "100px" }} width={60} type="circle" percent={this.state.uploadProgress} status={this.state.progressStatus} /> : ""}
                </div>
            )
        } else if (this.props.type === "videoImage") {
            result = (
                <div>
                    <input id="hope" type="hidden" value={this.state.pickerObject[this.props.pickerClass]} />
                    <span className={`otherFile ${this.state.uploadOver ? "hide " : ""}${this.props.pickerClass}`}>{this.props.children}</span>
                    <span className={!this.state.uploadOver ? "hide" : ""}>
                        <ImageShower uploadAgain={this.uploadAgain} src={this.state.uploadImageUrl} />
                    </span>
                    {this.state.progreeShow ? <Progress className="progress-circle" style={{ lineHeight: "100px" }} width={60} type="circle" percent={this.state.uploadProgress} status={this.state.progressStatus} /> : ""}
                </div>
            )
        } else {
            result = (
                <div>
                    <input id="hope" type="hidden" value={this.state.pickerObject[this.props.pickerClass]} />
                    <span className={`picker ${this.state.uploadOver ? "hide " : ""}${this.props.pickerClass}`}>{this.props.children}</span>
                    <span className={!this.state.uploadOver ? "hide" : ""}>
                        <ImageShower uploadAgain={this.uploadAgain} src={this.state.uploadImageUrl} />
                    </span>
                    {this.state.progreeShow ? <Progress className="progress-circle" style={{ lineHeight: "100px" }} width={60} type="circle" percent={this.state.uploadProgress} status={this.state.progressStatus} /> : ""}
                </div>
            )
        }
        return result
    }
}
