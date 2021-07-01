import React, { useState, useEffect } from "react"
import { Table, Button, Input, Form, Space, Select, Row, Col, Popconfirm, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { ColumnProps } from "antd/lib/table"
import FileSaver from "file-saver"

//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
let newPage = 1
const AdminForm = (props: any) => {
    let [searchValues, setSearchValues] = useState({
        nickname: "",
        email: "",
        phone: "",
        user_type: "",
        page: 1,
        per_page: 10,
        sort_key: "ID",
        sort_type: "DESC",
    })
    const columns: ColumnProps<UserList>[] = [
        {
            title: "ID",
            dataIndex: "id",
            showSorterTooltip: false,
        },
        {
            title: "用户名",
            dataIndex: "nickname",
            key: "nickname",
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "类型",
            key: "user_type",
            dataIndex: "user_type",
        },
        {
            title: "操作",
            key: "action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Popconfirm className="setBtn" title={record.user_type == "user" ? "确定设为管理员?" : "确定设为普通用户?"} okText="确定" cancelText="取消" onConfirm={() => showModal(record)}>
                        <a style={{ color: "#1890ff" }}>{record.user_type == "user" ? "设为管理员" : "设为普通用户"}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    let [totalData, setTotalData] = useState(0)
    let TableReallyData: UserList[] = []
    let [tabdata, setTablesData] = useState(TableReallyData)

    useEffect(() => {
        getNewData()
    }, [])

    let getNewData = async () => {
        searchValues.page = newPage
        const resolveData = request.get(Urls.IP_CONFIG + "/admin/users", searchValues)
        await resolveData.then((res: any) => {
            if (res.hasOwnProperty("users")) {
                if (res.users.length != 0) {
                    let tagDataList = res.users
                    setTotalData(res.count)
                    let tabadata: UserList[] = []
                    tagDataList.map((item: any, index: number) => {
                        item["id"] = (searchValues.page - 1) * searchValues.per_page + index + 1
                        tabadata.push(item)
                    })
                    setTablesData([...tabadata])
                } else if (res.users.length == 0 && res.count != 0) {
                    //翻页
                    changePageIndex(1)
                } else if (res.users.length == 0 && res.count == 0) {
                    setTablesData([])
                } else {
                    console.log(res.users)
                }
            } else {
                console.log("接口未返回：参数名:users'")
            }

        })
    }
    // perPageSize 改变
    const changePerpage = (current: number, size: number) => {
        newPage = 1
        searchValues.page = 1
        searchValues.per_page = size
        setSearchValues({ ...searchValues, ["per_page"]: size })
        getNewData()
    }
    // 页码改变
    const changePageIndex = (page: number, pageSize?: number | undefined) => {
        newPage = page
        setSearchValues({ ...searchValues, ["page"]: page })
        getNewData()
    }

    const clickOnChange = (e: any, type: number, miniType: number) => {
        switch (type) {
            // input输入框的情况
            case 0:
                switch (miniType) {
                    case 0:
                        setSearchValues({ ...searchValues, [e.target.name]: e.target.value })
                        break
                }
                break
            // select 输入框的情况
            case 1:
                switch (miniType) {
                    case 0:
                        setSearchValues({ ...searchValues, ["user_type"]: e })
                        break
                }

                break
            default:
                break
        }
    }
    // 查询
    const searchList = () => {
        getNewData()
    }
    const Json2csvParser: any = require("json2csv").Parser
    // 导出csv
    const exportCSV = () => {
        const parser = new Json2csvParser()
        let jsonArr: any = []
        for (var i = 0; i < tabdata.length; i++) {
            jsonArr[i] = tabdata[i]
        }
        let filename = "用户信息.xls"
        // const csvData = parser.parse(jsonArr)
        let csvData = {}
        if (jsonArr.length != 0) {
            csvData = parser.parse(jsonArr)
        }
        const blob = new Blob(["\uFEFF" + csvData], { type: "text/plain;charset=utf-8;" })
        FileSaver.saveAs(blob, filename)
    }

    //新建modal
    const showModal = (record: any) => {
        let chaType
        if (record.user_type === "user") {
            chaType = "manager"
        } else {
            chaType = "user"
        }
        let chageParams = {
            user_type: record.user_type,
            change_user_type: chaType,
        }
        const resolveData = request.put(Urls.IP_CONFIG + "/admin/users/" + record.user_id_short, chageParams)
        resolveData.then((res: any) => {
            message.success("设置成功")
            getNewData()
        })
    }
    return (
        <div>
            <Form>
                <Row justify="space-between">
                    <Col span={4}>
                        <Form.Item className="from-group" label="用户昵称" labelCol={{ span: "8" }}>
                            <Input
                                id="from-group-input"
                                className="from-group-input"
                                placeholder="用户名"
                                name="nickname"
                                defaultValue={searchValues.nickname}
                                onBlur={(e) => {
                                    clickOnChange(e, 0, 0)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item className="from-group" label="用户类型" labelCol={{ span: "8" }}>
                            <Select
                                id="select-id-userClass"
                                placeholder="分类"
                                value={searchValues.user_type}
                                onChange={(e) => {
                                    clickOnChange(e, 1, 0)
                                }}>
                                <Select.Option id="protype_0" value="">
                                    --请选择--
                                </Select.Option>
                                <Select.Option id="protype_1" value="user">
                                    普通用户
                                </Select.Option>
                                <Select.Option id="protype_2" value="manager">
                                    exchange管理员
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Button className="file-search-button test-search" type="primary" onClick={searchList}>
                            查询
                            <SearchOutlined />
                        </Button>
                    </Col>
                    <Col span={7}>
                        <Button className="exportCSV" onClick={exportCSV}>
                            导出用户表
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table id="table" columns={columns} dataSource={tabdata} pagination={{ total: totalData, onChange: changePageIndex, onShowSizeChange: changePerpage, pageSize: searchValues.per_page, current: searchValues.page }} rowKey="id" />
        </div>
    )
}

export default AdminForm
