import React from "react"
import ReactDOM from "react-dom"
import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import Router from "./router/router"

ReactDOM.render(<Router />, document.getElementById("root"))
