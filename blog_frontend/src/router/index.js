import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Hot from '../components/Hot'
import Cart from '../components/Cart'

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes  = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/hot',
    component: Hot
  },
  {
    path: '/cart',
    component: Cart
  },
]

const router = new VueRouter(
  {
    routes,
    mode:'history'
  }
)

export default router
