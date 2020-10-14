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
          <img src="../assets/login_head.jpg" alt=""
               style="height: 60px;width: 60px;border-radius: 15px;">
          <el-menu-item
            style="font-size: 20px;transform: rotate(-10deg);border-radius: 15px;"
            index="">enlighten
          </el-menu-item>
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="project" disabled>项目</el-menu-item>
          <el-menu-item index="3" disabled>历程</el-menu-item>
        </div>
        <!--右侧菜单-->
        <div class="navLoginRegister"
             :style="{'display':this.loginSuccess?'none':'flex'}">
          <el-menu-item @click="loginDialogFormVisible = true">登录</el-menu-item>
          <el-menu-item @click="registerDialogFormVisible = true">注册
          </el-menu-item>
        </div>
        <!--登陆成功后显示当前登陆用户名称-->
        <div class="loginSuccessUser"
             :style="{'display':this.loginSuccess?'flex':'none'}">
          <el-dropdown @command="handleCommand">
            <el-menu-item>{{ this.loginForm.username }}</el-menu-item>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">购物车</el-dropdown-item>
              <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </el-menu>

    <!--登录对话框-->
    <!--:close-on-click-modal 对话框之外的区别不可选-->
    <el-dialog
      class="loginElDialog"
      :style="{'height':this.otherLoginVisible ? '590px':'550px'}"
      title="账密登录"
      :visible.sync="loginDialogFormVisible"
      :close-on-click-modal="false"
    >
      <!--自定义title属性-->
      <template slot="title">
        <div style="font-weight: bold;font-size: 18px">账密登录</div>
      </template>

      <el-form :model="loginForm" ref="loginForm">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="" class="dialog-footer">
        <el-button style="margin-left: 125px" type="primary"
                   @click="handleLogin">登录
        </el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </div>
      <!--添加分割线-->
      <hr
        style="height:1px;border:none;border-top:1px solid #555555;margin-top: 15px;">

      <div @click="otherLogin" class="otherLoginStyle"
           style="margin-top: 10px;margin-bottom: 15px;font-size: 14px;color: #409EFF">
        其他登录方式
      </div>
      <div class="weChatAndOther"
           :style="{'display':this.otherLoginVisible?'flex':'none'}">
        <div @click="qqLogin" class="otherLoginDivStyle">
          <img src="../assets/qqLogin.jpg" alt="" class="otherLoginItemStyle">
        </div>
        <div @click="weChatLogin" class="otherLoginDivStyle">
          <img src="../assets/weChatLogin.jpg" alt=""
               class="otherLoginItemStyle" style="height: 20px;margin-top:10px">
        </div>
        <div @click="githubLogin" class="otherLoginDivStyle">
          <img src="../assets/githubLogin.jpg" alt=""
               class="otherLoginItemStyle" style="height: 20px;margin-top:10px">
        </div>
      </div>

      <div style="font-size: 15px;text-align:center;">登录即表示同意
        <span class="userPolicy" style="color: #409EFF">用户协议及隐私政策</span>
      </div>
    </el-dialog>

    <!--注册对话框-->
    <el-dialog
      class="registerElDialog"
      title="注册"
      :visible.sync="registerDialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="registerForm" ref="registerForm"
               :rules="registerFormRules">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="registerForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="registerForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <div :registerVerifyFormVisible="false" class="registerVerifyForm"
             style="display: flex;height: 40px;width: 225px;margin-bottom: 20px;margin-left: 60px;">
          <input onblur="verifyMobile" class="verifyInput" type="text"
                 placeholder="1234" ref="verifyCode"
                 style="outline: none;
                 text-indent:15px;
                 border-width: 1px;
                 border-color:#FBFBFB;
                 border-radius: 5px;
                 width: 120px;
                 margin-right: 30px">
          <button class="getVerifyCode"
                  type="button"
                  style="border-radius: 5px;border-style: none;background-color: #409EFF;color: white"
                  @click="getVerifyCode"
          >获取验证码
          </button>
        </div>
        <!--邮箱目前未实现-->
        <!--        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">-->
        <!--          <el-input v-model="registerForm.email" autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRegister">注册</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      loginSuccess: false, //是否登陆成功。用于控制用户登陆成功后个人用户名的显示
      otherLoginVisible: false, //其他登录方式显隐
      registerVerifyFormVisible: false,  //注册时验证码填写form是否显示
      loginDialogFormVisible: false, //登录对话框显隐
      registerDialogFormVisible: false, //注册对话框显隐
      loginForm: {
        username: '',
        password: '',
      }, //登录表单
      registerForm: {
        username: '',
        mobile: '',
        verification: '',
        email: '',
        password: '',
      }, //注册表单

      // loginFormRules:{
      //   email:[
      //     { required:true,message:"请输入邮箱地址",trigger:"blur" },
      //     { min:5,max:15,message: "长度必须在5到15个字符之间",trigger: "blur" },
      //   ],
      //   password: [
      //     { required:true,message:"请输入密码",trigger:"blur" },
      //     { min:5,max:15,message: "长度必须在5到15个字符之间",trigger: "blur" },
      //   ],
      // },
      // registerFormRules:{
      //   mobile:[
      //     {message:"请输入手机号码",trigger:"blur"},
      //     {len:11,message: "大陆手机号长度必须为11位",trigger: "blur"},
      //   ],
      // },
      formLabelWidth: '60px'
    }
  },
  created() {
    //获取localStorage中的用户信息
    const username = localStorage.getItem('username')
    console.log('刷新页面之后，从localStorage中获取到的username是', username)
    console.log('刷新页面之后，此时的data中的loginForm中的username是', this.loginForm.username)
    if (username) {
      this.loginSuccess = true;
      //注意刷新页面之后，data中的数据已经消失了，此时需要将localStorage中的username设置到data中的loginForm中，以便展示
      this.loginForm.username = username
    } else {
      this.loginSuccess = false;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == 'c') {
        //  退出登录，清除localStorage中的用户数据
        this.loginSuccess = false
        localStorage.removeItem('username')
      } else if (command == 'a') {
        //个人中心
      } else if (command == 'b') {
        //购物车
      }
    },

    //qq登录
    qqLogin() {
      console.log("qq登录")
    },
    //微信登录
    weChatLogin() {
      console.log("微信登录")
    },
    //github登录
    githubLogin() {
      console.log("github登录")
    },
    //控制其他登录方式显隐
    otherLogin() {
      this.otherLoginVisible = !this.otherLoginVisible;
    },
    //验证手机号
    verifyMobile() {
      if (this.registerForm.mobile.len == 11) {
        this.registerVerifyFormVisible = true
      } else {
        this.$message({
          message: "大陆手机号必须为11位",
          type: "warning"
        })
      }
    },

    //获取验证码
    async getVerifyCode() {
      this.$message({
        message: "获取验证码请求已发出"
      })
      //点击之后马上倒计时,60s之内无法再次点击
      // const res = await this.$http.post("/verifcation", this.registerForm.mobile);
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //登录处理
    async handleLogin() {
      console.log("来到了handlogin")
      const reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      );
      if (!this.loginForm.username) {
        this.$message({
          message: "用户名不能为空！ ",
          type: "warning"
        });
        return;
      } else if (!this.loginForm.password) {
        this.$message({
          message: "请输入密码",
          type: "warning"
        });
        return; //如果验证没有通过，就直接返回，此时对话框还在
      }
      console.log("发起了登录的网络请求", this.loginForm)
      //验证通过后，向服务器发起网络请求
      this.$http.post("/login", this.loginForm, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        .then(
          res => {
            console.log("登录成功")
            //右侧替换为登录成功的用户名
            //设置loginDialogFormVisible的值为false
            this.loginDialogFormVisible = false;
            this.loginSuccess = true;
            //将用户名设置进localStorage中
            localStorage.setItem('username', this.loginForm.username)

            //将菜单右侧登录注册按钮隐藏,转而显示用户名(可以直接使用v-bind，设置一个visibile，为false显示登录注册按钮，为true显示用户名。
            // 个人头像鼠标移动上去自动显示下拉菜单，可以进个人主页；个人主页有购物车(订单)，可以更换头像，可以写个性签名，
            // 主页，增加搜索框，可以直接写文章(支持MarkDown)，
            // )
          }
        ).catch(error => {
        console.log("error是", error)
        if (error.response.status == 400) {
          this.$message({
            message: "用户名或密码错误",
            type: "warning"
          })
        }
      })
    },
    //注册处理
    async handleRegister() {
      console.log("来到了handleRegister")
      console.log("发起了登录的网络请求")
      this.$message({
        message: "注册功能暂不提供",
        type: "warning"
      })
      return;
      //先将输入的验证码 设置到registerForm中，并传入到服务器对比
      this.registerForm.verification = this.$refs.verifyCode.value
      console.log("注册提交的表单数据为", this.registerForm)
      //验证通过后，向服务器发起网络请求
      const res = await this.$http.post("/register", this.registerForm);
      //处理相应的请求
    },
  },
}
</script>

<style>
.tabBarDiv {
  position: absolute;
  width: 800px;
}

.loginElDialog {
  width: 650px;
  display: flex;
  /*align-self: center;*/
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.registerElDialog {
  width: 650px;
  height: 620px;
  display: flex;
  /*align-self: center;*/
  top: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.getVerifyCode:hover {
  cursor: pointer;
}

.verifyInput:focus {
  border-color: #409EFF;
}

.otherLoginStyle:hover {
  cursor: pointer;
}

.otherLoginDivStyle {
  background-color: #F4F8F8;
  width: 40px;
  height: 40px;
  border-radius: 15px;
}

.otherLoginItemStyle:hover {
  cursor: pointer;
}

.otherLoginItemStyle {
  margin-top: 7px;
  margin-left: 9px;
  border-radius: 10px;
  width: 20px;
  height: 25px
}

.weChatAndOther {
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 20px
}

.userPolicy:hover {
  cursor: pointer;
}

.navLoginRegister {
  margin-left: 260px
}

.loginSuccessUser {
  margin-left: 260px;
}
</style>
