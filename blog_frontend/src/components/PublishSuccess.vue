<template>
  <!--  文章发布成功显示的页面-->
  <div>
    <!--引用Navbar组件-->
    <NavBar style="margin-left: 450px"></NavBar>
    <div style="height: 200px"></div>
    <div style="margin-left: 450px">发布成功！有了你的分享，enlighten会变得更好！</div>
<!--    TODO-->
    <div>{{ this.$route.params.articleId }}</div>
  </div>

</template>

<script>
const NavBar = () => import("../common/NavBar");

export default {
  name: "PublishSuccess",
  components: {NavBar},
  data() {
    return {}
  },
}
</script>

<style scoped>

</style>
