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
axios.defaults.baseURL = process.env.BASE_URL
Vue.prototype.$http = axios
//配置文件index.js定义的可跨域路径
Vue.prototype.HOME = '/'
//qq登陆并绑定用户信息到本应用
Vue.prototype.$qqUser = 'oauth/qq/user?code='



//引用
Vue.use(ElementUI)
Vue.use(infiniteScroll)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

