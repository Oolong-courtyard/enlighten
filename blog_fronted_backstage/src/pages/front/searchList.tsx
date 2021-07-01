import React, { useState, useEffect } from "react"
import { Tabs } from "antd"
import "@/assets/css/front/searchList.less"

//子组件
import ListContent from "./listContent"

const { TabPane } = Tabs

function SearchList(props: any) {
    //Hook
    const [tabKey, setTabKey] = useState<string>("application")

    //地址栏取参
    let locationData = props.location.pathname.split("/")[2]
    //banner
    let bannerImg: any
    if (locationData == "AnyBackup" || locationData == "any_backup_cloud") {
        bannerImg = (
            <div className="banner banner1">
                <img src={require("@/assets/images/anyBackup1.png")} alt="" />
                <p>全栈超可用的灾备云</p>
            </div>
        )
    } else if (locationData == "AnyShare" || locationData == "any_share_cloud") {
        bannerImg = (
            <div className="banner banner2">
                <img src={require("@/assets/images/anyshare1.png")} alt="" />
                <p>智能内容云 | 数字化时代的生产力平台</p>
            </div>
        )
    } else if (locationData == "AnyRobot" || locationData == "any_robot_cloud") {
        bannerImg = (
            <div className="banner banner3">
                <img src={require("@/assets/images/anyRobot1.png")} alt="" />
                <p>专注智能运维的日志云</p>
            </div>
        )
    } else {
        props.history.push("/404")
    }

    function tabCallback(key: any) {
        setTabKey(key)
    }

    return (
        <div>
            <div className="banner-block">{bannerImg}</div>
            <div className="top-tab-block">
                <Tabs animated={false} className="tab-block" activeKey={tabKey} onChange={tabCallback}>
                    <TabPane tab="应用" key="application">
                        {tabKey === "application" ? <ListContent tabData={tabKey} propData={props}></ListContent> : null}
                    </TabPane>
                    <TabPane tab="服务方案" key="service">
                        {tabKey === "service" ? <ListContent tabData={tabKey} propData={props}></ListContent> : null}
                    </TabPane>
                    <TabPane tab="解决方案" key="solution">
                        {tabKey === "solution" ? <ListContent tabData={tabKey} propData={props}></ListContent> : null}
                    </TabPane>
                </Tabs>
                <input id="table-key" type="hidden" value={tabKey} />
            </div>
        </div>
    )
}
export default SearchList
