<template>
  <!--用户原创文章发布列表-->
  <div style="position: relative;background-color: #EFEFEF;width: 100%;height: 100%">
    <!--导航栏-->
    <div style="position: fixed;
                height:60px;
                width: 100%;
                background-color: white;
                z-index: 999;
"
    >
      <div :style="'margin-left:'+ marginLeft + 'px'">
        <nav-bar ref="navbar"></nav-bar>
      </div>
    </div>

    <!--文章列表-->
    <!--第一个div只是为了占位，达到样式上的效果-->
    <div style="height: 35px;background-color: #EFEFEF"></div>
    <!--只是为了占位，达到样式上的效果-->
    <!--      <div style="height: 50px"></div>-->
    <div class="contentDiv" :style="'margin-left:'+ marginLeft + 'px'">
      <!--        load方法使用，如何下拉请求请数据并渲染，以及详情页的爬虫和详情页支持markdown。-->
      <ul v-infinite-scroll=""
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :infinite-scroll-immediate="false"
          :infinite-scroll-distance="300"
          style="overflow: hidden;font-size: 30px">
        <li v-for="(res_item,index) in resListData"
            style="list-style: none"
        >
          <!--display:flex 让div内子元素水平排列,而不是默认的垂直排列-->
          <div class="item-list">
            <div style="width: 80%">
              <div style="text-align: left;font-size: 10px;color: #B2BAC2">
                <!--更新/发布时间后续处理为几小时或者几天前-->
                {{ res_item.author }} · {{ res_item.publish_time |transPublishTime(res_item.publish_time) }} ·
                {{ res_item.category }}
              </div>
              <div class="article-name article-name2"
                   @click="getArticleDetail(res_item.article_id)"
              >
                {{ res_item.article_name }}
              </div>
              <!--点赞-->
              <div style="margin-top: 20px;">
                <!--TODO 点赞,关于点赞和评论图标的样式，后续可以找更好看的-->
                <!--                    :style="{'background-color':userArticleStars.indexOf(res_item.article_id) == -1?'':'#66AEE1'}"-->
                <el-button class="starStyle"
                           :style="{'background-color':userArticleStars.indexOf(res_item.article_id) == -1?'':'#66AEE1'}"
                           @click="clickStarCount(index,res_item.article_id,res_item.star_count)">
                  <!--                                              :style="{'color':userArticleStars.indexOf(res_item.article_id) == -1?'':'white'}">-->
                  <div :style="{'color':userArticleStars.indexOf(res_item.article_id) == -1?'':'white'}"
                  >
                    👍 {{ res_item.star_count }}
                  </div>
                </el-button>
                <!--评论-->
                <el-button class="commentStyle"
                           @click="clickCommentCount(index,res_item.article_id,res_item.comment_count)">
                  评论 {{ res_item.comment_count }}
                </el-button>
              </div>
              <!--              <div style="margin-top: 20px;">-->
              <!--                &lt;!&ndash;TODO 点赞,关于点赞和评论图标的样式，后续可以找更好看的&ndash;&gt;-->
              <!--                &lt;!&ndash;                    :style="{'background-color':userArticleStars.indexOf(res_item.article_id) == -1?'':'#66AEE1'}"&ndash;&gt;-->
              <!--                <el-button class="starStyle"-->
              <!--                           :style="{'background-color':userArticleStars.indexOf(res_item.article_id) == -1?'':'#66AEE1'}"-->
              <!--                           >-->
              <!--                  &lt;!&ndash;                                              :style="{'color':userArticleStars.indexOf(res_item.article_id) == -1?'':'white'}">&ndash;&gt;-->
              <!--                  <div :style="{'color':userArticleStars.indexOf(res_item.article_id) == -1?'':'white'}"-->
              <!--                  >-->
              <!--                    👍 {{ res_item.star_count }}-->
              <!--                  </div>-->
              <!--                </el-button>-->
              <!--                &lt;!&ndash;评论&ndash;&gt;-->
              <!--                <el-button class="commentStyle"-->
              <!--                           @click="clickCommentCount(index,res_item.article_id,res_item.comment_count)">-->
              <!--                  评论 {{ res_item.comment_count }}-->
              <!--                </el-button>-->
              <!--              </div>-->
            </div>

            <!--                <div style="width: 20%">-->
            <!--                                  <img :src="res_item.images" alt="" width="40" height="40">-->
            <!--                  <img src="../images/2.jpg" alt="" width="50" height="50">-->
            <!--                </div>-->
          </div>
          <!--添加分割线-->
          <hr style="height:1px;
            border:none;
            border-top:1px solid #C8C8C8;
