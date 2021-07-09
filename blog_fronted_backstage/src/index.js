//1. 导入react
import ReactDOM from 'react-dom'
import EchartsTest from './EchartsTest'

//2. 创建react元素
// const title = React.createElement('h1', null, 'hello react')
// 使用JSX 语法
const charts = <EchartsTest/>

//3. 渲染元素
ReactDOM.render(charts, document.getElementById('root'))
