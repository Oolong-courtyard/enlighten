import React, { useState, useEffect } from "react"
import { Table, Button, Form, Input, Space, Modal, Row, Col, Popconfirm, Select, notification } from "antd"
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { ColumnProps } from "antd/lib/table"
import TextArea from "antd/lib/input/TextArea"

//axios共通
import * as Urls from "../../api/urls"
import request from "../../api/baseApi"
let newPage = 1
function ClassManage(props: any) {
    let ColumnsReally: ColumnProps<TagList>[] = [
        {
            title: "序号",
            dataIndex: "id",
            sortDirections: ["descend"],
        },
        {
            title: "组别",
            dataIndex: "text",
        },
        {
            title: "slug",
            dataIndex: "slug",
        },
        {
            title: "组别描述",
            dataIndex: "description",
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
            title: "操作",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm className="delete" title="确定删除?" onConfirm={() => deleteTag(record.term_id)}>
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
    const [values, setValues] = useState({
        text: "",
        slug: "",
        description: "",
        term_id: "",
        product_type: "",
        content_type: "",
    })
    const onChange = (event: any, type: number, miniType: number) => {
        switch (type) {
            //input change
            case 0:
                {
                    switch (miniType) {
                        case 0: {
                            setValues({ ...values, [event.target.name]: event.target.value })
                        }
                    }
                }
                break
            // select change
            case 1:
                {
                    switch (miniType) {
                        case 0:
                            setValues({ ...values, ["product_type"]: event })
                            break
                        case 1:
                            setValues({ ...values, ["content_type"]: event })
                            break
                    }
                }
                break
        }
    }
    //search
    const [searchValues, setSearchValues] = useState({
        product_type: "",
        content_type: "",
        slug: "",
        text: "",
        description: "",
        page: 1,
        per_page: 10,
        sort_key: "updated_date",
        sort_type: "DESC",
    })
    const tabChange = (event: any, type: number, miniType: number) => {
        switch (type) {
            //input change
            case 0:
                {
                    switch (miniType) {
                        case 0: {
                            setSearchValues({ ...searchValues, [event.target.name]: event.target.value })
                        }
                    }
                }
                break
            // select change
            case 1:
                {
                    switch (miniType) {
                        case 0:
                            setSearchValues({ ...searchValues, ["product_type"]: event })
                            break
                        case 1:
                            setSearchValues({ ...searchValues, ["content_type"]: event })
                            break
                    }
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
            product_type: searchValues.product_type,
            content_type: searchValues.content_type,
            text: searchValues.text,
            slug: searchValues.slug,
            page: newPage,
            per_page: 10,
            sort_key: "updated_date",
            sort_type: "DESC",
        }
        const resolveData = request.get(Urls.TERM_LIST + "/group", tagParams)
        await resolveData.then((res: any) => {
            form.resetFields()
            if (res.hasOwnProperty("terms")) {
                if (res.terms) {
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
        if (e == "edit") {
            setDialogStatus(true)
            form.setFieldsValue({ ...record })
        } else {
            setDialogStatus(false)
        }
        setValues(record)
    }
    const formFinish = (e: any) => {
        setLoading(true)
        if (dialogStatus) {
            editTag()
        } else {
            addData()
        }
    }
    const handleOk = () => {
        form.submit()
    }
    let addParams = {
        slug: values.slug,
        text: values.text,
        product_type: values.product_type,
        content_type: values.content_type,
        description: values.description,
    }
    //新增组别
    const addData = async () => {
        const resolveData = request.post(Urls.TERM_LIST + "/group/", addParams)
        await resolveData.then((res: any) => {
            setVisible(false)
            setLoading(true)
            getNewData() //插入数据成功更新重新调用term_list
        })
    }

    //编辑组别
    const editTag = async () => {
        const resolveData = request.put(Urls.TERM_LIST + "/group/" + values.term_id, addParams)
        await resolveData.then((res: any) => {
            setVisible(false)
            setLoading(false)
            getNewData()
        })
    }

    //删除标签
    const deleteTag = async (term_id: any) => {
        const resolveData = request.deleteMethod(Urls.TERM_LIST + "/group/" + term_id, "")
        await resolveData.then((res: any) => {
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
                        <Form.Item className="from-group" label="组别名" labelCol={{ span: 8 }} name="text1" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input
                                id="input-id-group"
                                className="from-group-input"
                                placeholder="组别名"
                                maxLength={50}
                                name="text"
                                defaultValue={searchValues.text}
                                onBlur={(e) => {
                                    tabChange(e, 0, 0)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item className="from-group" label="组别slug" labelCol={{ span: 8 }} name="slug1" rules={[{ pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" }]}>
                            <Input
                                id="input-id-slug"
                                className="from-group-input"
                                placeholder="组别slug"
                                maxLength={50}
                                name="slug"
                                defaultValue={searchValues.slug}
                                onBlur={(e) => {
                                    tabChange(e, 0, 0)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item className="from-group" label="产品分类" labelCol={{ span: 8 }}>
                            <Select
                                id="select-id-product"
                                placeholder="产品分类"
                                value={searchValues.product_type}
                                onChange={(e) => {
                                    tabChange(e, 1, 0)
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
                        <Form.Item className="from-group" label="内容分类" labelCol={{ span: 8 }}>
                            <Select
                                id="select-id-content"
                                placeholder="内容分类"
                                value={searchValues.content_type}
                                onChange={(e) => {
                                    tabChange(e, 1, 1)
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
                    <Col span={2}>
                        <Button className="file-search-button" type="primary" onClick={formValidateFields}>
                            查询
                            <SearchOutlined />
                        </Button>
                    </Col>
                    <Col span={6} className="tal">
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
            <Modal className="modal" visible={visible} getContainer={false} title="添加组别" cancelText="取消" okText="确定" onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} forceRender>
                <Form
                    id="modal-form"
                    className="tal"
                    form={form}
                    onFinish={(e) => {
                        formFinish(e)
                    }}>
                    <Form.Item
                        className="from-group"
                        label="组别名"
                        labelCol={{ span: 6 }}
                        name="text"
                        rules={[
                            { required: true, message: "请输入标签名" },
                            { pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                        ]}>
                        <Input
                            id="modal-input-id-group"
                            className="from-group-input"
                            placeholder="请输入"
                            maxLength={50}
                            name="text"
                            onBlur={(e) => {
                                onChange(e, 0, 0)
                            }}
                            defaultValue={values.text}
                        />
                    </Form.Item>
                    <Form.Item
                        className="from-group"
                        label="组别slug"
                        labelCol={{ span: 6 }}
                        name="slug"
                        rules={[
                            { required: true, message: "请输入slug" },
                            { pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                        ]}>
                        <Input
                            id="modal-input-id-slug"
                            className="from-group-input"
                            placeholder="请输入组别名称对应英文"
                            maxLength={50}
                            onBlur={(e) => {
                                onChange(e, 0, 0)
                            }}
                            name="slug"
                            defaultValue={values.slug}
                        />
                    </Form.Item>
                    <Form.Item className="from-group" label="产品分类" labelCol={{ span: 6 }} name="product_type" rules={[{ required: true, message: "请选择产品分类" }]}>
                        <Select
                            id="modal-select-id-product"
                            className="modal-select-id-product"
                            value={values.product_type}
                            defaultValue={values.product_type}
                            placeholder="产品分类"
                            onChange={(e) => {
                                onChange(e, 1, 0)
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
                    <Form.Item className="from-group" label="内容分类" labelCol={{ span: 6 }} name="content_type" rules={[{ required: true, message: "请选择内容分类" }]}>
                        <Select
                            id="modal-select-id-content"
                            className="modal-select-id-content"
                            defaultValue={values.content_type}
                            value={values.content_type}
                            placeholder="内容分类"
                            onChange={(e) => {
                                onChange(e, 1, 1)
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
                    <Form.Item
                        className="from-group"
                        label="组别描述"
                        labelCol={{ span: 6 }}
                        name="description"
                        rules={[
                            { required: true, message: "请输入描述" },
                            { pattern: new RegExp(/^[-\w\s\u4E00-\u9FA5\uF900-\uFA2D]*$/, "g"), message: "不允许输入非法字符" },
                        ]}>
                        <TextArea
                            id="modal-input-id-description"
                            className="from-group-input"
                            placeholder="请输入"
                            maxLength={100}
                            onBlur={(e) => {
                                onChange(e, 0, 0)
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

export default ClassManage
