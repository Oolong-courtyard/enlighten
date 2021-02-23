<!--文章列表-->
<template>
  <!--  根div-->
  <div class="outOutermostDiv">
    <!--导航栏-->
    <div style="position: fixed;
                height:60px;
                width: 100%;
                background-color: white;
                z-index: 999;
"
    >
      <div :style="'margin-left:'+marginLeft+ 'px'">
        <nav-bar
          ref="navbar"
          @child-event="getSearchData"
          @userStarArticle="userStarArticle"
          @clearStarArticle="clearStarArticle"
        ></nav-bar>
      </div>
    </div>

    <!--为首页子菜单，内容为(推荐，后端，前端，等等)仅当首页被选中时显示-->
    <div class="submenuMainDiv" :style="'margin-left:'+marginLeft+'px' ">
      <ul style="display: flex">
        <li v-for="(classification,index) in this.class1"
            style="list-style: none"
            ref="class1"
        >
          <!-- classification 当前选中的分类的颜色应该不一样 -->
          <!-- :style="{'color':this.categoryTag==classification?'#4096EF':'black'}"-->
          <!--TODO 选中tab分类,改变文字颜色未完成-->
          <div @click="getClassDataBefore(classification)"
               class="indexSubmenu indexSubmenuSelected"
          >{{ classification }}
          </div>
        </li>
      </ul>
    </div>
    <!--TODO 关键点在下面这里,背景颜色灰色。。。-->
    <div class="outermostDiv">
      <!--第3层容器,在该层容器中展示所有效果-->
      <div class="secondDiv" :style="'margin-left:'+marginLeft+'px'">
        <!--一键置顶-->
        <el-backtop ref="ElBacktop"></el-backtop>

        <!--内容div-->
        <!--第一个div只是为了占位，达到样式上的效果-->
        <div style="height: 50px"></div>
        <div style="height: 55px;background-color: #EFEFEF"></div>

        <!--只是为了占位，达到样式上的效果-->
        <!--      <div style="height: 50px"></div>-->

        <div class="contentDiv">
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
            <div @click="this.getMoreArticleBefore"
                 class="readMore"
                 v-else
            >
              阅读更多
            </div>
            <div
              style="margin-top: 50px;text-align: center;line-height: 20px;font-size: 18px"
            >
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
          <!--          <p v-if="loading">加载中...</p>-->
        </div>

      </div>

      <!--列表页右侧展示内容-->
      <div>
        <!--第一个div只是为了占位，达到样式上的效果-->
        <div style="height: 50px"></div>
        <div style="height: 55px;background-color: #EFEFEF"></div>
        <!--下载启发 手机app-->
        <div class="downloadApp"
             style="width: 280px;height: 560px;background-color: white;margin-left: 20px">
          <img style="height: 230px;width:280px" src="../images/wujie.png"
               alt="">
          <img style="height: 230px;width:280px" src="../images/golang.png"
               alt="">
          <div style="display: flex;">
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
import {getArticleList} from 'network/home';
import {timeago} from "@/common/time";
import {getUserStarCount} from "@/common/getUserStarCount"

const NavBar = () => import("../common/NavBar");

