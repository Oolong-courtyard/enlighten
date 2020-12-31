import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from "../components/Index";

//配置路由的懒加载(按需加载),即:除了首页之外,其他页面只有点击之后才请求加载
const ArticleDetail = () => import("@/components/ArticleDetail")
const ArticlePublish = () => import("@/components/ArticlePublish")

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  // 每一{}就代表一条route
  {
    path: '/article-detail',
    component: ArticleDetail
  },
  {
    path:'/article-publish',
    component: ArticlePublish
  },
]

const router = new VueRouter(
  {
    routes,
    mode: 'history'
  }
)

export default router
