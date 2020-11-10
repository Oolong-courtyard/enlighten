<template>
  <!--  根div-->
  <div class="outOutermostDiv">
    <!--导航栏-->
    <div style="position: fixed;
                height:60px;width: 100%;
                background-color: white"
    >
      <div style="margin-left: 450px">
        <nav-bar></nav-bar>
      </div>
    </div>

    <!--为首页子菜单，内容为(推荐，后端，前端，等等)仅当首页被选中时显示-->
    <div class="submenuMainDiv">
      <ul style="display: flex">
        <li v-for="(classification,index) in this.class1"
            style="list-style: none"
            ref="class1"
        >
          <div @click="getClassData(classification)"
               class="indexSubmenu indexSubmenuSelected">{{ classification }}
          </div>
        </li>
      </ul>
    </div>

    <div class="outermostDiv">
      <!--第3层容器,在该层容器中展示所有效果-->
      <div class="secondDiv">
        <!--一键置顶-->
        <el-backtop></el-backtop>

        <!--内容div-->
        <!--第一个div只是为了占位，达到样式上的效果-->
        <div style="height: 50px"></div>
        <div style="height: 55px;background-color: #EFEFEF"></div>

        <!--只是为了占位，达到样式上的效果-->
        <!--      <div style="height: 50px"></div>-->

        <div class="contentDiv">
          <!--        load方法使用，如何下拉请求请数据并渲染，以及详情页的爬虫和详情页支持markdown。-->
          <ul v-infinite-scroll=""
              :infinite-scroll-immediate="false"
              :infinite-scroll-distance="300"
              style="overflow: hidden;">
            <li v-for="(res_item,index) in res_list_data"
                style="list-style: none"
            >
              <!--display:flex 让div内子元素水平排列,而不是默认的垂直排列-->
              <div class="item-list">
                <div style="width: 70%">
                  <div style="text-align: left;font-size: 10px">
                    <!--更新/发布时间后续处理为几小时或者几天前-->
                    {{ res_item.author }} · {{ res_item.updated_time }} ·
                    {{ res_item.category }}
                  </div>
                  <div class="article-name article-name2"
                       @click="getArticleDetail(res_item.article_id)"
                  >
                    {{ res_item.article_name }}
                  </div>
                </div>

                <div style="width: 30%">
                  <!--                <img :src="res_item.images" alt="" width="40" height="40">-->
                  <img src="../images/2.jpg" alt="" width="50" height="50">
                </div>
              </div>
              <!--添加分割线-->
              <hr style="height:1px;
            border:none;
            border-top:1px solid #C8C8C8;
">
            </li>
            <div @click="this.getArticleList"
                 class="readMore"
                 style="
               height: 40px;
               line-height:40px;
               text-align: center;
               border-radius: 20px;
               color: white;
               margin-top: 30px;
               margin-left: 50px;
               background-color: #A5A5A5 ;

               width: 600px;
">
              阅读更多
            </div>
            <div style="margin-top: 50px;
              text-align: center;
              line-height: 20px;
">
              <div
                style="color: #969696;height: 20px;display: flex;text-align: center;line-height: 20px">
                <div style="margin-left: 250px" class="bottomContact">关于启发</div>
                <div style="width: 10px">·</div>
                <div class="bottomContact">联系我们</div>
                <div style="width: 10px">·</div>
                <div class="bottomContact">加入我们</div>
              </div>
              <div
                style="margin-top: 5px;margin-bottom: 30px;height:20px;color: #C8C8C8;font-size: 15px">
                ©2020
                启发科技/enlighten/豫ICP备2020030059号-1
              </div>
            </div>
          </ul>

          <!--下拉加载-->
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>

      </div>

      <!--列表页右侧展示内容-->
      <div>
        <!--第一个div只是为了占位，达到样式上的效果-->
        <div style="height: 50px"></div>
        <div style="height: 55px;background-color: #EFEFEF"></div>
        <!--下载启发 手机app-->
        <div class="downloadApp"
             style="width: 280px;height: 300px;background-color: white;margin-left: 20px">
          <img style="height: 230px;width:280px" src="../images/wujie.png"
               alt="">
          <div style="display: flex">
            <img style="height: 70px;width: 70px"
                 src="../images/downloadApp.png" alt="">
            <div style="padding: 10px">
              <div style="color: #333333">下载启发手机app</div>
              <div style="margin-top: 5px;font-size: 13px;color: #909090">
                这里有你想要的所有技术知识
              </div>
            </div>
          </div>

        </div>
        <div class="justForPlaceholder"
             style="height: 15px;background-color: #EFEFEF"></div>
        <!--作者推荐-->
        <div class="recommendAuthor"
             style="width: 280px;height: 300px;background-color: white;margin-left: 20px">
          <div style="display: flex;justify-content: space-between">
            <div style="color: #969696;padding: 10px;">推荐作者</div>
            <div @click="changeRecommendAuthor"
                 style="color: #969696;padding: 10px;cursor:pointer;transform: rotate(360deg)">
              换一批
            </div>
          </div>
          <div>
            <ul>
              <li v-for="(recommendAuthor,index) in this.recommendAuthor"
                  style="list-style: none;text-align: center;height: 50px"
              >
                {{ recommendAuthor }}
              </li>
            </ul>
          </div>
          <div style="cursor: pointer;margin-top: 30px;text-align: center">查看全部
            >
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<script>

