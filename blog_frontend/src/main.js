import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

//导入ui库
import ElementUI from 'element-ui'

//引用
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
