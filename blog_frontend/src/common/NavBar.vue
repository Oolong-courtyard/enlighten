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
          <el-menu-item index="project" disabled>项目</el-menu-item>
          <el-menu-item index="3" disabled>历程</el-menu-item>
        </div>
        <!--搜索框-->
        <div
          style="display: flex;margin-left: 100px;line-height: 50px;text-align: center">
          <el-input
            style="font-size: 15px;
                          padding: 5px;
                          height: 30px;
                          outline: none;
                          "
            placeholder="搜你所想"
            v-model="searchInput"
            @focus="searchFocus"
            @blur="searchBlur"
            @change="searchInputChange"
          >
            <i slot="suffix"
               :style="{'color':this.selectSearch?'#4096EF':'grey'}"
               class="el-input__icon el-icon-search"
               @click="startSearch(searchInput)"
            ></i>
          </el-input>
          <!--          <div style="margin-left: -20px;height: 30px">-->
          <!--            <el-button icon="el-icon-search" circle></el-button>-->
          <!--          </div>-->
        </div>
        <!--右侧菜单-->
        <div class="navLoginRegister"
             :style="{'display':this.loginSuccess?'none':'flex'}">
          <el-menu-item @click="loginDialogFormVisible = true">登录</el-menu-item>
          <el-menu-item @click="registerDialogFormVisible = true">注册
          </el-menu-item>
        </div>
        <!--登陆成功(或注册成功后直接)显示当前登陆用户名称-->
        <div class="loginSuccessUser"
             :style="{'display':this.loginSuccess?'flex':'none'}">
          <el-dropdown @command="handleCommand">
            <el-menu-item>{{ this.username }}</el-menu-item>
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
      :modal-append-to-body="false"
      :append-to-body="true"
    >
      <!--自定义title属性-->
      <template slot="title">
        <div style="font-weight: bold;font-size: 18px">账密登录</div>
      </template>

      <el-form :model="loginForm" ref="loginFormF" :rules="loginFormRules">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="" class="dialog-footer">
        <el-button style="margin-left: 125px" type="primary"
                   @click="handleLogin">登录
        </el-button>
        <el-button @click="resetForm('loginFormF')">重置</el-button>
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
      :modal-append-to-body="false"
      :append-to-body="true"
    >
      <!--      TODO 可在el-form添加规则 :rules="registerFormRules"-->
      <el-form :model="registerForm" ref="registerFormF"
               :rules="registerFormRules"
      >
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="registerForm.username"
                    @blur="CheckUsernameExist"
          >
          </el-input>
        </el-form-item>
        <!--手机号-->
        <div style="display: flex">
          <el-form-item prop="mobile" label="手机号" :label-width="formLabelWidth">
            <el-input v-model="registerForm.mobile" autocomplete="on"></el-input>
          </el-form-item>
        </div>
        <!--验证码-->
        <div style="display: flex">
          <el-form-item prop="verification" label="" :label-width="formLabelWidth">
            <el-input v-model="registerForm.verification" autocomplete="on"></el-input>
          </el-form-item>
          <button class="getVerifyCodeStyle"
                  style="border-radius: 5px;
                        width: 102px;
                        height: 40px;
                        margin-left: 10px;
                        border-style: none;
                        background-color: #409EFF;
                        color: white;
                        outline: none;
"
                  type="button"
                  @click="getVerifyCode"
                  v-show="smsCodeShow"
          >获取验证码
          </button>
          <button class="countDownVerifyCodeStyle"
                  type="button"
                  v-show="!smsCodeShow"
          >{{ countDown }}
          </button>
        </div>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="ensurePassword" label="确认密码"
                      :label-width="formLabelWidth">
          <el-input type="password"
                    v-model="registerForm.ensurePassword"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRegister">注册</el-button>
        <el-button @click="resetForm('registerFormF')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {getUserStarCount} from "./getUserStarCount"

