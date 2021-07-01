import React, { useState, useEffect } from "react"
import { Table, Button, Form, Input, Space, Modal, Row, Col, Popconfirm, notification } from "antd"
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { ColumnProps } from "antd/lib/table"
import TextArea from "antd/lib/input/TextArea"
//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
let newPage = 1
function TagManage(props: any) {
    let ColumnsReally: ColumnProps<TagList>[] = [
        {
            title: "序号",
            dataIndex: "id",
            showSorterTooltip: false,
        },
        {
            title: "标签分类",
            dataIndex: "text",
        },
        {
            title: "slug",
            dataIndex: "slug",
        },
        {
            title: "标签描述",
            dataIndex: "description",
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm className="del-btn delete" title="确认删除?" onConfirm={() => deleteTag(record.term_id)}>
                        <a style={{ color: "#1890ff" }}>删除</a>
                    </Popconfirm>
                    <a
                        className="edit"
                        onClick={() => {
                            showModal("edit", record)
                        }}
                        style={{ color: "#1890ff" }}>
                        {" "}
                        编辑
                    </a>
                </Space>
            ),
        },
    ]

    let TableReallyData: TagList[] = []
    let [columns, setColumnsReally] = useState(ColumnsReally)
    let [tabadata, setTablesData] = useState(TableReallyData)
    let [visible, setVisible] = useState(false)
    let [loading, setLoading] = useState(false)
    let [dialogStatus, setDialogStatus] = useState(false)
    let [totalData, setTotalData] = useState(0)
    //add
    let [values, setValues] = useState({
        text: "",
        slug: "",
        description: "",
        term_id: "",
    })
    const onChange = (event: any, type: number) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    //search
    const [searchValues, setSearchValues] = useState({
        slug: "",
        text: "",
        page: 1,
        per_page: 10,
        sort_key: "updated_date",
        sort_type: "DESC",
    })
    const onChange1 = (event: any, type: number) => {
        setSearchValues({ ...searchValues, [event.target.name]: event.target.value })
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
    useEffect(() => {
        getNewData()
    }, [])
    let getNewData = async () => {
        searchValues.page = newPage
        let tagParams
        tagParams = {
            text: searchValues.text,
            slug: searchValues.slug,
            page: newPage,
            per_page: 10,
            sort_key: "updated_date",
            sort_type: "DESC",
        }
        const ResolveData = request.get(Urls.TERM_LIST + "/tag", tagParams)
        await ResolveData.then((res: any) => {
            form.resetFields()
            if (res.hasOwnProperty("terms")) {
                if (res.terms.length != 0) {
                    let tagDataList = res.terms
                    setTotalData(res.count)
                    let tabadata: TagList[] = []
                    tagDataList.map((item: any, index: number) => {
                        item["id"] = (searchValues.page - 1) * searchValues.per_page + index + 1
                        tabadata.push(item)
                    })
                    setTablesData([...tabadata])
                } else if (res.terms.length == 0 && res.count != 0) {
                    //翻页
                    changePageIndex(1)
                } else if (res.terms.length == 0 && res.count == 0) {
                    setTablesData([])
                } else {
                    console.log(res.terms)
                }
            } else {
                console.log("接口未返回：参数名:terms'")
            }
        })
    }

    //新建modal
    const [form] = Form.useForm()
    const showModal = (e: any, record: any) => {
        setVisible(true)
        if (e === "edit") {
            setDialogStatus(true)
            form.setFieldsValue({ text: "", slug: "", description: "", ...record })
        } else {
            setDialogStatus(false)
        }
        setValues(record)
    }
    const onFinish = (e: any) => {
        if (dialogStatus) {
            editTag()
        } else {
            addData()
        }
    }
    const handleOk = () => {
        form.submit()
    }

    //新增标签
    let tagParams = {
        slug: values.slug,
        text: values.text,
        description: values.description,
    }
    const addData = async () => {
        const resolveDtata = request.post(Urls.TERM_LIST + "/tag/", tagParams)
        await resolveDtata.then((res: any) => {
            setVisible(false)
            setLoading(false)
            getNewData() //插入数据成功更新重新调用term_list
        })
    }

    //编辑标签
    const editTag = async () => {
        const resolveDtata = request.put(Urls.TERM_LIST + "/tag/" + values.term_id, tagParams)
        await resolveDtata.then((res: any) => {
            setVisible(false)
            setLoading(false)
            getNewData()
        })
    }
    //删除标签
    const deleteTag = async (term_id: any) => {
        const resolveDtata = request.deleteMethod(Urls.TERM_LIST + "/tag/" + term_id, "")
        await resolveDtata.then((res: any) => {
            getNewData()
        })
    }
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
    }

    //表单验证
    const formValidateFields = async () => {
        await form.submit()
        await form
            .validateFields()
            .then(async (values: any) => {
                await getNewData()
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
                        <Form.Item className="from-group" label="标签名" labelCol={{ span: 8 }} name="text1" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input
                                id="input-id-group"
                                className="from-group-input"
                                placeholder="标签名"
                                name="text"
                                maxLength={50}
                                defaultValue={searchValues.text}
                                onBlur={(e) => {
                                    onChange1(e, 1)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className="from-group" label="标签slug" labelCol={{ span: 8 }} name="slug1" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input
                                id="input-id-slug"
                                className="from-group-input"
                                placeholder="标签slug"
                                name="slug"
                                maxLength={50}
                                defaultValue={searchValues.slug}
                                onBlur={(e) => {
                                    onChange1(e, 1)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button className="file-search-button query-btn" type="primary" onClick={formValidateFields}>
                            查询
                            <SearchOutlined />
                        </Button>
                    </Col>
                    <Col span={7} className="tal">
                        <Button
                            className="file-add-button"
                            type="primary"
                            onClick={() => {
                                showModal("add", "")
                            }}>
                            <PlusCircleOutlined />
                            添加
                        </Button>
                    </Col>
                </Row>
                <Table id="table" columns={columns} dataSource={tabadata} pagination={{ total: totalData, onChange: changePageIndex, onShowSizeChange: changePerpage, pageSize: searchValues.per_page, current: searchValues.page }} rowKey="id"></Table>
            </Form>
            <Modal className="modal" visible={visible} getContainer={false} title="添加标签" cancelText="取消" okText="确定" onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} forceRender>
                <Form
                    id="modal-form"
                    className="tal"
                    form={form}
                    onFinish={(e) => {
                        onFinish(e)
                    }}>
                    <Form.Item
                        className="from-group"
                        label="标签名"
                        labelCol={{ span: 6 }}
                        name="text"
                        rules={[
                            { required: true, message: "请输入标签名" },
                            { pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                        ]}>
                        <Input
                            id="modal-input-id-group1"
                            className="from-group-input"
                            placeholder="请输入"
                            maxLength={50}
                            name="text"
                            onBlur={(e) => {
                                onChange(e, 1)
                            }}
                            defaultValue={values.text}
                        />
                    </Form.Item>
                    <Form.Item
                        className="from-group"
                        label="标签slug"
                        labelCol={{ span: 6 }}
                        name="slug"
                        rules={[
                            { required: true, message: "请输入slug" },
                            { pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                        ]}>
                        <Input
                            id="modal-input-id-slug1"
                            className="from-group-input"
                            placeholder="请输入"
                            maxLength={50}
                            onBlur={(e) => {
                                onChange(e, 1)
                            }}
                            name="slug"
                            defaultValue={values.slug}
                        />
                    </Form.Item>
                    <Form.Item
                        className="from-group"
                        label="标签描述"
                        labelCol={{ span: 6 }}
                        name="description"
                        rules={[
                            { required: true, message: "请输入描述" },
                            { pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                        ]}>
                        <TextArea
                            id="modal-input-id-desc"
                            className="from-group-input"
                            placeholder="请输入"
                            maxLength={50}
                            onBlur={(e) => {
                                onChange(e, 1)
                            }}
                            name="description"
                            defaultValue={values.description}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TagManage
