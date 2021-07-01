import React, { useState, useEffect } from "react"
import "@/assets/css/front/appDetail.less"
import { Row, Col, Button, Tabs, Result } from "antd"
import until from "../../until/until"
//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
//图片轮播
import Swiper from "./swpierComponent"

const { TabPane } = Tabs
const { NavLink } = require("react-router-dom")

export default function AppDetail(props: any) {
    //定义本页数据
    let dataGroup = {
        content_id: "",
        content_name: "",
        content_type: 1,
        created_date: "",
        file_size: "",
        description: "",
        logo_url: "",
        preview_media_urls: { value: [] },
        product_info: "",
        product_type: "",
        publisher: "ys",
        record_id: "",
        support_info: {
            phone: "",
            email: "",
        },
        version: "1.0.0",
        tag_id_list: [],
        count: 0,
        release_date: "",
    }

    const [appData, setAppData] = useState(dataGroup)
    const [otherAppShow, setOtherAppShow] = useState(false)
    const [swiperShow, setSwiperShow] = useState(true)
    const [offline, setOffline] = useState(false)
    //页面初始化
    useEffect(() => {
        //是否是预览页面
        if (props.location.pathname === "/appDetailPreview") {
            preview()
        } else {
            detailSearch()
        }
    }, [props])

    const [downloadShow, setDownloadShow] = useState(true)
    //预览跳转
    async function preview() {
        let tempString: any = window.sessionStorage.getItem("formData")
        let tempJson = JSON.parse(tempString)
        let temp = { ...appData, ...tempJson }
        temp.tag_id_list = tempJson.tag_id_list_pre
        setAppData(temp)
        setOtherAppShow(false)
        setDownloadShow(false)
        setSwiperShow(true)
    }

    //应用详情

    async function detailSearch() {
        console.log("走到了detailSearch")
        let recordId = props.match.params.recordId
        let url = Urls.USER_CONTENT_DETAILS + "/" + recordId
        const detailSearchData = request.get(url, "")
        await detailSearchData
            .then(async (res: any) => {
                console.log(JSON.stringify(res), "detaileSearch回调")
                await termTagGet(res.contents)
                await setRecord(res.contents.record_id)
                // await termTagGet(res.contents.record_id)
                // await publisherOtherAppGet(res.contents.publisher)
                // setAppData({ ...appData, ...res.contents })
            })
            .catch((err) => {
                if (err.response.data.code == 109) {
                    setOffline(true)
                }
                console.log(err.response, "我的我的")
            })
    }
    function back() {
        props.history.goBack()
    }

    const [record, setRecord] = useState("")
    async function download() {
        //判断他是否登录过
        if (window.localStorage.getItem("x-Userid") === undefined || window.localStorage.getItem("x-Userid") === null || window.localStorage.getItem("x-Userid") === "") {
            window.location.href = Urls.IP_CONFIG + Urls.USER_LOGIN + "?url_path=1"
        } else {
            let url = Urls.FILE_DOWNLOAD + "/" + record
            const fileDownLoadGetData = request.get(url, "")
            await fileDownLoadGetData.then((res: any) => {
                let downLoadUrl = res.download_url_list
                const oa = document.createElement("a")
                oa.href = downLoadUrl
                // oa.href = `http://stg-aiproj-fap.oss-cn-shanghai.aliyuncs.com/AI_tts_sound%2F20200422021924B7VYKbwP.mp3`
                oa.setAttribute("target", "_blank")
                document.body.appendChild(oa)
                oa.click()
            })
        }
    }
    //该作者的其他应用
    let otherContentList = [
        {
            created_date: "2020-06-28T17:04:15.061743",
            content_id: "c0ab3f50f85943d18a2f8468daad1ab0",
            record_id: "bd219f70879f4acdb866bdabdebf706c",
            reversion: "536b4d0826fd47909edba8ea654a3e26",
            record_type: "publish",
            product_type: null,
            content_name: "adadadadasd",
            publisher: null,
            description: null,
            content_type: null,
            version: null,
            thumbnail_url: null,
            sort_key: 0,
            delete_flg: 0,
        },
    ]
    const [otherContent, setOtherContent] = useState(otherContentList)
    async function publisherOtherAppGet(detailRes: any) {
        let data = { publisher: detailRes.publisher }
        let url = Urls.USER_CONTENTS + "/"
        const publisherOtherData = request.get(url, data)
        await publisherOtherData.then((res: any) => {
            console.log(res.contents.length, "publisherOtherAppCallBack")
            if (res.contents.length < 2) {
                setOtherAppShow(false)
            } else {
                setOtherAppShow(true)
            }
            setOtherContent([...res.contents])
            setAppData({ ...appData, ...detailRes })
        })
    }
    //获取标签
    async function termTagGet(detailRes: any) {
        console.log("走到了termTagGet")
        let url = Urls.USER_TERMS + "/tag/" + detailRes.record_id
        const termTagGetData = request.get(url, "")
        await termTagGetData.then((res: any) => {
            console.log(res, "termTagCallBack")
            console.log(appData, "adadadadaqeqee1313131313131")
            appData.tag_id_list = res.relations.terms
            // setAppData({ ...appData })
            publisherOtherAppGet(detailRes)
        })
    }
    //tagLink跳转
    function tagLink(tag: string) {
        window.sessionStorage.setItem("tag", tag)
        props.history.push("/searchList/" + appData.product_type + "?tag=" + tag)
    }
    return (
        <div>
            <div className="top-header">
                <div className="top-content">
                    <div className="back-icon" style={{ cursor: "pointer" }} onClick={back}>
                        {downloadShow ? <img className="img-style" src={require("@/assets/images/back-icon.png")} /> : ""}
                        <span>{downloadShow ? "返回" : ""}</span>
                    </div>

                    <div className="back-logo">{appData.product_type == "any_backup_cloud" ? <img className="img-style img-top" src={require("@/assets/images/anyBackup1.png")} /> : appData.product_type == "any_share_cloud" ? <img className="img-style img-top" src={require("@/assets/images/anyshare1.png")} /> : appData.product_type == "any_robot_cloud" ? <img className="img-style img-top" src={require("@/assets/images/anyRobot1.png")} /> : ""}</div>
                    <div className="back-icon"></div>
                </div>
            </div>
            {!offline ? (
                <div className="detail-block">
                    <Row className="top-block">
                        <Col span={5}>
                            <img className="img-style" src={appData.logo_url} />
                        </Col>
                        <Col className="app-detail" span={13}>
                            <div className="app-name">{appData.content_name}</div>
                            <div className="app-publisher">
                                <span className="app-user-icon">
                                    <img src={require("@/assets/images/user-icon.png")} />
                                </span>
                                {appData.publisher}
                            </div>
                            <div className="app-description">{appData.description}</div>
                        </Col>
                        <Col className="download-block" span={6}>
                            {downloadShow ? (
                                <Button id="downLoadBtn" className="download-btn" onClick={download}>
                                    下载
                                </Button>
                            ) : (
                                ""
                            )}
                        </Col>
                    </Row>
                    <Row className="mid-block">
                        <Col className="mid-left" span={16}>
                            {swiperShow ? <Swiper postData={appData.preview_media_urls.value}></Swiper> : ""}
                        </Col>
                        <Col span={8} className="mid-right">
                            <div className="text">
                                <span>名称：</span>
                                {appData.content_name}
                            </div>
                            <div className="text">
                                <span>发布者：</span>
                                {appData.publisher}
                            </div>
                            <div className="text">
                                <span>分类：</span>
                                {appData.content_type}
                            </div>
                            <div className="text">
                                <span>发布时间：</span>
                                {until.dateFormat(Number(appData.release_date), "Y-m-d")}
                            </div>
                            <div className="text">
                                <span>发布版本：</span>
                                {appData.version}
                            </div>
                            <div className="text">
                                <span>下载量：</span>
                                {appData.count}
                            </div>
                            <div className="text">
                                <span>文件大小：</span>
                                {Number(appData.file_size) / 1024 > 1 ? (Number(appData.file_size) / 1024).toFixed(0) + "M" : "小于0.1M"}
                            </div>
                        </Col>
                    </Row>
                    <Tabs className="tab-block" defaultActiveKey="1">
                        <TabPane tab="产品信息" key="1">
                            <div>{appData.product_info}</div>
                        </TabPane>
                        <TabPane tab="支持" key="2">
                            <div>电话：{appData.support_info.phone}</div>
                            <div>邮箱：{appData.support_info.email}</div>
                        </TabPane>
                    </Tabs>
                    <div className="other-block">
                        {otherAppShow ? (
                            <div>
                                <div className="title">该作者的其他应用</div>
                                <div className="app-card-block">
                                    {otherContent.map((item: any, index) =>
                                        index < 3 && item.content_name != appData.content_name ? (
                                            <div className="app-card">
                                                <div className="app-icon">
                                                    <NavLink to={{ pathname: "/appDetail/" + item.content_id }}>
                                                        <img className="app-img" src={item.thumbnail_url} />
                                                    </NavLink>
                                                </div>
                                                <div className="app-title">
                                                    <NavLink to={{ pathname: "/appDetail/" + item.content_id }}>{item.content_name}</NavLink>
                                                </div>
                                                <div className="app-publisher">
                                                    <span className="app-user-icon">
                                                        <img src={require("@/assets/images/user-icon.png")} />
                                                    </span>
                                                    {item.publisher}
                                                </div>
                                                <div className="app-description">{item.description}</div>
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {appData.tag_id_list.length != 0 ? (
                            <div className="tag-block">
                                <span className="tag-title">标签</span>
                                <span>|</span>

                                {appData.tag_id_list.map((item: any) => {
                                    return (
                                        <span
                                            className="tag-style"
                                            onClick={(e) => {
                                                tagLink(item.text)
                                            }}>
                                            {item.text}
                                        </span>
                                    )
                                })}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            ) : (
                <Result style={{ marginTop: "10%" }} status="warning" title="很抱歉，您查看的应用不存在，可能已下架或者被移除。" />
            )}
        </div>
    )
}
