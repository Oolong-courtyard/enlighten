<template>
  <!--  根div-->
  <div class="outermostDiv">

    <!--第二层容器,在该层容器中展示所有效果-->
    <div class="secondDiv">


      <ul v-infinite-scroll="load"
          :infinite-scroll-immediate="false"
          :infinite-scroll-distance="300"
          style="overflow: hidden">

        <!--菜单栏-->
        <nav-bar></nav-bar>
        <!--第一个div只是为了占位，达到样式上的效果-->
        <div style="height: 100px"></div>
        <!--    作者相关-->
        <div class="authorRelated" style="height: 100px;background-color:darkgrey">
          <div class="author">
            {{res_detail_data.author}}
          </div>
          <button class="followAuthor" >
            +关注
          </button>

        </div>
        <!--标题-->
        <div style="height: 70px;background-color: brown;line-height:70px;">
          <h1>{{ res_detail_data.article_name }}</h1>
        </div>
        <!--内容div-->
        <div class="contentDiv">
          {{ res_detail_data.content }}
        </div>

        <!--相关文章-->
        <div></div>
      </ul>


    </div>


  </div>

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
import NavBar from "../common/NavBar";

export default {
  name: "ArticleDetail",
  components: {NavBar},
  data() {
    return {
      res_detail_data: {} //文章详情
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
        this.res_detail_data = res.data
      })
    }
  }
}
</script>

<style scoped>
.followAuthor:hover{
  /*cursor: pointer;*/
}
.author:hover{
  /*cursor: pointer;*/
}
.authorRelated:hover{
  display: flex;
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
  /*cursor 鼠标移动上去变小手*/
  cursor: pointer;
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
