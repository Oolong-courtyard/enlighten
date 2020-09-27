<template>
  <!--  根div-->
  <div class="outermostDiv">


    <!--第二层容器,在该层容器中展示所有效果-->
    <div class="secondDiv">


      <!--    tab栏div-->
      <div class="tabBarDiv">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="project" disabled>项目</el-menu-item>
          <el-menu-item index="3" disabled>历程</el-menu-item>
          <el-menu-item index="4" disabled>关于</el-menu-item>
          <el-menu-item index="login">登录</el-menu-item>
          <el-menu-item index="register">注册</el-menu-item>
        </el-menu>
      </div>


      <!--内容div-->
      <div class="contentDiv">
        <ul v-infinite-scroll="" style="overflow:auto;">
          <li v-for="(res_item,index) in res_list_data"
              style="list-style: none"
              @click="getArticleDetail(res_item.article_id)"
          >
            <!--display:flex 让div内子元素水平排列,而不是默认的垂直排列-->
            <div class="item-list">
              <div style="width: 70%">
                <div style="text-align: left;font-size: 10px">
                  <!--更新/发布时间后续处理为几小时或者几天前-->
                  {{res_item.author}} · {{res_item.updated_time}} ·
                  {{res_item.summary}}
                </div>
                <div
                  class="article-name"
                  style="text-align: center;font-size: 15px;font-weight: bold;margin-top: 10px">
                  {{res_item.article_name}}
                </div>
              </div>

              <div style="width: 30%">
                <img :src="res_item.image" alt="" width="40" height="40">
              </div>

            </div>

            <!--添加分割线-->
            <hr style="height:1px;border:none;border-top:1px solid #555555;">
          </li>

        </ul>
      </div>

    </div>
  </div>
</template>

<script>

  import {getArticleList, getArticleDetail} from 'network/home'

  export default {
    name: "Index",
    data() {
      return {
        res_list_data: [], //请求服务器获取的文章列表
        res_detail_data: {}, //请求服务器获取的文章详情
      }
    },
    created() {
      //获取文章列表页信息
      this.getArticleList()
    },
    methods: {
      getArticleList() {
        //获取文章列表
        getArticleList().then(res => {
          console.log("来到了getArticleList=====")
          console.log(res)
          this.res_list_data = res.data
        })
      },
      getArticleDetail(id) {

        //获取文章详情
        window.open('http://localhost:8080/article-detail?id=' + `${id}`);
        getArticleDetail(id).then(res => {
          console.log("来到了getArticleDetail=====")
          console.log(res)
          this.res_detail_data = res.data
        })
      },
    },
  }
</script>

<style scoped>
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

  .tabBarDiv {

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

</style>
