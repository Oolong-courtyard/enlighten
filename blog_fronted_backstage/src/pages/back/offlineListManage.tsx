import React, { useState, useEffect } from "react"
import { Table, Button, Input, Form, Space, Select, Row, Col, Badge, DatePicker, Popconfirm, notification } from "antd"
import { ColumnProps } from "antd/lib/table"
import { SearchOutlined, PlusCircleOutlined, DownOutlined, UpOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import moment from "moment"
//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
import Until from "../../until/until"
const { RangePicker } = DatePicker
let newPage = 1
function OfflineListManage(props: any) {
    const [expand, setExpand] = useState(false)
    const [form] = Form.useForm()
    const [searchValues, setSearchValues] = useState({
        product_type: "",
        content_type: "",
        content_name: "",
        publisher: "",
        status: "cancel",
        cancel_date_from: "",
        cancel_date_to: "",
        // cancel_date_from: "",
        // cancel_date_to: "",
        page: 1,
        per_page: 10,
        sort_key: "updated_date",
        sort_type: "DESC",
    })
    const [PublisherFliter, setPublisherFliter] = useState<PublisherFilterList[]>([])
    const columnsReally: ColumnProps<IContents>[] = [
        {
            title: "序号",
            dataIndex: "indexId",
            sortDirections: ["descend"],
        },
        {
            title: "应用名称",
            dataIndex: "content_name",
            defaultSortOrder: "descend",
            // sorter: (a, b) => a.content_name.length - b.content_name.length,
        },
        {
            title: "产品分类",
            dataIndex: "product_type",
            // sorter: (a, b) => a.product_type.length - b.product_type.length,
            // sortDirections: ["descend"],
        },
        {
            title: "内容分类",
            dataIndex: "content_type",
        },
        {
            title: "作者",
            dataIndex: "publisher",
            // filters: PublisherFliter,
            filterMultiple: false,
            // onFilter: (val, record) => record.publisher === val,
            // onFilter: (value, record) => record.publisher.indexOf(value) === 0,
            // sorter: (a, b) => a.publisher.length - b.publisher.length,
            // sortDirections: ["descend", "ascend"],
        },
        {
            title: "下架时间",
            dataIndex: "cancel_date",
        },
        {
            title: "下载量",
            dataIndex: "count",
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm className="delele" title="确认删除?" onConfirm={() => deleteAppItem(record.content_id)}>
                        <a style={{ color: "#FF7875" }}>删除</a>
                    </Popconfirm>
                    <Popconfirm className="update" title="确认上架?" onConfirm={() => onlineAppItem(record.content_id)}>
                        <a style={{ color: "#1890ff" }}>上架</a>
                    </Popconfirm>
                    <a
                        className="edit"
                        style={{ color: "#1890ff" }}
                        onClick={() => {
                            editApplication(record)
                        }}>
                        编辑
                    </a>
                </Space>
            ),
        },
    ]

    // 点击编辑应用按钮
    const editApplication = async (record: any) => {
        const resoveData = request.post(Urls.MGR_CONTENT_EDIT + "/" + record.content_id + "/" + record.record_id, "")
        await resoveData.then((res: any) => {
            let resData = res
            if (resData.hasOwnProperty("content_id")) {
                window.sessionStorage.setItem("content_id", resData.content_id)
                window.sessionStorage.setItem("record_id", resData.record_id)
                props.history.push("/manager/appDetailAction/publish/" + record.record_id)
            }
        })
    }

    const [ColumnsReally, setColumnsReally] = useState(columnsReally)
    const [TableReallyData, setTablesData] = useState<IContents[]>([])
    const [Visible, setVisible] = useState(false)
    const [Loading, setLoading] = useState(false)
    let [totalData, setTotalData] = useState(1)
    //状态选择下拉
    const { Option } = Select
    // 下拉框选择
    const SelectProductOnChange = (value: any, type: number) => {
        switch (type) {
            case 0:
                setSearchValues({ ...searchValues, ["product_type"]: value })
                break
            case 1:
                setSearchValues({ ...searchValues, ["content_type"]: value })
                break
        }
    }
    // 输入框输入监听
    const InputOnChange = (e: any) => {
        setSearchValues({ ...searchValues, [e.target.name]: e.target.value })
    }
    // 时间选择
    const changeTime = (date: any, dateString: Array<string>, type: number) => {
        console.log(dateString)
        console.log(type)
        switch (type) {
            case 0:
                dateString.map((item, index) => {
                    if (item != "") {
                        if (index == 0) {
                            searchValues.cancel_date_from = item + " 00:00:00"
                        } else {
                            searchValues.cancel_date_to = item + " 23:59:59"
                        }
                    } else {
                        if (index == 0) {
                            searchValues.cancel_date_from = item
                        } else {
                            searchValues.cancel_date_to = item
                        }
                    }
                })
                break
        }
        setSearchValues({ ...searchValues })
    }
    // perPageSize 改变
    const changePerpage = (current: number, size: number) => {
        newPage = 1
        searchValues.page = 1
        searchValues.per_page = size
        setSearchValues({ ...searchValues, ["per_page"]: size })
        getAppList()
    }
    // 页码改变
    const changePageIndex = (page: number, pageSize?: number | undefined) => {
        newPage = page
        setSearchValues({ ...searchValues, ["page"]: page })
        getAppList()
    }
    // 查询
    const searchAppList = async () => {
        await getAppList()
    }
    // 获取应用列表
    const getAppList = async () => {
        console.log(searchValues, "searchValuessearchValues")
        searchValues.page = newPage
        const resoveData = request.get(Urls.MGR_CONTENTS, searchValues)
        await resoveData.then((res: any) => {
            console.log(res, "获取应用列表回调")
            let resData = res
            if (resData.hasOwnProperty("contents")) {
                if (resData.contents.length != 0) {
                    let contents = resData.contents
                    let newDraftList: IContents[] = []
                    let newFilterList: PublisherFilterList[] = []
                    setTotalData(resData.count)
                    contents.map((item: any, index: number) => {
                        let publisherFilterItem: PublisherFilterList = {
                            text: item.publisher,
                            value: item.publisher,
                        }
                        item["indexId"] = (searchValues.page - 1) * searchValues.per_page + index + 1
                        if (item.cancel_date != null) {
                            item.cancel_date = Until.dateFormat(parseInt(item.cancel_date))
                        }
                        newDraftList.push(item)
                        PublisherFliter.push(publisherFilterItem)
                    })
                    setPublisherFliter([...PublisherFliter])
                    setTablesData([...newDraftList])
                } else if (resData.contents.length == 0 && resData.count != 0) {
                    //翻页
                    changePageIndex(1)
                } else if (resData.contents.length == 0 && resData.count == 0) {
                    setTablesData([])
                } else {
                    console.log("contents不是一个数组")
                }
            } else {
                console.log("接口未返回：参数名:contents'")
            }
        })
    }
    // 删除应用
    const deleteAppItem = async (contentId: string) => {
        const resoveData = request.deleteMethod(Urls.MGR_CONTENT_DELETE + "/" + contentId, {})
        await resoveData.then((res: any) => {
            getAppList()
        })
    }
    // const deleteAppItem = async (contentId: string) => {
    //     console.log("走到了删除应用")
    //     let userData = window.localStorage.getItem("userData")
    //     if (typeof userData == "string") {
    //         let deleteData = {
    //             content_id: contentId,
    //         }
    //         const resoveData = request.deleteMethod(Urls.MGR_CONTENT_DELETE + "/" + contentId, {})
    //         await resoveData.then((res: any) => {
    //             if (res.code == "100") {
    //                 console.log("删除应用回调")
    //                 getAppList()
    //             }
    //         })
    //     }
    // }

    // 上架应用
    const onlineAppItem = async (contentId: string) => {
        console.log("走到了上架应用")
        let dataJson = {
            content_id: contentId,
            status: "cancel",
            update_status: "release",
        }
        const resoveData = request.put(Urls.MGR_CONTENT_STATUS_UPDATE + "/" + contentId, dataJson)
        await resoveData.then((res: any) => {
            getAppList()
        })
        // }
    }
    // 规定不可选的 日期范围
    const rangePickerDisabledDate = (current: any) => {
        let result = false
        if (current) {
            if (current > moment().endOf("day")) {
                result = true
            } else {
                result = false
            }
        }
        return result
    }
    // 页面初始化
    useEffect(() => {
        getAppList()
    }, [])

    //表单验证
    const formValidateFields = async () => {
        await form.submit()
        await form
            .validateFields()
            .then(async (values: any) => {
                newPage = 1
                await getAppList()
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
                    <Col span={4}>
                        <Form.Item className="from-group" label="应用名称" labelCol={{ span: "8" }} name="content_name" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input id="input-id-content" defaultValue={searchValues.content_name} maxLength={50} className="from-group-input" name="content_name" placeholder="请输入应用名称" onBlur={InputOnChange} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item className="from-group" label="作者名" labelCol={{ span: "8" }} name="publisher" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input id="input-id-publisher" defaultValue={searchValues.publisher} maxLength={50} className="from-group-input" name="publisher" placeholder="请输入作者名" onBlur={InputOnChange} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item className="from-group" label="产品分类" labelCol={{ span: "8" }}>
                            <Select
                                id="select-id-product"
                                placeholder="产品分类"
                                value={searchValues.product_type}
                                onChange={(e) => {
                                    SelectProductOnChange(e, 0)
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
                    <Col span={4}>
                        <Form.Item className="from-group" label="内容分类" labelCol={{ span: "8" }}>
                            <Select
                                id="select-id-content"
                                placeholder="内容分类"
                                value={searchValues.content_type}
                                onChange={(e) => {
                                    SelectProductOnChange(e, 1)
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

                    <Col span={5}>
                        <Form.Item className="from-group" label="下架时间" labelCol={{ span: "6" }}>
                            <RangePicker
                                className="range-picker"
                                // locale={locale}
                                disabledDate={rangePickerDisabledDate}
                                onChange={(val, valString) => {
                                    changeTime(val, valString, 0)
                                }}
                            />
                            <input id="range-picker-start" type="hidden" value={searchValues.cancel_date_from} />
                            <input id="range-picker-to" type="hidden" value={searchValues.cancel_date_to} />
                        </Form.Item>
                    </Col>
                    <Col span={3} style={{ textAlign: "right" }}>
                        <Button className="file-search-button" type="primary" onClick={formValidateFields}>
                            查询
                            <SearchOutlined />
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table id="table" pagination={{ total: totalData, onChange: changePageIndex, onShowSizeChange: changePerpage, pageSize: searchValues.per_page, current: searchValues.page }} rowKey={Until.randomString(8)} columns={ColumnsReally} dataSource={TableReallyData}></Table>
        </div>
    )
}

export default OfflineListManage
