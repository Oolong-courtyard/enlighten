import React, { useContext, useState } from "react"

import "@/assets/css/predefine.less"
import "@/assets/css/frontCommon.less"
import Footer from "./common/footer"
import Header from "./common/header"

function FrontLayout(props: any) {
    return (
        <div style={{ height: "100%" }}>
            <Header typeHandle={props.typeHandle}></Header>
            <div className="content">{props.children}</div>
            <Footer></Footer>
        </div>
    )
}

export default FrontLayout
