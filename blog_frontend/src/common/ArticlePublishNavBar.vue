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
      <!--将导航菜单分为左右两侧;outline:none去除div的黑边框-->
      <div style="display: flex;border: none;outline: none">
        <!--左侧菜单-->
        <div style="display: flex">
          <img src="../assets/login_head.jpg" alt=""
               style="height: 60px;width: 60px;border-radius: 15px;">
          <el-menu-item
            style="font-size: 20px;transform: rotate(-10deg);border-radius: 15px;"
            index="">enlighten
          </el-menu-item>
          <el-menu-item index="index" style="font-size: 15px">首页</el-menu-item>
          <!--          TODO tab首页下加入子标题进行分类(后端，前端，ios，android...)-->
        </div>
        <div style="margin-left: 500px">
          <el-menu-item style="background-color:black;border-radius: 30px;font-size:18px" index="article-publish" >发布</el-menu-item>
        </div>
        <!--右侧菜单-->
        <!--登陆成功(或注册成功后直接)显示当前登陆用户名称-->
        <div class="loginSuccessUser"
             :style="{'display':'flex'}">
          <el-dropdown @command="handleCommand">
            <el-menu-item><img :src="userProfilePhoto" style="height: 36px;width: 36px;border-radius: 50px" ></el-menu-item>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">首页</el-dropdown-item>
              <el-dropdown-item command="c">我点赞的文章</el-dropdown-item>
              <el-dropdown-item command="c">我喜欢的作者</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </el-menu>

  </div>
</template>


<script>

  export default {
    name: "ArticlePublishNavBar",
    data() {
      return {
        selectSearch: false,//是否选中了输入框
        searchInput: '', //搜索输入
        searchInputValueChange: false,//搜索输入框中的值是否改变(布尔)
        canLogin: true, //登录数据通过校验的依据
        canRegister: true, //注册数据通过校验的依据
        username: null, //页面刷新后,created中将localStorage中的username赋值到这里，用于页面右上角显示
        userProfilePhoto:null, //用户头像地址
        usernameExist: false, //用户注册时判断用户名是否已经存在
        otherLoginVisible: false, //其他登录方式显隐
        registerVerifyFormVisible: false,  //注册时验证码填写form是否显示
        loginDialogFormVisible: false, //登录对话框显隐
        registerDialogFormVisible: false, //注册对话框显隐
        formLabelWidth: '80px'
      }
    },
    mounted() {
      //获取localStorage中的用户信息
      let username = localStorage.getItem("username");
      if (username != null) {
        this.loginSuccess = true; //loginSuccess状态决定当前页面右上角显示用户名还是登录/注册按钮
        // 为了兼容注册成功后，直接显示用户名,直接在localStorage中获取username后设置到data中的username中；因此注册成功的同时将username设置到localStorage中
        this.username = username;
        this.userProfilePhoto = localStorage.getItem("userProfilePhoto");
      } else {
        this.loginSuccess = false;
      }
    },
    methods:{
      handleCommand(){
        console.log("handleCommand");
      },
    },

  }
</script>

<style>
  .tabBarDiv {
    /*position: absolute;*/
    width: 1000px;
  }

  .loginSuccessUser {
    margin-left: 10px;
  }
</style>
