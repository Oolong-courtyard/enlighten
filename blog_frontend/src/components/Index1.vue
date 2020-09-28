<template>
  <!--  根div-->
  <div class="outermostDiv">

    <!--第二层容器,在该层容器中展示所有效果-->
    <div class="secondDiv">
      <!--导航栏-->
      <nav-bar></nav-bar>
      <!--内容div-->
      <!--第一个div只是为了占位，达到样式上的效果-->
      <div style="height: 50px"></div>
      <div class="contentDiv">
        <ul v-infinite-scroll=""
            style="overflow: hidden">
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
                <div class="article-name">
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

        <!--下拉加载-->
        <!--        <p v-if="loading">加载中...</p>-->
        <!--        <p v-if="noMore">没有更多了</p>-->
      </div>

    </div>
  </div>
</template>

<script>

  import {getArticleList} from 'network/home'
  import NavBar from "../common/NavBar";

  export default {
    name: "Index",
    components: {NavBar},
    data() {
      return {
        loading: false, //下拉加载
        res_list_data_len: 0, //返回文章列表的长度
        res_list_data: [], //请求服务器获取的文章列表
        res_detail_data: {}, //请求服务器获取的文章详情
      }
    },
    created() {
      //获取文章列表页信息
      this.getArticleList()
    },
    // computed: {
    //   noMore() {
    //     return this.res_list_data_len >= 20
    //   },
    //   disabled() {
    //     return this.loading || this.noMore
    //   }
    // },
    methods: {
      load() {
        //动态加载列表数据
        console.log("触发了加载方法")
        // this.loading = true
        // setTimeout(() => {
        //   this.res_list_data_len += 2
        //   this.loading = false
        // }, 500)
      },
      getArticleList() {
        //获取文章列表
        getArticleList().then(res => {
          console.log("来到了getArticleList=====")
          this.res_list_data_len += res.data.length
          this.res_list_data.push(res.data)
          console.log("this.res_list_data",this.res_list_data)
        })
      },
      getArticleDetail(id) {
        //获取文章详情
        window.open('http://localhost:8080/article-detail?id=' + `${id}`);
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
