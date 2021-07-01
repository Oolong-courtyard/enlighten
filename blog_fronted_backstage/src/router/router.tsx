import React, { useState, useEffect } from "react"
import { Result, Button } from "antd"
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom"
import router from "./routerPath"
import BaseLayout from "../pages/layout/back/BaseLayout"
import FrontLayout from "../pages/layout/front/FrontLayout"
import UserLayout from "../pages/layout/back/userLayout"

function App(props: any) {
    let [userType, setUserType] = useState<any>("2")

    useEffect(() => {
        userType = window.localStorage.getItem("userType")
        setUserType(userType)
    }, [])

    const userTypeHandle = (type: string) => {
        setUserType(type)
    }

    const EmptyPage = () => {
        return <Result style={{ height: "80vh", paddingTop: "10%" }} status="404" title="404" subTitle="对不起,该页面不存在" />
    }
    const PermissionPage = () => {
        return <Result style={{ height: "80vh", paddingTop: "10%" }} status="403" title="403" subTitle="对不起,您没有访问此页面的权限" />
    }
    return (
        <Router>
            <Switch>
                {userType === "2" || userType === "3" ? (
                    <BaseLayout path="/Manager" propValue={props}>
                        <Switch>
                            {router.manager.map(({ path, componentName, exact = true }, key) => {
                                return <Route exact={exact} key={key} path={path} component={componentName} />
                            })}
                            <Route component={EmptyPage} />
                        </Switch>
                    </BaseLayout>
                ) : (
                    ""
                )}

                <UserLayout path="/login" propValue={props}>
                    <Switch>
                        {router.user.map(({ path, componentName, exact = true }, key) => {
                            return <Route exact={exact} key={key} path={path} component={componentName} />
                        })}
                        <Route component={EmptyPage} />
                    </Switch>
                </UserLayout>
                <FrontLayout path="/" propValue={props} typeHandle={userTypeHandle}>
                    <Switch>
                        {router.front.map(({ path, componentName, exact = true }, key) => {
                            return <Route exact={exact} key={key} path={path} component={componentName} />
                        })}
                        <Route path="/nopermission" component={PermissionPage} exact={true} />
                        <Route component={EmptyPage} />
                    </Switch>
                </FrontLayout>
                <Route component={EmptyPage} />
            </Switch>
        </Router>
    )
}

export default App