export default {
  name: "Index",
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
    console.log("this.marginLeft", this.marginLeft);
    this.getArticleList()
  },
  updated() {
    //data改变时触发
  },
  mounted() {
    // console.log("此时的环境变量为",process.env);
    //设置首页显示默认分类
    console.log("进入了mounted");
    this.categoryTag = "推荐";
    //每一次页面加载获取localStorage中的点赞文章
    if (localStorage.getItem("userArticleStars") != null) {
      this.userArticleStars = this.userArticleStars.concat(localStorage.getItem("userArticleStars").split(","));
    }
    console.log("用户文章点赞的列表是", this.userArticleStars);
    //根据地址栏中是否有code参数请求server获取用户的openid
    let code = this.get_query_string('code');
    if (code != null) {
      console.log("从地址栏中获取到的code为", code)
      this.$http.get(this.$qqUserUrl + code, {responseType: 'json'}).then(
        res => {
          //成功处理
          localStorage.setItem('username', res.data.data.username)
          localStorage.setItem('userId', res.data.data.user_id)
          localStorage.setItem('userToken', res.data.data.token);
          // this.$router.go(0) //刷新当前页面
          console.log("跳转后的url地址是", this.$http.defaults.baseURL)
          //TODO 现在第三方登录有点问题，这里无法执行。再次请求服务器获取该用户已经点赞的文章列表
          // this.$http.get(
          //   this.$getStarCount,
          //   {
          //     headers: {"x-token": localStorage.getItem('userToken')},
          //     params: {"user_id": localStorage.getItem("userId")},
          //   }).then(
          //   res => {
          //     console.log("获取用户点赞文章success")
          //     //将获取到的点赞文章存入localStorage
          //     localStorage.setItem("userArticleStars", res.data.data);
          //     //第三方登录之后没有再刷新页面,因此这里需要直接设置data中的userArticleStars
          //     this.userArticleStars = this.userArticleStars.concat(res.data.data);
          //     location.reload();
          //   }
          // ).catch(
          //   err => {
          //     //TODO 处理失败
          //   }
          // )
          location.href = '/'; //重新跳转到首页
        }
      ).catch(
        err => {
          //失败处理
          this.$message({
            message: '第三方登录失败',
            type: 'warning'
          })
        }
      )
    }
  },
  computed: {
    // noMore() {
    //   return this.resListData_len >= 20
    // },
    windowWidth() {
      //获取当前屏幕的宽度
      console.log('屏幕的宽度啊', document.documentElement.scrollWidth)
      return (document.documentElement.scrollWidth) + 'px';
    },
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
    clickCommentCount(index, article_id, comment_count) {
      /*
      TODO 评论按钮显示当前文章的评论数量，点击评论按钮直接跳转到该文章的详情页的评论区；
      */
    },
    getMoreSearchData() {
      //根据检索条件获取更过的数据
      this.$http.get(this.$articleSearch, {params: {articleName: this.searchInputValue, page: this.page}})
        .then(
          res => {
            //只需要将请求到的数据append进resListData
            this.resListData = this.resListData.concat(res.data.data)
            console.log("搜索到的文章列表是", this.resListData)
            this.page += 1
          }
        )
        .catch(
          err => {
            console.log("响应异常了", err)
            this.noMore = true
          }
        )
    },
    clearStarArticle() {
      //清空本组件中的userArticleStars
      this.userArticleStars = [];
    },
    userStarArticle(data) {
      //子组件NavBar传递给本组件值,将结果设置给userArticleStars
      this.userArticleStars = data;
    },
    getSearchData(data) {
      //子组件NavBar传递给本组件值,将结果设置给resListData
      console.log("data是", data);
      //将当前操作设置为 `isSearch`
      this.lastClick = "isSearch";
      //将搜索输入框中的值设置到data中,用于在阅读更多的时候使用
      this.searchInputValue = data.searchInput;
      this.noMore = false;
      this.resListData = [];
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.resListData = this.resListData.concat(data.resData);
        //评论数为0的话,直接不显示
        this.commentEqualZero(this.resListData);
        this.page = data.pageNum + 1
      }, 1000);
      //置顶
      this.$refs.ElBacktop.handleClick()
    },
    get_query_string: function (name) {
      // 获取url路径参数
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      let r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      }
      return null;
    },
    changeRecommendAuthor() {
      //换一批推荐作者
    },
    getMoreArticleBefore() {
      //点击阅读更多时,判断当前
      if (this.lastClick == "isCategory") {
        //上一次操作为分类操作
        this.getMoreCategoryArticle()
      } else if (this.lastClick == "isSearch") {
        //上一次操作为检索操作
        this.getMoreSearchData()
      }
    },
    getMoreCategoryArticle() {
      //获取更多文章
      //使用三元,推荐系统还没上,所以检索的条件只能是空,
      let category = (this.categoryTag == "推荐" ? "" : this.categoryTag)
      this.$http.get(this.$articleCategoryUrl, {
        params: {
          category: category,
          page: this.page
        }
      }).then(
        res => {
          this.resListData = this.resListData.concat(res.data.data)
          this.page += 1
        }
      ).catch(
        err => {
          console.log("错误信息是", err)
          this.noMore = true
        }
      )
    },
    getClassDataBefore(classification) {
      //调用分类函数之前稍做延时加载
      //如果当前要请求的分类标签与 this.categoryTag的值相同,该函数无需做任何操作,直接结束。
      if (this.categoryTag == classification) {
        return;
      }
      //当前操作是 获取分类数据的操作
      this.lastClick = "isCategory";
      //重置noMore
      this.noMore = false;
      //每次将列表数据清空,以便添加新的分类数据
      this.resListData = []
      //设置加载中为true
      this.loading = true
      setTimeout(() => {
        this.getClassData(classification)
      }, 1000)
    },
    getClassData(classification) {
      //获取相应分类的文章
      //设置加载中为false
      console.log("此时的this.categoryTag: ", this.categoryTag)
      console.log("此时的classification:", classification)
      this.loading = false
      //每一次切换分类page应当重置为1,列表页面回到顶部
      this.page = 1;
      //此时的分类存入data中,后续在阅读更多的时候分类直接取data中的值即可
      this.categoryTag = classification;
      //如果此时
      //获取分类数据
      if (classification == "推荐") {
        //如果分类标签是推荐的话,目前是直接请求未分类数据库数据
        //TODO 后续推荐API接口出现的话再更换
        this.getArticleList()
      } else {
        //其他分类标签,调用分类接口,返回分类数据
        this.$http.get(this.$articleCategoryUrl, {
          params: {
            category: classification,
            page: this.page
          }
        }).then(
          res => {
            console.log("请求的分类数据为", res.data)
            console.log("this.resListData是", this.resListData)
            //TODO 后台API返回数据格式统一化在进行中...
            this.resListData = this.resListData.concat(res.data.data)
            //评论数为0的话,直接不显示
            this.commentEqualZero(this.resListData)
          }
        )
      }
      //无论是哪个分类,更换分类,列表页面回到顶部
      this.$refs.ElBacktop.handleClick()
    },
    load() {
      //TODO 需要nav-bar组件将分类选项传递过来，作为url参数请求服务器获取不同分类的文章
      // 动态加载列表数据
      console.log("触发了加载方法")
      this.loading = true
      // 调用服务端接口获取新数据
      this.getArticleList()
    },
    getArticleList(userId) {
      //获取文章列表
      console.log('文章列表的url为', this.$articleListUrl);
      getArticleList(this.page).then(
        res => {
          console.log("来到了getArticleList,获取到的res的数据为", res.data)
          //将获取到的数据添加到 resListData 中
          this.resListData = this.resListData.concat(res.data.data)
          //
          //评论数为0的话,直接不显示
          this.commentEqualZero(this.resListData)
          // console.log("此时的resListData为", this.resListData)
          // 每调用一次就把page+1
          this.page += 1
          // console.log("此时的page为", this.page)
        }
      );


      // if (this.current_article_index == 0) {
      //   //第一次只加载前10条，每次下拉新加载10条
      //   //首先将current_article_index加5
      //   this.current_article_index += 10
      //   //获取文章列表
      //   getArticleList(this.current_article_index).then(res => {
      //     console.log("来到了getArticleList=====")
      //     this.resListData = res.data
      //   })
      // } else {
      //   //获取文章列表
      //   getArticleList(this.current_article_index).then(res => {
      //     console.log("来到了getArticleList=====")
      //     this.resListData = res.data
      //   })
      // }

    },
    getArticleDetail(id) {
      //获取文章详情
      console.log("this.$articleDetailWholeUrl是", this.$articleDetailWholeUrl)
      console.log("请求的url地址是", this.$articleDetailWholeUrl + '?id=' + `${id}`)
      window.open(this.$articleDetailWholeUrl + '?id=' + `${id}`);
    },
    commentEqualZero(resListData) {
      //评论数为0的话,直接不显示
      for (let i = 0, len = resListData.length; i < len; i++) {
        console.log("this.resListData[i].comment_count", this.resListData[i].comment_count)
        if (this.resListData[i].comment_count == 0) {
          this.resListData[i].comment_count = null
        }
      }
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