export default {
  name: "NavBar",
  data() {
    //登录表单username校验
    let checkLoginUsername = (rule, value, callback) => {
      let D = /^[a-z0-9]*$/;
      if (!D.test(this.loginForm.username)) {
        callback(new Error('用户名不存在'))
      } else callback()
    };
    //登录表单password校验
    let checkLoginPassword = (rule, value, callback) => {
      let D = /^[a-z0-9]*$/;
      if (!D.test(this.loginForm.password)) {
        callback(new Error('密码错误'))
      } else callback()
    };

    //注册表单校验,添加正则校验,用户名只能输入字母或数字
    let checkRegisterUsername = (rule, value, callback) => {
      let D = /^[a-z0-9]*$/;
      if (!D.test(this.registerForm.username)) {
        callback(new Error('用户名只能包含数字或字母'))
      }
      //校验用户名是否存在
      if (this.usernameExist === true) {
        callback(new Error('用户名已存在'))
      }
    };
    //注册手机号格式校验
    let checkRegisterMobile = (rule, value, callback) => {
      let D = /^1[3-9]\d{9}$/;
      if (!D.test(this.registerForm.mobile)) {
        callback(new Error("手机号格式错误"))
      }
    };
    //注册表单校验,添加正则校验,密码只能输入字母和数字
    let checkRegisterPassword = (rule, value, callback) => {
      let D = /^[a-z0-9]*$/;
      if (!D.test(this.registerForm.password)) {
        callback(new Error('密码只能包含数字或字母'))
      } else callback()
    };
    //注册表单校验,只需要确认与输入的密码一致即可。
    let checkRegisterEnsurePassword = (rule, value, callback) => {
      if (this.registerForm.password !== this.registerForm.ensurePassword) {
        callback(new Error('密码不一致'))
      } else callback()
    };
    return {
      selectSearch: false,//是否选中了输入框
      searchInput: '', //搜索输入
      searchInputValueChange: false,//搜索输入框中的值是否改变(布尔)
      canLogin: true, //登录数据通过校验的依据
      canRegister: true, //注册数据通过校验的依据
      username: null, //页面刷新后,created中将localStorage中的username赋值到这里，用于页面右上角显示
      usernameExist: false, //用户注册时判断用户名是否已经存在
      loginSuccess: false, //是否登陆成功。用于控制用户登陆成功后个人用户名的显示
      otherLoginVisible: false, //其他登录方式显隐
      registerVerifyFormVisible: false,  //注册时验证码填写form是否显示
      loginDialogFormVisible: false, //登录对话框显隐
      registerDialogFormVisible: false, //注册对话框显隐
      smsCodeShow: true,//验证码倒计时显隐,默认为true(此时显示验证码按钮,表示倒计时还没有开始)
      countDown: '',//倒计时值
      timer: null, //标志倒计时是否结束
      loginForm: {
        username: '',
        password: '',
      }, //登录表单
      registerForm: {
        username: '',
        mobile: '',
        verification: '',
        password: '',
        ensurePassword: '',
      }, //注册表单

      loginFormRules: {
        // email:[
        //   { required:true,message:"请输入邮箱地址",trigger:"blur" },
        //   { min:5,max:15,message: "长度必须在5到15个字符之间",trigger: "blur" },
        // ],
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min: 5, max: 10, message: '用户名不存在', trigger: 'blur'},
          {validator: checkLoginUsername, trigger: 'blur'},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 5, max: 10, message: "密码错误", trigger: "blur"},
          {validator: checkLoginPassword, trigger: 'blur'},
        ],
      },
      registerFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 10, message: '长度必须在5到15个字符之间', trigger: 'blur'},
          {validator: checkRegisterUsername, trigger: 'blur'},
        ],
        mobile: [
          {message: "请输入手机号码", trigger: "blur"},
          {len: 11, message: "大陆手机号长度必须为11位", trigger: "blur"},
          {validator: checkRegisterMobile, trigger: 'blur'},
        ],
        verification: [
          {required: true, message: '验证码', trigger: 'blur'},
          {min: 6, max: 6, message: '长度必须为6个字符', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 10, message: '长度必须在5到15个字符之间', trigger: 'blur'},
          {validator: checkRegisterPassword, trigger: 'blur'},
        ],
        ensurePassword: [
          {required: true, message: '请输入密码确认', trigger: 'blur'},
          {validator: checkRegisterEnsurePassword, trigger: 'blur'},
        ],
      },
      formLabelWidth: '80px'
    }
  },
  mounted() {
    //获取localStorage中的用户信息
    let username = localStorage.getItem("username")
    if (username != null) {
      this.loginSuccess = true; //loginSuccess状态决定当前页面右上角显示用户名还是登录/注册按钮
      // 为了兼容注册成功后，直接显示用户名,直接在localStorage中获取username后设置到data中的username中；因此注册成功的同时将username设置到localStorage中
      this.username = username;
    } else {
      this.loginSuccess = false;
    }
  },
  methods: {
    startSearch() {
      //搜索内容
      //每一次检索判断输入框是否改变;没有改变不发送任何网络请求
      if (this.searchInputValueChange === false) {
        console.log("输入框值未改变,不发送请求");
        return;
      }
      //选中输入框,改变背景颜色
      this.selectSearch = true;
      //根据输入的内容发起网络请求
      this.$http.get(this.$articleSearch, {params: {articleName: this.searchInput, page: 1}})
        .then(
          res => {
            console.log("请求到的数据为", res);
            //将获取到的数据传递给父组件 Index ,并将值设置给父组件data中res_list_data
            this.$emit('child-event', {resData: res.data.data, pageNum: 1, searchInput: this.searchInput})
            //获取到数据之后,如果输入框未改变,不再发送请求
            //TODO 后续再优化,因为在点击获取分类数据之后,此时虽然输入框内容没有改变,业务上应该还是要发起网络请求的。
            // this.searchInputValueChange = false
          }
        )
        .catch(
          err => {
            console.log("响应异常了", err)
          }
        )
    },
    searchBlur() {
      this.selectSearch = false;
    },
    searchFocus() {
      //搜索框样式改变
      this.selectSearch = true;
    },
    searchInputChange() {
      //输入框改变的时候触发
      this.searchInputValueChange = true
    },
    //注册用户名格式校验
    checkRegisterUsername() {

    },
    //注册时检查用户名是否已经注册过
    async CheckUsernameExist() {
      //验证用户名是否已经注册过
      //验证通过后，向服务器发起网络请求
      console.log("失去焦点出发了");
      this.$http.get(this.$usernameCountUrl, {params: {username: this.registerForm.username}}).then(
        res => {
          console.log('用户名不存在，可以注册');
          //将data中的用户名已经存在修改为false
          this.usernameExist = false;
        }
      ).catch(err => {
        if (err.response.status === 400) {
          //将data中的用户名已经存在修改为True
          this.usernameExist = true;
        }
      })
    },

    handleCommand(command) {
      if (command === 'c') {
        //  退出登录，清除localStorage中的用户数据
        this.loginSuccess = false;
        localStorage.clear();
        //父组件中的点赞文章列表也要清除
        // this.$emit("clearStarArticle")
        //TODO 后续使用更佳的reload  provide / inject
        location.reload();
        //TODO star
        //3.退出的时候需要再`发射`一下,清空父组件中的userArticleStar
        // (从效果上来看，用户登陆：已点赞的文章背景颜色改变。未登陆用户：无点亮的点赞样式，且点击点赞的时候弹出登陆对话框)

      } else if (command === 'a') {
        //个人中心
      } else if (command === 'b') {
        //购物车
      }
    },
    //qq登录
    qqLogin() {
      console.log("qq登录");
      this.$http.get(this.$qqAuthorizationUrl).then(
        res => {
          console.log("请求获取到的qq登录的url为", res);
          console.log("res.data.login_url为", res.data.login_url);
          window.open(res.data.login_url)
        }
      )
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
      if (this.registerForm.mobile.len === 11) {
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
      //手机号格式校验通过
      let D = /^1[3-9]\d{9}$/;
      if (!D.test(this.registerForm.mobile)) {
        callback(new Error("请输入正确的手机号"))
      }
      //判断手机号是否注册过
      this.$http.get(this.$phoneCount,
        {params: {"phone": this.registerForm.mobile}}
      ).then(res => {
        //成功
        this.$message({
          message: "获取验证码请求已发出"
        })
        //倒计时60s以内不能再次发送获取验证码请求
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.countDown = TIME_COUNT;
          this.smsCodeShow = false;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= TIME_COUNT) {
              this.countDown--;
            } else {
              this.smsCodeShow = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
        //发送网络请求获取验证码
        this.$http.get(this.$getSmsCode,
          {
            params: {"phone": this.registerForm.mobile}
          }
        ).then(res => {
          console.log("获取验证码得到的res是", res)
          //成功
        }).catch(err => {
          //失败
          console.log("获取验证码得到的err是", err)
        })

      }).catch(err => {
        //失败
        this.$message({
          "message": "手机号已注册",
          "type": "warning",
        })
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
      //校验登录表单数据
      this.$refs.loginFormF.validate(valid => {
        this.canLogin = valid
      });
      if (this.canLogin === false) {
        return;
      }
      //验证通过后，向服务器发起网络请求
      this.$http.post(this.$userLoginUrl, this.loginForm, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        .then(
          res => {
            console.log("登录成功");
            //右侧替换为登录成功的用户名
            //设置loginDialogFormVisible的值为false
            this.loginDialogFormVisible = false;
            this.loginSuccess = true;
            //响应式渲染;将登录填写的username设置到data中的username;将用户名设置进localStorage中
            this.username = res.data.data["username"];
            //设置登陆成功的用户的信息(用户name,用户token)
            localStorage.setItem('userId', res.data.data["user_id"]);
            localStorage.setItem('username', res.data.data["username"]);
            localStorage.setItem('userToken', res.data.data["token"]);
            //(此时会自动调用在父组件中定义的方法(该方法的功能时：将这些文章id添加到 userArticleStar 中。))
            // 携带token请求db获取该用户点赞的文章id列表
            this.$http.get(
              this.$getStarCount,
              {
                headers: {"x-token": localStorage.getItem('userToken')},
                params: {"user_id": localStorage.getItem("userId")},
              }).then(
              res => {
                //将获取到的点赞文章存入localStorage
                localStorage.setItem("userArticleStars", res.data.data);
                location.reload();
              }
            ).catch(
              err => {
                //TODO 处理失败
              }
            )
            //将菜单右侧登录注册按钮隐藏,转而显示用户名(可以直接使用v-bind，设置一个visibile，为false显示登录注册按钮，为true显示用户名。
            // 个人头像鼠标移动上去自动显示下拉菜单，可以进个人主页；个人主页有购物车(订单)，可以更换头像，可以写个性签名，
            // 主页，增加搜索框，可以直接写文章(支持MarkDown)，
            // )
            //TODO star
            /*
            用户登陆和退出时,
            1.都要对localStorage中token做处理(增加和删除);
            3.退出的时候需要再`发射`一下,清空父组件中的userArticleStar
            */
            //如果用户登陆,获取该用户点赞的文章id,添加到 userArticleStars 中。在画面样式上我可以直接根据userArticleStars中是否有该文章的id来决定该文章点赞图标的样式
            //从localStorage中获取登陆用户的token
            if (localStorage.getItem("userToken") != null) {
              //用户已登陆
              console.log("用户已登录")
            }
          }
        ).catch(error => {
        console.log("error是", error);
        if (error.response.status === 400) {
          this.$message({
            message: "用户名或密码错误",
            type: "warning"
          })
        }
      })
    },
    //注册处理
    handleRegister() {
      console.log("来到了handleRegister");
      this.$refs.registerFormF.validate(valid => {
        this.canRegister = valid
      });
      //所有校验通过后，才能发起注册的网络请求(注册过程中维护一个共同变量,只要任一校验没有通过,该变量都为false)
      if (this.canRegister === false) {
        console.log('表单校验', this.canRegister);
        return;
      }
      //验证通过后，向服务器发起网络请求
      this.$http.post(this.$userRegisterUrl, {
        "username": this.registerForm.username,
        "phone": this.registerForm.mobile,
        "sms_code": this.registerForm.verification,
        "password": this.registerForm.password,
        "ensure_password": this.registerForm.ensurePassword,
      }).then(
        res => {
          console.log("注册成功的res为", res);
          this.$message({
            message: "注册成功",
            type: "warning",
          });
          this.registerDialogFormVisible = false;
          this.loginSuccess = true;
          //直接将用户名设置到data中(因为注册成功对话框消失后，页面没有刷新，created函数没有执行);
          //同时将用户名设置进localStorage中(这一步是为了刷新页面后用户名仍然显示)
          this.username = this.registerForm.username;
          localStorage.setItem('userId', res.data.data["user_id"]);
          localStorage.setItem('username', res.data.data["username"]);
          localStorage.setItem('userToken', res.data.data["token"]);
          localStorage.setItem("userArticleStars", "");
          location.reload();
        }
      ).catch(err => {
        console.log("注册失败的err为", err.response.data);
        this.$message({
          message: err.response.data.detail,
          type: "warning",
        });
      })
    },
  },
}
</script>

<style>
.el-input__icon {

}

.el-icon-search {
  padding: 10px;
  color: #409EFF;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
}

.tabBarDiv {
  position: fixed;
  width: 1000px;
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
  height: 680px;
  display: flex;
  /*align-self: center;*/
  top: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-weight: bold;
}

.getVerifyCodeStyle:hover {
  cursor: pointer;
}

.countDownVerifyCodeStyle {
  border-radius: 5px;
  width: 102px;
  height: 40px;
  margin-left: 10px;
  border-style: none;
  background-color: #409EFF;
  color: white;
  outline: none;
  font-size: 25px;
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
  margin-left: 80px
}

.loginSuccessUser {
  margin-left: 110px;
}
</style>