import {getArticleList, getClassArticleList} from 'network/home'
import NavBar from "../common/NavBar";

export default {
  name: "Index",
  components: {NavBar},
  data() {
    return {
      recommendAuthor: ['作者1', '作者2', '作者3', '作者4'],//推荐作者
      class1: ['推荐', '后端', '前端', 'ios', 'android'], //首页文章列表一级分类
      page: 1, //初始page为1
      current_article_index: 0, //每次下拉加载文章列表值增加10，初始值为0
      loading: false, //下拉加载
      res_list_data_len: 0, //返回文章列表的长度
      res_list_data: [], //请求服务器获取的文章列表
      res_detail_data: {}, //请求服务器获取的文章详情
    }
  },

  created() {
    //获取文章列表页信息,如果开启，
    this.getArticleList()
  },
  computed: {
    noMore() {
      return this.res_list_data_len >= 20
    },
    windowWidth() {
      //获取当前屏幕的宽度
      console.log('屏幕的宽度啊', document.documentElement.scrollWidth)
      return (document.documentElement.scrollWidth) + 'px';
    }
  },
  methods: {
    changeRecommendAuthor() {
      //换一批推荐作者

    },
    getClassData(classification) {
      //获取分类数据
      this.$http.get('category', {
        params: {
          category: classification,
          page: this.page
        }
      }).then(
        res => {
          console.log("请求的分类数据为", res.data)
          this.res_list_data = res.data.results
          //切换分类，调用一键置顶
          //TODO 如何主动调用一键置顶
        }
      )
    },
    load() {
      //TODO 需要nav-bar组件将分类选项传递过来，作为url参数请求服务器获取不同分类的文章
      // 动态加载列表数据
      console.log("触发了加载方法")
      this.loading = true
      // 调用服务端接口获取新数据
      this.getArticleList()

    },
    getArticleList() {
      //获取文章列表
      getArticleList(this.page).then(
        res => {
          console.log("来到了getArticleList,获取到的res的数据为", res.data.results)
          this.res_list_data = this.res_list_data.concat(res.data.results)
          console.log("此时的res_list_data为", this.res_list_data)
          // 每调用一次就把page+1
          this.page += 1
          console.log("此时的page为", this.page)
        }
      )


      // if (this.current_article_index == 0) {
      //   //第一次只加载前10条，每次下拉新加载10条
      //   //首先将current_article_index加5
      //   this.current_article_index += 10
      //   //获取文章列表
      //   getArticleList(this.current_article_index).then(res => {
      //     console.log("来到了getArticleList=====")
      //     this.res_list_data = res.data
      //   })
      // } else {
      //   //获取文章列表
      //   getArticleList(this.current_article_index).then(res => {
      //     console.log("来到了getArticleList=====")
      //     this.res_list_data = res.data
      //   })
      // }

    },
    getArticleDetail(id) {
      //获取文章详情
      window.open('http://localhost:8080/article-detail?id=' + `${id}`);
    },
  },
}
</script>

<style scoped>
.submenuMainDiv {
  box-shadow: 1px 1px 1px #C8C8C8;
  line-height: 30px;
  text-align: center;
  height: 30px;
  position: fixed;
  width: 100%;
  margin-top: 60px;
  margin-left: 450px;
  display: flex;
  background-color: white;
}

.indexSubmenu {
  /*  首页子菜单style*/
  width: 100px;
  color: black;
  cursor: pointer;
}

.indexSubmenuSelected:hover {
  /* 首页子菜单被选中时的style */
  color: #46698C;

}

.outOutermostDiv {
  background-color: white;
  width: 100%;
  height: 100%;
}

.outermostDiv {
  background-color: #EFEFEF;
  display: flex;
}

.secondDiv {
  width: 700px;
  margin-left: 450px;
  background-color: white;
}

.tabBarDiv {
  border: none;
}

.contentDiv {
  /*cursor 鼠标移动上去变小手*/
  /*cursor: pointer;*/
  margin-top: 50px;
}

.item-list {
  padding: 20px;
  margin-top: 10px;
  width: 100%;
  height: 100px;
  display: flex
}

.item-list:hover {
  /*background-color: #EFEFEF;*/
}

.article-name {
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  color: #333333;
}

.article-name2:hover {
  text-decoration: underline;
}

.readMore {
  cursor: pointer;
}

.bottomContact:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #333333;
}

</style>

