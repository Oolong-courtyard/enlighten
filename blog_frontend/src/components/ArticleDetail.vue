<!--文章详情页-->
<template>
  <!--  根div-->
  <!--  :style="{'display':this.pageNotFound?'none':'flex'}"-->
  <div class="outermostDiv">

    <!--第二层容器,在该层容器中展示所有效果-->
    <div class="secondDiv" v-if="this.pageNotFound==false">
      <!--一键置顶-->
      <el-backtop></el-backtop>

      <ul v-infinite-scroll="load"
          :infinite-scroll-immediate="false"
          :infinite-scroll-distance="300"
          style="overflow: hidden">

        <!--菜单栏-->
        <nav-bar></nav-bar>
        <!--第一个div只是为了占位，达到样式上的效果-->
        <div style="height: 100px"></div>
        <!--    作者相关-->
        <div class="authorRelated" style="height: 50px;background-color:white">
          <div class="author" style="font-weight: bold;margin-left: 10px">
            {{ res_detail_data.author }}
          </div>
          <div style="font-size: 8px;margin-left: 10px">
            {{ res_detail_data.updated_time }}
          </div>
        </div>
        <!--标题-->
        <div style="height: 70px;line-height:70px;">
          <h1>{{ res_detail_data.article_name }}</h1>
        </div>
        <!--内容div-->
        <div class="contentDiv" v-html="res_detail_data.content">
          <!--          TODO 内容中 复制代码格式不正确,后续通过正则表达式去除-->
          <!--          {{ res_detail_data.content }}-->
        </div>

        <!--相关文章-->
        <div></div>
      </ul>

    </div>

    <div
      style="
      width: 800px;
      font-size: 50px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-color: white;
"
      v-else
    >
      404
      页面找不到
    </div>

  </div>

  <!--  :style="{'display':this.pageNotFound?'flex':'none'}"-->


  <!--  <div style="background-color: white">-->

  <!--    &lt;!&ndash;第二层容器,在该层容器中展示所有效果&ndash;&gt;-->
  <!--    <div style="background-color: aqua;width: 800px;">-->
  <!--      &lt;!&ndash;导航栏&ndash;&gt;-->
  <!--      <div style="background-color: bisque">123</div>-->
  <!--      <div style="background-color: blueviolet">456</div>-->

  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import {getArticleDetail} from 'network/home';

const NavBar = () => import("../common/NavBar")

export default {
  name: "ArticleDetail",
  components: {NavBar},
  data() {
    return {
      res_detail_data: {}, //文章详情
      pageNotFound: false,//详情页是否存在(true为不存在,false为存在)
    }
  },
  created() {
    console.log("created的时候取到的id是", this.$route.query.id)
    this.getArticleDetail(this.$route.query.id)
  },
  methods: {

    load() {
      // 动态加载列表数据
      console.log("触发了加载方法")
      this.loading = true

    },

    getArticleDetail(id) {
      //获取文章详情
      getArticleDetail(id).then(res => {
        console.log("来到了getArticleDetail=====")
        console.log("获取到的res的data是", res.data.data)
        console.log("获取到的res的状态码是", res.status)
        this.res_detail_data = res.data.data
      }).catch(
        err => {
          //响应非200,显示页面找不到
          this.pageNotFound = true;
        }
      )
    }
  }
}
</script>

<style scoped>
.followAuthor:hover {
  /*cursor: pointer;*/
}

.author:hover {
  cursor: pointer;
}

.authorRelated {
}

.outermostDiv {
  background-color: #EFEFEF;
  width: 100%;
  height: 100%;
}

.secondDiv {
  width: 800px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
}

.contentDiv {
  margin-top: 20px;
}

.item-list {
  padding: 20px;
  margin-top: 10px;
  width: 100%;
  height: 100px;
  display: flex
}

.item-list:hover {

  background-color: #EFEFEF;
}

.article-name {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px
}
</style>
