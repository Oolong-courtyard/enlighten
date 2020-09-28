<template>
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
      <!--将导航菜单分为左右两侧-->
      <div style="display: flex">
        <!--左侧菜单-->
        <div style="display: flex">
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="project" disabled>项目</el-menu-item>
          <el-menu-item index="3" disabled>历程</el-menu-item>
          <el-menu-item index="4" disabled>关于</el-menu-item>
        </div>
        <!--右侧菜单-->
        <div style="display: flex;margin-left: 350px">
          <el-menu-item index="login">登录</el-menu-item>
          <el-menu-item index="register">注册</el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style>
  .tabBarDiv {
    position: fixed;
    width: 800px;
  }
</style>
