import React, { useState, useEffect } from "react"
import { Row, Col, Input, Pagination, Form, notification } from "antd"
import "@/assets/css/front/searchList.less"

//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
import Until from "../../until/until"
const { NavLink } = require("react-router-dom")
let searchType: string
function ListContent(props: any) {
    let json = {
        contentText: "",
        count: 1,
        typeTitle: "All",
        slugSearch: "",
        page: 1,
        per_page: 10,
        pageTotal: 50,
        contentType: [
            // { text: "All", active: true },
            // { text: "AnyBackup CDM 7", active: false },
            // { text: "AnyVM 5", active: false },
            // { text: "AnyBackup Express 7", active: false },
            { term_id: "1111", slug: "", text: "All", description: "adads", product_type: "123123", content_type: "adsdad", active: true },
        ],
        contentList: [
            // {
            //     created_date: "2020-06-28T17:04:15.061743",
            //     content_id: "c0ab3f50f85943d18a2f8468daad1ab0",
            //     record_id: "bd219f70879f4acdb866bdabdebf706c",
            //     reversion: "536b4d0826fd47909edba8ea654a3e26",
            //     record_type: "publish",
            //     product_type: null,
            //     content_name: null,
            //     publisher: null,
            //     description: null,
            //     content_type: null,
            //     version: null,
            //     thumbnail_url: null,
            //     sort_key: 0,
            //     delete_flg: 0,
            // },
        ],
    }

    interface jsonInterFace {
        contentText: string
        count: number
        typeTitle: string
        slugSearch: string | null
        page: number
        per_page: number
        pageTotal: number
        contentType: {
            term_id: string
            slug: string
            text: string
            description: string
            product_type: string
            content_type: string
            active: boolean
        }[]
        contentList: {
            created_date: string
            content_id: string
            record_id: string
            reversion: string
            record_type: string | null
            product_type: string | null
            content_name: string | null
            publisher: string | null
            description: string | null
            content_type: number | null
            version: string | null
            thumbnail_url: string | undefined
            sort_key: number | null
            delete_flg: number | null
            logo_url: string | undefined
        }[]
    }
    //Hook
    const [dataJson, setJson] = useState<jsonInterFace>(json)
    const [dataStatus, setDataStatus] = useState<string>("加载中...")
    // const [searchType, setSearchType] = useState<string>(searchTypeClean(props.propData.match.params.search_type))
    //onLoad
    useEffect(() => {
        // searchType = searchTypeClean(props.propData.match.params.search_type)
        // groupInit()
        // userContents()
    }, [])
    useEffect(() => {
        console.log(props, "props")
        searchType = searchTypeClean(props.propData.match.params.search_type)
        dataJson.typeTitle = "All"
        awaitFun()
    }, [props])

    async function awaitFun() {
        console.log("几次?")
        await groupInit()
        let tag = Until.getQueryString(props.propData, "tag")
        if (tag != null && tag != "" && tag != "undefined") {
            dataJson.contentText = tag
            setJson({ ...dataJson })
            userContents(true)
        } else {
            dataJson.contentText = ""
            fire()
            await userContents()
        }
    }

    function searchTypeClean(data: string) {
        let result = ""
        if (data === "AnyBackup") {
            result = "any_backup_cloud"
        } else if (data === "AnyShare") {
            result = "any_share_cloud"
        } else if (data === "AnyRobot") {
            result = "any_robot_cloud"
        }
        return result
    }

    async function groupInit() {
        console.log("这里走到了用户标签组取得")
        let data = { page: 1, per_page: 10, product_type: searchType, content_type: props.tabData }
        const requestData = request.get(Urls.TERM_LIST + "/group", data)
        await requestData.then((res: any) => {
            console.log(res.terms, "requestDatarequestData")
            if (res.terms.length != 0) {
                // res.terms.map((item: any, index: number) => {
                //     console.log(item, "terms循环")
                //     if (index == 0) {
                //         item.active = true
                //         dataJson.typeTitle = item.text
                //     } else {
                //         item.active = false
                //     }
                // })

                // dataJson.typeTitle = dataJson.contentType[0].text
                let tempArr = [{ term_id: "1111", slug: "", text: "All", description: "adads", product_type: "123123", content_type: "adsdad", active: true }]
                dataJson.contentType = tempArr.concat(res.terms)
                // dataJson.contentType = res.terms
                // setJson({ ...dataJson })
            } else {
                dataJson.typeTitle = "All"
                dataJson.contentType = [{ term_id: "1111", slug: "", text: "All", description: "adads", product_type: "123123", content_type: "adsdad", active: true }]
            }
            console.log(dataJson.contentType, "11222")
            setJson({ ...dataJson })
        })
    }

    //用户一览检索
    const userContents = async (tag?: boolean) => {
        console.log("这里走到了用户一览检索", searchType)
        let groupSlug: string | null
        groupSlug = ""
        if (dataJson.typeTitle !== "All") {
            groupSlug = dataJson.slugSearch
        }
        let jsonData: any
        if (tag) {
            jsonData = {
                page: dataJson.page,
                per_page: dataJson.per_page,
            }
        } else {
            jsonData = {
                page: dataJson.page,
                per_page: dataJson.per_page,
                product_type: searchType,
                content_type: props.tabData,
                group_slug: groupSlug,
            }
        }

        console.log("gangangangagnagnang", jsonData)

        dataJson.contentText = dataJson.contentText.replace(/(^\s*)|(\s*$)/g, "")
        if (dataJson.contentText !== "") {
            jsonData.content_text = dataJson.contentText
        }

        let url = Urls.USER_CONTENTS
        // if (dataJson.typeTitle !== "All") {
        //     url = Urls.USER_CONTENTS + "/" + searchType + "/" + props.tabData + "/" + dataJson.typeTitle + "/"
        // } else {
        //     url = Urls.USER_CONTENTS + "/" + searchType + "/" + props.tabData + "/"
        // }
        const userContentsData = request.get(url, jsonData)
        await userContentsData.then((res: any) => {
            console.log(res, "这里是了用户一览检索的回调")
            dataJson.contentList = res.contents
            dataJson.pageTotal = res.count
            if (res.contents.length == 0) {
                setDataStatus("暂无数据")
            }
            setJson({ ...dataJson })
        })
    }

    const searchChange = (e: any) => {
        dataJson.contentText = e.target.value
        setJson({ ...dataJson })
    }

    //slugClick
    function clickType(obj: any) {
        let flag = 0
        dataJson.contentType.forEach((item: any) => {
            item.active = false
        })

        dataJson.contentType.forEach((item: any) => {
            if (item.text == obj.text) {
                dataJson.typeTitle = item.text
                dataJson.slugSearch = item.slug
                item.active = !item.active
                flag = 1
            }
        })

        if (flag === 0) {
            dataJson.typeTitle = ""
        }

        setJson({ ...dataJson })
        //加载数据
        userContents()
    }
    // perPageSize 改变
    const changePerpage = (current: number, size: number) => {
        dataJson.page = 1
        dataJson.per_page = size
        setJson({ ...dataJson })
        userContents()
    }

    //分页onchange
    function onChange(page: number, pageSize?: number) {
        console.log(page, "分页点击page")
        console.log(pageSize, "分页点击pageSize")
        dataJson.page = page
        setJson({ ...dataJson })
        userContents()
    }

    //详情跳转
    let detailLink = {
        path: "/appDetail",
    }

    //typeTitle
    // let typeTitle
    // dataJson.contentType.map((item) => {
    //     if (item.active) {
    //         typeTitle = <div className="type-block">{item.text}</div>
    //     }
    // })

    const [form] = Form.useForm()
    //表单验证
    const formValidateFields = () => {
        form.submit()
        form.validateFields()
            .then((values: any) => {
                userContents()
            })
            .catch((errorInfo: any) => {
                notification.error({
                    description: "请检查是否有参数不合法",
                    message: "参数验证不通过",
                    placement: "bottomRight",
                })
                console.log(errorInfo, "errorInfo")
                return false
            })
    }

    function fire() {
        form.setFieldsValue({
            search: dataJson.contentText,
        })
    }

    return (
        <div className="main-block">
            <div className="input-block">
                <Form form={form} name="advanced_search" className="ant-advanced-search-form" labelCol={{ span: 5 }} labelAlign="right">
                    <Form.Item name="search" rules={[{ pattern: new RegExp(/^[-\w\-s\-S\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                        <Input.Search
                            name="search"
                            className="search-input"
                            value={dataJson.contentText}
                            allowClear={false}
                            onSearch={() => {
                                formValidateFields()
                            }}
                            onChange={(e) => {
                                searchChange(e)
                            }}
                        />
                    </Form.Item>
                </Form>
            </div>
            <Row>
                <Col span={6}></Col>
                {/* <Col span={18}>{typeTitle}</Col> */}
                <Col span={18}>
                    <div className="type-block">{dataJson.typeTitle}</div>
                </Col>
            </Row>
            <Row>
                <Col className="left-tabs" span={6}>
                    <div className="left-tabs-less">
                        {dataJson.contentType.map((item, index) => (
                            <div
                                key={index}
                                className={`small-type ${item.active ? "small-type-active" : ""}`}
                                onClick={() => {
                                    clickType(item)
                                }}>
                                <span className="type-content">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col className="right-content" span={18}>
                    {dataJson.contentList.length !== 0 ? (
                        dataJson.contentList.map((item, index) => (
                            <div>
                                <div className="app-card" key={index}>
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
                            </div>
                        ))
                    ) : (
                        <div className="no-data">{dataStatus}</div>
                    )}
                </Col>
            </Row>
            <button
                id="paginationTest"
                style={{ display: "none" }}
                onClick={() => {
                    onChange(1, 10)
                }}
                onMouseOver={() => {
                    changePerpage(1, 10)
                }}>
                test
            </button>
            <Row>
                <Col span={6}></Col>

                {dataJson.contentList.length !== 0 ? (
                    <Col span={18}>
                        <Pagination className="pagination-style" defaultCurrent={1} onChange={onChange} onShowSizeChange={changePerpage} total={dataJson.pageTotal} pageSize={dataJson.per_page} />
                    </Col>
                ) : (
                    ""
                )}
            </Row>
        </div>
    )
}

export default ListContent
