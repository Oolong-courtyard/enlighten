import React, { useState, useEffect } from "react"
import { Table, Button, Input, Form, Space, Select, Row, Col, Badge, DatePicker, Popconfirm, notification } from "antd"
import { ColumnProps } from "antd/lib/table"
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
import Until from "../../until/until"
const { RangePicker } = DatePicker
let newPage = 1
function DraftListManage(props: any) {
    const [form] = Form.useForm()
    let [searchValues, setSearchValues] = useState({
        product_type: "",
        content_name: "",
        publisher: "",
        content_type: "",
        save_date_from: "",
        save_date_to: "",
        page: 1,
        per_page: 10,
        sort_key: "updated_date",
        sort_type: "DESC",
    })
    let [PublisherFliter, setPublisherFliter] = useState<PublisherFilterList[]>([])
    let columns: ColumnProps<IUserInfo>[] = [
        {
            title: "序号",
            dataIndex: "indexId",
            sortDirections: ["descend"],
        },
        {
            title: "应用名称",
            dataIndex: "content_name",
            defaultSortOrder: "descend",
            width: "200px",
        },
        {
            title: "产品分类",
            dataIndex: "product_type",
        },
        {
            title: "内容分类",
            dataIndex: "content_type",
        },
        {
            title: "发布者",
            dataIndex: "publisher",
        },
        {
            title: "保存日期",
            dataIndex: "created_date",
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm className="delele" title="Sure to delete?" onConfirm={() => deleteDraftItem(record.content_id)}>
                        <a style={{ color: "#FF7875" }}>删除</a>
                    </Popconfirm>

                    <a
                        className="edit"
                        onClick={() => {
                            editApplication(record)
                        }}
                        style={{ color: "#1890ff" }}>
                        编辑
                    </a>
                </Space>
            ),
        },
    ]
    let [ColumnsReally, setColumnsReally] = useState(columns)
    let [totalData, setTotalData] = useState(0)
    let [TableReallyData, setTablesData] = useState<IUserInfo[]>([])

    // 点击编辑应用按钮
    const editApplication = async (record: any) => {
        const resoveData = request.post(Urls.MGR_CONTENT_EDIT + "/" + record.content_id + "/" + record.record_id, "")
        await resoveData.then((res: any) => {
            let resData = res
            if (resData.hasOwnProperty("content_id")) {
                window.sessionStorage.setItem("content_id", resData.content_id)
                window.sessionStorage.setItem("record_id", resData.record_id)
                props.history.push({
                    pathname: "/manager/appDetailAction/draft/" + record.record_id,
                    query: {
                        editType: "draft",
                    },
                })
            }
        })
    }

    // const linkTo = (res: any) => {
    //     //编辑跳转，带上record_id和record_type
    //     props.history.push("/manager/appDetailAction/draft/" + res.record_id)
    // }
    // 下拉框选择
    const clickOnChange = (e: any, type: number, miniType: number) => {
        switch (type) {
            // input输入框的情况
            case 0:
                switch (miniType) {
                    case 0:
                        let targetVal = e.target.value.trim()
                        setSearchValues({ ...searchValues, [e.target.name]: targetVal })
                        break
                }
                break
            // select 输入框的情况
            case 1:
                console.log(e, "change选择")
                switch (miniType) {
                    case 0:
                        setSearchValues({ ...searchValues, ["product_type"]: e })
                        console.log(searchValues, "change选择searchValues")
                        break
                    case 1:
                        setSearchValues({ ...searchValues, ["content_type"]: e })
                        break
                }

                break
        }
    }
    // 时间选择
    const changeTime = (date: any, dateString: string, type: number) => {
        console.log(dateString, "changeTime选择")
        switch (type) {
            case 0:
                if (dateString != "") {
                    setSearchValues({ ...searchValues, ["save_date_from"]: dateString + " " + "00:00:00" })
                } else {
                    setSearchValues({ ...searchValues, ["save_date_from"]: "" })
                }
                break
            case 1:
                if (dateString != "") {
                    setSearchValues({ ...searchValues, ["save_date_to"]: dateString + " " + "23:59:59" })
                } else {
                    setSearchValues({ ...searchValues, ["save_date_to"]: "" })
                }

                break
        }
    }
    // perPageSize 改变
    const changePerpage = (current: number, size: number) => {
        newPage = 1
        searchValues.page = 1
        searchValues.per_page = size
        setSearchValues({ ...searchValues, ["per_page"]: size })
        getDraftList()
    }
    // 页码改变
    const changePageIndex = (page: number, pageSize?: number | undefined) => {
        newPage = page
        setSearchValues({ ...searchValues })
        getDraftList()
    }
    // 取得草稿一览
    const getDraftList = async () => {
        console.log(searchValues, "调用getDraftList")
        searchValues.page = newPage
        const resolveData = request.get(Urls.MGR_DRAFTS + "/", searchValues)
        await resolveData.then((res: any) => {
            console.log("真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗真的来了吗")
            console.log(res, "草稿回调")
            let resData = res
            if (resData.hasOwnProperty("contents")) {
                if (resData.contents.length != 0 && resData.contents instanceof Array) {
                    let contents = resData.contents
                    let newDraftList: IUserInfo[] = []
                    setTotalData(resData.count)
                    let publisherFilterItem: PublisherFilterList
                    contents.map((item: IUserInfo, index: number) => {
                        publisherFilterItem = {
                            text: item.publisher,
                            value: item.publisher,
                        }
                        item["indexId"] = (searchValues.page - 1) * searchValues.per_page + index + 1
                        if (item.created_date != null) {
                            item.created_date = Until.dateFormat(parseInt(item.created_date))
                        }
                        newDraftList.push(item)
                        PublisherFliter.push(publisherFilterItem)
                    })
                    setPublisherFliter([...PublisherFliter])
                    setTablesData([...newDraftList])
                } else if (resData.contents.length == 0 && resData.total_pages != 0) {
                    //翻页
                    changePageIndex(1)
                } else if (resData.contents.length == 0 && resData.total_pages == 0) {
                    setTablesData([])
                } else {
                    console.log("contents不是一个数组")
                }
            } else {
                console.log("接口未返回：参数名:contents'")
            }
        })
        // request.get(Urls.MGR_DRAFTS + "/", searchValues, getDraftListCallback)
    }
    // 查询
    const searchDraftList = async () => {
        console.log("w lai l ")
        await getDraftList()
    }
    // 删除草稿
    const deleteDraftItem = async (contentId: string) => {
        let deleteData = {
            content_id: contentId,
            record_type: "draft",
        }
        console.log(contentId, "contentId")
        const resolveData = request.deleteMethod(Urls.MGR_DRAFT_DELETE + "/" + contentId, deleteData)
        await resolveData.then((res: any) => {
            getDraftList()
        })
    }
    // 点击增加应用按钮
    const addApplication = async () => {
        const _props = props
        const resolveData = request.post(Urls.USER_CONTENT_DETAILS + "/", "")
        await resolveData.then((res: any) => {
            let resData = res
            if (resData.hasOwnProperty("content_id")) {
                window.sessionStorage.setItem("content_id", resData.content_id)
                window.sessionStorage.setItem("record_id", resData.record_id)
                _props.history.push("/manager/addAppDetailAction")
            }
        })
    }
    // 页面初始化
    useEffect(() => {
        getDraftList()
    }, [])
    //表单验证
    const formValidateFields = async () => {
        await form.submit()
        await form
            .validateFields()
            .then(async (values: any) => {
                newPage = 1
                await getDraftList()
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
    return (
        <div>
            <Form form={form} name="advanced_search" className="ant-advanced-search-form" labelCol={{ span: 5 }} labelAlign="right">
                <Row justify="space-between">
                    <Col span={3}>
                        <Form.Item className="from-group" label="应用名称" labelCol={{ span: "8" }} name="content_name" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input
                                id="input-id-content"
                                className="from-group-input"
                                placeholder="请输入应用名称"
                                maxLength={50}
                                name="content_name"
                                defaultValue={searchValues.content_name}
                                onBlur={(e) => {
                                    clickOnChange(e, 0, 0)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item className="from-group" label="作者名" labelCol={{ span: "8" }} name="publisher" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input
                                id="input-id-publisher"
                                className="from-group-input"
                                placeholder="请输入作者"
                                maxLength={50}
                                name="publisher"
                                defaultValue={searchValues.publisher}
                                onBlur={(e) => {
                                    clickOnChange(e, 0, 0)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item className="from-group" label="产品分类" labelCol={{ span: "8" }}>
                            <Select
                                id="select-id-product"
                                placeholder="产品分类"
                                value={searchValues.product_type}
                                onChange={(e) => {
                                    clickOnChange(e, 1, 0)
                                }}>
                                <Select.Option id="protype_0" value="">
                                    --请选择--
                                </Select.Option>
                                <Select.Option id="protype_1" value="any_share_cloud">
                                    AnyShare Cloud
                                </Select.Option>
                                <Select.Option id="protype_2" value="any_backup_cloud">
                                    AnyBackup Cloud
                                </Select.Option>
                                <Select.Option id="protype_3" value="any_robot_cloud">
                                    AnyRobot Cloud
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item className="from-group" label="内容分类" labelCol={{ span: "8" }}>
                            <Select
                                id="select-id-content"
                                placeholder="内容分类"
                                value={searchValues.content_type}
                                onChange={(e) => {
                                    clickOnChange(e, 1, 1)
                                }}>
                                <Select.Option id="contype_0" value="">
                                    --请选择--
                                </Select.Option>
                                <Select.Option id="contype_1" value="application">
                                    应用
                                </Select.Option>
                                <Select.Option id="contype_2" value="service">
                                    服务方案
                                </Select.Option>
                                <Select.Option id="contype_3" value="solution">
                                    解决方案
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item className="from-group" label="开始日期" labelCol={{ span: "8" }}>
                            <DatePicker
                                className="datapicker-start"
                                placeholder="开始日期"
                                onChange={(val, valString) => {
                                    changeTime(val, valString, 0)
                                }}
                            />
                            <input id="datapicker-start" type="hidden" value={searchValues.save_date_from} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item className="from-group" label="结束日期" labelCol={{ span: "8" }}>
                            <DatePicker
                                className="datapicker-end"
                                placeholder="结束日期"
                                onChange={(val, valString) => {
                                    changeTime(val, valString, 1)
                                }}
                            />
                            <input id="datapicker-end" type="hidden" value={searchValues.save_date_to} />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button className="file-search-button test-search" type="primary" onClick={formValidateFields}>
                            查询
                            <SearchOutlined />
                        </Button>
                    </Col>
                    <Col span={2} className="tar">
                        <Button className="file-add-button" type="primary" onClick={addApplication}>
                            <PlusCircleOutlined style={{ marginRight: "5px" }} />
                            新增
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table id="table" pagination={{ total: totalData, onChange: changePageIndex, onShowSizeChange: changePerpage, pageSize: searchValues.per_page, current: searchValues.page }} columns={ColumnsReally} dataSource={TableReallyData} rowKey="indexId"></Table>
        </div>
    )
}
export default DraftListManage