">
        </li>
        <div class="noMoreList"
             v-if="noMore"
        >
          已经到底啦!
        </div>
        <div
          class="readMore"
          v-else
        >
          <!--          @click="this.getMoreArticleBefore"-->
          阅读更多
        </div>
      </ul>
      <!--下拉加载-->
      <!--          <p v-if="loading">加载中...</p>-->
    </div>
  </div>
</template>

<script>
import {timeago} from "@/common/time";

const NavBar = () => import("../common/NavBar");

export default {
  name: "myPublishArticle",
  components: {NavBar},
  data() {
    return {
      marginLeft: (document.documentElement.clientWidth -1000)*0.45, //动态获取屏幕宽度
      recommendAuthor: ['作者1', '作者2', '作者3', '作者4'],//推荐作者
      class1: ['推荐', '后端', '前端', 'iOS', 'Android'], //首页文章列表一级分类 TODO 用户未登录的时候不显示 推荐 按钮，登录之后 推荐 按钮样式改变
      page: 1, //初始page为1
      current_article_index: 0, //每次下拉加载文章列表值增加10，初始值为0
      loading: false, //请求数据加载中
      res_list_data_len: 0, //返回文章列表的长度
      resListData: [], //请求服务器获取的文章列表
      res_detail_data: {}, //请求服务器获取的文章详情
      categoryTag: "推荐", //首页文章分类的标签
      noMore: false,//是否有更多的数据
      lastClick: "isCategory",//用于点击阅读更多判断当前是`tab分类`还是`检索`(只能是`isCategory`,`isSearch`)
      searchInputValue: "",//存储子组件NavBar中输入框中的值
      userArticleStars: [],//存放用户点赞过的文章id。(用户登陆成功的同时，获取该用户已经点赞的文章id存放到该变量中。)
    }
  },
  created() {
    //获取文章列表页信息,如果开启，
    this.getArticleList()
  },
  methods: {
    async clickStarCount(index, article_id, star_count) {
      /*
      改变文章的点赞数
      已经登陆的用户才可以点赞(当前文章的点赞数加一);未登陆用户点赞弹出登陆对话框诱导用户登陆;点赞之后再点一次是取消点赞(当前文章的点赞数减一);
       */
      //如果userArticleStars中根据article_id获取到值，说明该文章已经被该用户点过赞,此时应当取消点赞；
      //如果未获取到值，说明该文章未被该用户点过赞，此时点赞数加1；
      //TODO 可以开始做后台(文章被点赞数和用户点赞的文章,以及表结构设计，用户信息采集->用户画像构建->推荐算法和模型训练->生成推荐数据并返回)
      //已经登陆的用户才可以点赞
      console.log("localStorage中用户点赞文章列表是", localStorage.getItem("userArticleStars"))
      if (localStorage.getItem("username") === null) {
        //本地为获取到username.当前用户为未登录状态,弹出登录对话框
        this.$refs.navbar.loginDialogFormVisible = true;
      }
      if (localStorage.getItem("username") != null) {
        //用户登陆过(localStorage不会自动清理)
        //所以要判断用户token是否过期,如果token过期,用户需重新登陆
        this.$http.put(
          this.$Star,
          {
            "user_id": localStorage.getItem("userId"),
            "article_id": article_id,
            "action": this.userArticleStars.indexOf(article_id) == -1 ? "1" : "0",
          },
          {headers: {"x-token": localStorage.getItem("userToken")}},
        ).then(
          res => {
            //点赞/取消点赞成功 data中数据如何改变？画面如何渲染
            console.log("点赞/取消点赞成功后返回的res是", res)
            console.log("点赞/取消点赞成功后返回的res的status是", res.status)
            if (res.status == 200) {
              //点赞/取消点赞成功
              let action = this.userArticleStars.indexOf(article_id) == -1 ? "1" : "0"
              console.log("action是", action);
              //本地存储中用户点赞文章
              let uAStar = localStorage.getItem("userArticleStars").split(",")
              if (action == "1") {
                //点赞,该文章没有被该用户点赞,将该文章id添加到userArticleStars中
                this.userArticleStars.push(article_id);
                //这里应对的是页面刷新的情况
                uAStar.push(article_id);
                //将uAStar转换为字符串并存储到localStorage中
                let userArticleStarsStr = uAStar.toString()
                localStorage.setItem("userArticleStars", userArticleStarsStr)
                this.resListData[index].star_count += 1
              } else if (action == "0") {
                //取消点赞
                //该文章已经被该用户点赞,此时取消点赞
                console.log("this.resListData[index].star_count", this.resListData[index].star_count)
                console.log("this.resListData是", this.resListData)
                this.resListData[index].star_count -= 1;
                this.userArticleStars.splice(this.userArticleStars.indexOf(article_id), 1);
                //这里应对的是页面刷新的情况
                uAStar.splice(uAStar.indexOf(article_id), 1);
                //将uAStar转换为字符串并存储到localStorage中
                let userArticleStarsStr = uAStar.toString()
                localStorage.setItem("userArticleStars", userArticleStarsStr)
              }
            }
          }
        ).catch(
          err => {
            if (err.response.status == 403) {
              //提示用户token过期需要重新登录
              this.$message({
                message: "token过期,请重新登录",
                type: 'warning'
              });
              //TODO 改变右上角登录按钮未退出状态

              setTimeout(() => {
                //token过期,需要弹出登陆对话框
                this.$refs.navbar.loginDialogFormVisible = true;
              }, 500)
            } else {
              //点赞失败，弹窗对话框，提示用户稍后重试
              this.$message({
                message: "操作失败,请稍后重试",
                type: 'warning'
              })
            }
            //点赞/取消点赞失败
            console.log("点赞/取消点赞失败后返回的res是", err)
          }
        )
      }
    },
    getArticleList() {
      //获取作者发布的文章列表
      this.$http.get(this.$publishArticleList + "?page=" + this.page.toString() + "&origin=enlighten").then(
        res => {
          //将获取到的数据添加到 resListData 中
          this.resListData = this.resListData.concat(res.data.data);
          this.page += 1
        }
      ).catch(
        err => {
          console.log("获取发布文章列表失败")
        }
      );
    },
    getArticleDetail(id) {
      //获取文章详情
      window.open(this.$articleDetailWholeUrl + '?id=' + `${id}`);
    },
  },
  filters: {
    transPublishTime(publishTime) {
      //将发布时间转换为数天前的格式
      return timeago(publishTime)
    },
  },
}
</script>

