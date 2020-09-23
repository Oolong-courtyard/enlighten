<template>
  <!--  整个div的样式要设置一下,屏占比横向 60%,需要优化自适应-->
  <div
    style="background-color: #EFEFEF;height: 100%;width: 100%;position: relative">

    <div class="outer-div" style="width: 800px; left:0;right:0;margin:0 auto">

      <el-row :gutter="10">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">首页
          </el-menu-item>
          <el-menu-item index="2">项目</el-menu-item>
          <el-menu-item index="3">历程</el-menu-item>
          <el-menu-item index="4"><a
            href="https://github.com/Oolong-courtyard/enlighten"
            target="_blank">关于</a></el-menu-item>
          <!--      登陆，注册应当在屏幕右上角，需要找到新的解决方案-->
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item index="5" style="margin-right: 0" route="">登陆
          </el-menu-item>
          <el-menu-item index="6" style="margin-right: 0">注册</el-menu-item>
        </el-menu>
      </el-row>

      <div style="background-color:white;width: 100%;">

        <div v-if="this.index1">

          <ul class="infinite-list" v-infinite-scroll="load"
              style="overflow:auto;margin:0 auto">
            <li v-for="res_item in res_data" class="infinite-list-item"
                style="list-style: none">

              <!--display:flex 让div内子元素水平排列,而不是默认的垂直排列-->
              <div style="margin-top: 20px;
                                        width: 100%;
                                        height: 100px;
                                        display: flex;
                                        "
                   onmouseenter=""
              >

                <div style="width: 70%">
                  <div style="text-align: left;font-size: 10px">
                    <!--更新/发布时间后续处理为几小时或者几天前-->
                    {{res_item.author}} · {{res_item.updated_time}} ·
                    {{res_item.summary}}
                  </div>
                  <div
                    style="text-align: center;font-size: 15px;font-weight: bold;margin-top: 10px">
                    {{res_item.article_name}}
                  </div>
                </div>

                <div style="width: 30%">
                  <img src="../assets/logo.png" alt="" width="40" height="40">
                </div>

              </div>
              <!--添加分割线-->
              <hr style="height:1px;border:none;border-top:1px solid #555555;">
            </li>
          </ul>

        </div>
        <div v-if="this.index2">
          这是项目界面
        </div>
        <div v-if="this.index3">
          这是历程界面
        </div>

      </div>

    </div>

  </div>
</template>


<script>
  import {getArticleList} from 'network/home'

  export default {
    name: 'Home',
    props: {
      msg: String
    },
    data() {
      return {
        //滚动实验
        count: 50,
        loading: false,
        // 控制首页/历程等哪个div显示
        index1: true,
        index2: false,
        index3: false,
        activeIndex: '1',
        activeIndex2: '1',
        res_data: [], //请求服务器获取的文章列表
        //  屏幕宽度
        fullWidth: document.documentElement.clientWidth
      };
    },
    created() {
      //获取文章列表页信息
      console.log("vue被创建")
      console.log("整个屏幕的宽度为", this.fullWidth);
      this.getArticleList()
    },
    computed: {
      noMore() {
        return this.count >= 20
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    methods: {
      //改变文章列表item背景颜色


      //加载滚动
      load() {
        this.count += 2
      },

      //不同选项对应不同的页面
      handleSelect(key, keyPath) {

        if (key == 1) {
          this.index1 = true
          this.index2 = false
          this.index3 = false
        }
        if (key == 2) {
          this.index1 = false
          this.index2 = true
          this.index3 = false
        }
        if (key == 3) {
          this.index1 = false
          this.index2 = false
          this.index3 = true
        }
        console.log("key-keyPath为", key);
      },
      //获取文章列表
      getArticleList() {
        getArticleList().then(res => {
          console.log("来到了getArticleList=====")
          console.log(res)
          this.res_data = res.data
        })
      },
    }
  }
</script>

<style scoped>
  .outer-div {
    width: 800px;
  }
</style>

