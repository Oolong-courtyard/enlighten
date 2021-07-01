import React, { useEffect } from "react"
import { SettingFilled } from "@ant-design/icons"
import "@/assets/css/front/homePage.less"
import "@/assets/css/common.less"
import Until from "../../until/until"
const { NavLink } = require("react-router-dom")

export default function HomePage(props: any) {
    const linkData = {
        AnyBackup: {
            pathname: "/searchList/AnyBackup",
            data: { type: "AnyBackup" },
        },
        AnyShare: {
            pathname: "/searchList/AnyShare",
            data: { type: "AnyShare" },
        },
        AnyRobot: {
            pathname: "/searchList/AnyRobot",
            data: { type: "AnyRobot" },
        },
    }
    return (
        <div>
            <div>
                <div className="banner-block">
                    <div className="homepage-banner-img">
                        <p>
                            <span>Exchange应用社区</span>多重应用、方案、服务助力您业务成功
                        </p>
                    </div>
                </div>
                <div className="switch-block">
                    {/* <NavLink className="switch-item" to={linkData.AnyBackup}></NavLink> */}
                    <div className="switch-item">
                        {/* 正在建设中 */}
                        <img className="switch-img fl" src={require("@/assets/images/AnyBackup.png")} />
                        <div className="building-style"></div>
                        <div className="building-text">
                            <SettingFilled spin />
                            <span>正在建设，敬请期待</span>
                        </div>
                        <div className="switch-content">
                            <div className="link-title">全栈超可用的灾备云</div>
                            <div className="link-title">AnyBackup</div>
                        </div>
                    </div>
                    <NavLink className="switch-item" to={linkData.AnyShare}>
                        <img className="switch-img" src={require("@/assets/images/AnyShare.png")} />
                        <div className="switch-content">
                            <div className="link-title">智能内容云</div>
                            <div className="link-title">AnyShare</div>
                        </div>
                    </NavLink>
                    {/* <NavLink className="switch-item" to={linkData.AnyRobot}></NavLink> */}
                    <div className="switch-item">
                        {/* 正在建设中 */}
                        <img className="switch-img fl" src={require("@/assets/images/AnyRobot.png")} />
                        <div className="building-style"></div>
                        <div className="building-text">
                            <SettingFilled spin />
                            <span>正在建设，敬请期待</span>
                        </div>
                        <div className="switch-content">
                            <div className="link-title">专注智能运维的日志云</div>
                            <div className="link-title">AnyRobot</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
