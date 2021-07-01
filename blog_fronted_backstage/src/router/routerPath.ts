//back
import AppListManage from "../pages/back/appListManage" //应用列表
import AppDetailAction from "../pages/back/appDetailAction" //应用详情
import DraftListManage from "../pages/back/draftListManage" //草稿箱
import TagManage from "../pages/back/tagManage" //标签管理
import classManage from "../pages/back/classManage" //分类管理
import OfflineListManage from "../pages/back/offlineListManage" //下架应用列表

//登陆
import Login from "../pages/user/login"
import Admin from "../pages/user/admin"

//front
import HomePage from "../pages/front/homePage" //首页
import AppDetail from "../pages/front/appDetail" //应用详情
import SearchList from "../pages/front/searchList" //应用一览展示

//开发用正式版删除
import SwiperDemo from "../pages/front/swpierComponent"

let router = {
    //后台管理员页面
    manager: [
        {
            path: "/manager", //首页默认加载的页面
            componentName: AppListManage,
            exact: true, //是否为严格模式
        },
        {
            path: "/manager/appListManage", //首页默认加载的页面
            componentName: AppListManage,
            exact: false, //是否为严格模式
        },
        {
            path: "/manager/appDetailAction/:record_type/:record_id", //首页默认加载的页面
            componentName: AppDetailAction,
            exact: false, //是否为严格模式
        },
        {
            path: "/manager/addAppDetailAction", //首页默认加载的页面
            componentName: AppDetailAction,
            exact: false, //是否为严格模式
        },
        {
            path: "/manager/OfflineListManage", //首页默认加载的页面
            componentName: OfflineListManage,
            exact: false, //是否为严格模式
        },
        {
            path: "/manager/draftListManage", //首页默认加载的页面
            componentName: DraftListManage,
            exact: false, //是否为严格模式
        },
        {
            path: "/manager/tagManage", //首页默认加载的页面
            componentName: TagManage,
            exact: false, //是否为严格模式
        },
        {
            path: "/manager/classManage", //首页默认加载的页面
            componentName: classManage,
            exact: false, //是否为严格模式
        },
        {
            path: "/manager/admin", //首页默认加载的页面
            componentName: Admin,
            exact: false, //是否为严格模式
        },
        //开发用（正式版删除）
        // ------------------
    ],
    user: [
        {
            path: "/login", //首页默认加载的页面
            componentName: Login,
            exact: false, //是否为严格模式
        },
    ],
    //前台展示页面
    front: [
        {
            path: "/", //首页默认加载的页面
            componentName: HomePage,
            exact: true, //是否为严格模式
        },
        {
            path: "/appDetail/:recordId", //首页默认加载的页面
            componentName: AppDetail,
            exact: false, //是否为严格模式
        },
        {
            path: "/appDetailPreview", //首页默认加载的页面
            componentName: AppDetail,
            exact: false, //是否为严格模式
        },
        {
            path: "/searchList/:search_type", //首页默认加载的页面
            componentName: SearchList,
            exact: false, //是否为严格模式
        },
        {
            path: "/swiperDemo", //首页默认加载的页面
            componentName: SwiperDemo,
            exact: false, //是否为严格模式
        },
    ],
}

export default router
