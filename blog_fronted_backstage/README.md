#### react 学习进度：（P16）地址：https://www.bilibili.com/video/BV14y4y1g7M4?p=16&spm_id_from=pageDriver

##### 1、初始化一个react项目
```
1. 使用命令： npx create-react-app {项目名称}
2. 执行 npm start
```

#### 2、 react的基本使用
```
//1. 导入react
import React from 'react'
import ReactDOM from 'react-dom'

//2. 创建react元素
const title = React.createElement('h1', null, 'hello react')

//3. 渲染元素
ReactDOM.render(title, document.getElementById('root'))
```

#### 3、 JSX语法
```
1. 使用 React.createElement 存在几个问题： 不简洁、不直观、不优雅
2. 注意灵活使用 三元表达式  xx?():()

```
