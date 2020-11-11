import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

//导入ui库
import ElementUI from 'element-ui'

//导入 vue-infinite-scroll 滚动
import infiniteScroll from 'vue-infinite-scroll'

//导入网络请求库 axios
import axios from 'axios';

//开发/生产
// Vue.prototype.debug = true

//配置请求的根路径
// axios.defaults.$baseURL = 'http://106.15.8.3:8000'
axios.defaults.baseURL = 'http://127.0.0.1:8000'
Vue.prototype.$http = axios
Vue.prototype.HOME = '/index'    //重要在于这里，Vue.prototype.HOME = '/api'是一个定值，默认指向localhost，所有修改指向路径为'/api'，配置文件index.js定义的可跨域路径


//引用
Vue.use(ElementUI)
Vue.use(infiniteScroll)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

