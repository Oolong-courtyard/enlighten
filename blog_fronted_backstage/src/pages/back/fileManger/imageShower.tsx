import React, { useState } from "react"
import { Modal } from "antd"
import { DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
// import "@/assets/css/back/appDetailAction.less"
export default function ImageShower(props: any) {
    //显示隐藏
    const [greyShow, setGreyShow] = useState("0")
    //弹出层显示隐藏
    const [showModalState, setShowModalState] = useState(false)
    //重新上传
    function reloadCheck() {
        Modal.confirm({
            title: "是否需要重新上传",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                props.uploadAgain()
            },
        })
    }

    //图标style
    const iconStyle = {
        color: "white",
        height: "100px",
        lineHeight: "100px",
        marginRight: "10px",
        fontSize: "16px",
        cursor: "pointer",
    }

    return (
        <div
            className="imageshower-block"
            onMouseOver={() => {
                setGreyShow("0.3")
            }}
            onMouseLeave={() => {
                setGreyShow("0")
            }}
            style={{ float: "left" }}>
            {greyShow ? (
                <div className="grey-block" style={{ opacity: greyShow }}>
                    <DeleteOutlined className="delete-outline" style={{ ...iconStyle, marginRight: "10px" }} onClick={reloadCheck} />
                    <EyeOutlined
                        className="eye-outline"
                        style={{ ...iconStyle, marginLeft: "10px" }}
                        onClick={() => {
                            setShowModalState(true)
                        }}
                    />
                </div>
            ) : (
                ""
            )}
            <img style={{ height: "100px", width: "200px", lineHeight: "100px" }} src={props.src} />
            <Modal
                className="imageModal"
                title="图片"
                visible={showModalState}
                footer={null}
                onCancel={() => {
                    setShowModalState(false)
                }}>
                <img id="targetImage" style={{ width: "100%" }} src={props.src} />
            </Modal>
        </div>
    )
}