<style scoped>
.el-icon-loading {
  font-size: 50px;
}

.starStyle {
  /*列表页点赞和评论*/
  /*font-size: 10px;*/
  /*display: flex;*/
  height: 32px;
  width: 50px;
  text-align: center;
  padding: 0
  /*position: center;*/
}

.commentStyle {
  /*列表页点赞和评论*/
  /*font-size: 10px;*/
  /*display: flex;*/
  height: 32px;
  width: 50px;
  text-align: center;
  padding: 0;
  /*position: center;*/
}

.submenuMainDiv {
  box-shadow: 1px 1px 1px #C8C8C8;
  line-height: 30px;
  text-align: center;
  height: 30px;
  position: fixed;
  z-index: 999;
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
  color: #409EFF;

}

.outOutermostDiv {
  background-color: white;
  width: 100%;
  height: 100%;
}

.outermostDiv {
  height: 100%;
  background-color: #EFEFEF;
  display: flex;
  position: relative;
  z-index: 998;
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
  width: 800px;
  /*left: 0;*/
  /*right: 0;*/
  /*margin: 0 auto;*/
  background-color: white;
}

.item-list {
  padding: 20px;
  margin-top: 10px;
  width: 80%;
  height: 100px;
  background-color: white;
  /*display: flex*/
}

.item-list:hover {
  /*background-color: #EFEFEF;*/
}

.article-name {
  cursor: pointer;
  /*text-align: center;*/
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  color: #333333;
}

.article-name2:hover {
  text-decoration: underline;
}

.noMoreList {
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: #A5A5A5;
  margin-top: 30px;
  margin-left: 50px;
  width: 600px;
}

.readMore {
  font-size: 20px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  color: white;
  margin-top: 30px;
  margin-left: 50px;
  background-color: #B2BAC2;
  width: 600px;
}

.bottomContact:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #333333;
}

</style>
