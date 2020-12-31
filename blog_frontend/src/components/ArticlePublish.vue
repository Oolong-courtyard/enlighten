<template>
  <div style="position:absolute;width: 100%;height: 100%;background-color: #EFEFEF">
<!--    <el-backtop></el-backtop>-->
    <div style="position: fixed;
                height:60px;
                width: 100%;
                background-color: white;
                z-index: 999;
                text-align: center;
  "
    >
      <!--                  <ArticlePublishNavBar style="margin:0 auto;"></ArticlePublishNavBar>-->
      <ArticlePublishNavBar style="margin-left: 450px"></ArticlePublishNavBar>
      <!--美化页面的风格阴影-->
      <div style="background-color: #EFEFEF;height: 20px;z-index: 998"></div>
    </div>
    <!--    <div class="articleEdit">123</div>-->
    <div style="margin-top: 80px;position: relative;z-index: 997;">
      <mavon-editor v-model="content" ref="md" @change="change" style="min-height: 600px"></mavon-editor>
    </div>
    <!--一键置顶-->
    <el-backtop style="position: fixed;z-index: 1000;"></el-backtop>

  </div>

</template>

<script>
  const ArticlePublishNavBar = () => import("../common/ArticlePublishNavBar");

  export default {
    name: "ArticlePublish",
    components: {ArticlePublishNavBar},
    data() {
      return {
        content: '', // 输入的markdown
        html: '',    // 转成的html
      }
    },
    mounted() {
      console.log("进入了mounted啊啊啊啊啊啊");
      // this.reload();  // 直接使用
      // this.$router.go(0)
    },
    methods: {
      change(value, render) {
        //实时获取转成html的数据
        this.html = render;
        console.log(this.html)
      },
    }
  }
</script>

<style scoped>
  .articleEdit {
    height: 100%;
    background-color: #EFEFEF;
    display: flex;
    position: relative;
    z-index: 998;
  }

</style>
