import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

//导入ui库
import ElementUI from 'element-ui'

//导入 vue-infinite-scroll 滚动
import infiniteScroll from 'vue-infinite-scroll'

//导入网络请求库 axios
import axios from 'axios';

//导入markdown编辑器(mavonEditor)
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use mavonEditor
Vue.use(mavonEditor);

//根据环境变量配置请求的根路径
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Vue.prototype.$http = axios;
//配置文件index.js定义的可跨域路径
Vue.prototype.HOME = '/';
//跳转文章详情完整url
Vue.prototype.$articleDetailWholeUrl = process.env.VUE_APP_ARTICLE_URL;

/*
服务器API的接口url
*/
//qq登陆
Vue.prototype.$qqAuthorizationUrl = 'oauth/authorization';
//qq登陆并绑定用户信息到本应用
Vue.prototype.$qqUserUrl = 'oauth/qq/user?code=';
//用户数量
Vue.prototype.$usernameCountUrl = 'users/username-count';
//用户登陆
Vue.prototype.$userLoginUrl = "users/login";
//用户注册
Vue.prototype.$userRegisterUrl = "users/register";
//手机号数量
Vue.prototype.$phoneCount = "users/phone-count";
//获取手机验证码
Vue.prototype.$getSmsCode = "verification/sms/";

//TODO 文章列表(区分爬取的文章和用户发布的文章,后台通过origin来区分)
Vue.prototype.$articleListUrl = 'article/article-list/?page=';
//获取用户发布的文章列表
Vue.prototype.$publishArticleList = 'article/article-list/';

Vue.prototype.$articlePublish = 'business/article-publish/';
//文章详情
Vue.prototype.$articleDetailUrl = 'article/article-detail/';
//文章分类
Vue.prototype.$articleCategoryUrl = 'article/category/';
//文章搜索
Vue.prototype.$articleSearch = 'article/search';
//用户(行为)点赞文章
Vue.prototype.$Star = 'business/star';//todo 这里地址区分一下
//获取用户点赞的文章
Vue.prototype.$getStarCount = '/users/user-star-count';

//引用
Vue.use(ElementUI);
Vue.use(infiniteScroll);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

