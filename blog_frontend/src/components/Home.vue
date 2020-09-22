<template>
  <!--  整个div的样式要设置一下,屏占比横向 60%-->
  <div class="outer-div" style="width: 800px; left:0;right:0;margin:0 auto">
    <div>
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
        <!--      登陆，注册应当在屏幕右上角-->
        <el-menu-item index="5" style="margin-right: 0">登陆</el-menu-item>
        <el-menu-item index="6" style="margin-right: 0">注册</el-menu-item>
      </el-menu>
    </div>

    <div v-if="this.index1">
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
      </ul>
    </div>
<!--    <div v-if="this.index1">-->
<!--      <el-table-->
<!--        :data="res_data"-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          prop="article_id"-->
<!--          label="文章id"-->
<!--          width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="article_name"-->
<!--          label="文章名称"-->
<!--          width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="summary"-->
<!--          label="文章摘要">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="author"-->
<!--          label="作者">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->

    <div v-if="this.index2">
      这是项目界面
    </div>

    <div v-if="this.index3">
      这是历程界面
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
        count: 0,
        loading: false,
        // 控制首页/历程等哪个div显示
        index1: true,
        index2: false,
        index3: false,
        activeIndex: '1',
        activeIndex2: '1',
        res_data: [],
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
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      //加载滚动
      load () {
        this.count += 2
      },

      //不同选项对应不同的页面
      handleSelect(key,keyPath) {

        if (key==1){
          this.index1 = true
          this.index2 = false
          this.index3 = false
        }
        if(key==2){
          this.index1 = false
          this.index2 = true
          this.index3 = false
        }
        if(key==3){
          this.index1 = false
          this.index2 = false
          this.index3 = true
        }
        console.log("key-keyPath为",key );
      },
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

