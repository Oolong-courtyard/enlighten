import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

//导入ui库
import ElementUI from 'element-ui'

//导入 vue-infinite-scroll 滚动
import infiniteScroll from 'vue-infinite-scroll'

//引用
Vue.use(ElementUI)
Vue.use(infiniteScroll)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
