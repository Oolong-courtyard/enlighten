import React from "react"
import { withRouter } from "react-router-dom"

function UserLayout(props: any) {
    return (
        <React.Fragment>
            <div>{props.children}</div>
        </React.Fragment>
    )

}

export default UserLayout