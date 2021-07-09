//1. 导入react
import React from 'react'
import ReactDOM from 'react-dom'

//2. 创建react元素
// const title = React.createElement('h1', null, 'hello react')
// 使用JSX 语法
const name = "liuzh"
const title = (
    <h1 className="title">hello JSX {name}</h1>
)

//3. 渲染元素
ReactDOM.render(title, document.getElementById('root'))
