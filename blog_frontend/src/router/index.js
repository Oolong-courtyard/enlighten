import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Hot from '../components/Hot'
import Cart from '../components/Cart'
import Index from "../components/Index";
import Login from "../components/Login";
import Register from "../components/Register";
import ArticleDetail from "../components/ArticleDetail";

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes  = [
  {
    path:'',
    redirect:'/Index'
  },
  {
    path:'/index',
    component:Index
  },
  {
    path:'/login',
    component: Login
  },
  // 每一{}就代表一条route
  {
    path: '/register',
    component: Register
  },
  {
    path: '/article-detail',
    component: ArticleDetail
  },
]

const router = new VueRouter(
  {
    routes,
    mode:'history'
  }
)

export default router
