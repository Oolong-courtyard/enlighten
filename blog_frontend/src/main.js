import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

//导入ui库
import ElementUI from 'element-ui'

//导入 vue-infinite-scroll 滚动
import infiniteScroll from 'vue-infinite-scroll'

//导入网络请求库 axios
import axios from 'axios';

//根据环境变量配置请求的根路径
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.prototype.$http = axios
//配置文件index.js定义的可跨域路径
Vue.prototype.HOME = '/'
//跳转文章详情完整url
Vue.prototype.$articleDetailWholeUrl = process.env.VUE_APP_ARTICLE_URL

/*
服务器API的接口url
*/
//qq登陆
Vue.prototype.$qqAuthorizationUrl = 'oauth/authorization'
//qq登陆并绑定用户信息到本应用
Vue.prototype.$qqUserUrl = 'oauth/qq/user?code='
//用户数量
Vue.prototype.$usernameCountUrl = 'users/username-count'
//用户登陆
Vue.prototype.$userLoginUrl = "users/login"
//用户注册
Vue.prototype.$userRegisterUrl = "users/register"

//文章列表
Vue.prototype.$articleListUrl = 'article/article-list/?page='
//文章详情
Vue.prototype.$articleDetailUrl = 'article/article-detail/'
//文章分类
Vue.prototype.$articleCategoryUrl = 'article/category/'
//文章搜索
Vue.prototype.$articleSearch = 'article/search'

//引用
Vue.use(ElementUI)
Vue.use(infiniteScroll)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

