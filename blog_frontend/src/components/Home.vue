<!--<template>-->
<!--  &lt;!&ndash;  整个div的样式要设置一下,屏占比横向 60%,需要优化自适应&ndash;&gt;-->
<!--  <div-->
<!--    style="background-color: #EFEFEF;height: 100%;width: 100%;position: relative">-->

<!--    <div class="outer-div" style="width: 800px; left:0;right:0;margin:0 auto">-->

<!--      <el-row :gutter="10">-->
<!--        <el-menu-->
<!--          :default-active="activeIndex2"-->
<!--          class="el-menu-demo"-->
<!--          mode="horizontal"-->
<!--          @select="handleSelect"-->
<!--          background-color="#545c64"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b"-->
<!--          router-->
<!--        >-->
<!--          <el-menu-item index="1">首页-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="2">项目</el-menu-item>-->
<!--          <el-menu-item index="3">历程</el-menu-item>-->
<!--          <el-menu-item index="4"><a-->
<!--            href="https://github.com/Oolong-courtyard/enlighten"-->
<!--            target="_blank">关于</a></el-menu-item>-->
<!--          &lt;!&ndash;      登陆，注册应当在屏幕右上角，需要找到新的解决方案&ndash;&gt;-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item></el-menu-item>-->
<!--          <el-menu-item index="5" style="margin-right: 0">-->
<!--            &lt;!&ndash;登录弹框 &ndash;&gt;-->
<!--            <el-popover-->
<!--              placement="bottom"-->
<!--              trigger="click"-->
<!--            >-->
<!--              <div style="background-color: white;"-->
<!--              >-->
<!--                &lt;!&ndash;登录弹框样式设置&ndash;&gt;-->
<!--                <form action="" method="post">-->
<!--                  <div class="input_control">-->
<!--                    <input type="text"-->
<!--                           class="phone_input"-->
<!--                           placeholder="请输入手机号"-->
<!--                           v-model="telephone"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="input_control_code">-->
<!--                    <input type="text" class="code_input" placeholder="验证码"/>-->
<!--                    &lt;!&ndash;无法触发定义的函数 getVerifyCode&ndash;&gt;-->
<!--                    <div class="get_verify_code" @click="getVerifyCode">-->
<!--                      获取验证码-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="input_control">-->
<!--                    <input type="submit" class="form_input" name="" value="登录">-->
<!--                  </div>-->
<!--                </form>-->
<!--              </div>-->

<!--              <el-button slot="reference">登录</el-button>-->
<!--            </el-popover>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="6" style="margin-right: 0">注册</el-menu-item>-->
<!--        </el-menu>-->
<!--      </el-row>-->

<!--      <div style="background-color:white;width: 100%;">-->

<!--        <div v-if="this.index1">-->

<!--          <ul class="infinite-list" v-infinite-scroll="load"-->
<!--              style="overflow:auto;margin:0 auto">-->
<!--            <li v-for="(res_item,index) in res_data" class="infinite-list-item"-->
<!--                style="list-style: none">-->

<!--              &lt;!&ndash;display:flex 让div内子元素水平排列,而不是默认的垂直排列&ndash;&gt;-->
<!--              <div class="item-list"-->
<!--                   style="margin-top: 20px;-->
<!--                         width: 100%;-->
<!--                         height: 100px;-->
<!--                         display: flex;"-->
<!--                   onmouseenter="changeItemColor(index)"-->
<!--              >-->
<!--                <div style="width: 70%">-->
<!--                  <div style="text-align: left;font-size: 10px">-->
<!--                    &lt;!&ndash;更新/发布时间后续处理为几小时或者几天前&ndash;&gt;-->
<!--                    {{res_item.author}} · {{res_item.updated_time}} ·-->
<!--                    {{res_item.summary}}-->
<!--                  </div>-->
<!--                  <div-->
<!--                    class="article-name"-->
<!--                    style="text-align: center;font-size: 15px;font-weight: bold;margin-top: 10px">-->
<!--                    {{res_item.article_name}}-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div style="width: 30%">-->
<!--                  <img :src="res_item.image" alt="" width="40" height="40">-->
<!--                </div>-->

<!--              </div>-->

<!--              &lt;!&ndash;添加分割线&ndash;&gt;-->
<!--              <hr style="height:1px;border:none;border-top:1px solid #555555;">-->
<!--            </li>-->
<!--          </ul>-->

<!--        </div>-->
<!--        <div v-if="this.index2">-->
<!--          这是项目界面-->
<!--        </div>-->
<!--        <div v-if="this.index3">-->
<!--          这是历程界面-->
<!--        </div>-->

<!--      </div>-->

<!--    </div>-->

<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--  import {getArticleList} from 'network/home'-->

<!--  export default {-->
<!--    name: 'Home',-->
<!--    props: {-->
<!--      msg: String-->
<!--    },-->
<!--    data() {-->
<!--      return {-->
<!--        //图片地址-->
<!--        imagePath:'',-->
<!--        //输入的手机号码-->
<!--        telephone: '',-->
<!--        //登陆弹框-->
<!--        visible: false,-->
<!--        //滚动实验-->
<!--        count: 50,-->
<!--        loading: false,-->
<!--        // 控制首页/历程等哪个div显示-->
<!--        index1: true,-->
<!--        index2: false,-->
<!--        index3: false,-->
<!--        activeIndex: '1',-->
<!--        activeIndex2: '1',-->
<!--        res_data: [], //请求服务器获取的文章列表-->
<!--        //  屏幕宽度-->
<!--        fullWidth: document.documentElement.clientWidth-->
<!--      };-->
<!--    },-->
<!--    created() {-->
<!--      //获取文章列表页信息-->
<!--      console.log("vue被创建")-->
<!--      console.log("整个屏幕的宽度为", this.fullWidth);-->
<!--      this.getArticleList()-->
<!--    },-->
<!--    computed: {-->
<!--      noMore() {-->
<!--        return this.count >= 20-->
<!--      },-->
<!--      disabled() {-->
<!--        return this.loading || this.noMore-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      getVerifyCode() {-->
<!--        //  获取验证码-->
<!--        let reg = /^1[0-9]{10}$/-->
<!--        if (reg.test(this.telephone)) {-->
<!--          console.log("验证码为",1234)-->
<!--        } else {-->
<!--          //  获取验证码-->
<!--          //  开发阶段先用mock code-->
<!--          alert("账号格式错误")-->
<!--        }-->
<!--      },-->
<!--      changeItemColor() {-->
<!--        //改变文章列表item背景颜色-->
<!--        console.log("当前遍历的index为", index);-->
<!--      },-->
<!--      load() {-->
<!--        //加载滚动-->
<!--        this.imagePath = res_item-->
<!--      },-->

<!--      handleSelect(key, keyPath) {-->
<!--        //不同选项对应不同的页面-->
<!--        if (key == 1) {-->
<!--          this.index1 = true-->
<!--          this.index2 = false-->
<!--          this.index3 = false-->
<!--        }-->
<!--        if (key == 2) {-->
<!--          this.index1 = false-->
<!--          this.index2 = true-->
<!--          this.index3 = false-->
<!--        }-->
<!--        if (key == 3) {-->
<!--          this.index1 = false-->
<!--          this.index2 = false-->
<!--          this.index3 = true-->
<!--        }-->
<!--        console.log("key-keyPath为", key);-->
<!--      },-->
<!--      getArticleList() {-->
<!--        //获取文章列表-->
<!--        getArticleList().then(res => {-->
<!--          console.log("来到了getArticleList=====")-->
<!--          console.log(res)-->
<!--          this.res_data = res.data-->
<!--        })-->
<!--      },-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--  .input_control_code {-->
<!--    width: 250px;-->
<!--    margin: 20px auto;-->
<!--    display: flex;-->
<!--  }-->

<!--  .input_control {-->
<!--    width: 250px;-->
<!--    margin: 20px auto;-->
<!--  }-->

<!--  .code_input {-->
<!--    box-sizing: border-box;-->
<!--    text-align: center;-->
<!--    font-size: 1em;-->
<!--    height: 1.8em;-->
<!--    border-radius: 4px;-->
<!--    border: 1px solid #c8cccf;-->
<!--    color: #6a6f77;-->
<!--    -moz-appearance: none;-->
<!--    display: block;-->
<!--    outline: 0;-->
<!--    padding: 0 1em;-->
<!--    text-decoration: none;-->
<!--    width: 60%;-->
<!--  }-->

<!--  .code_input:focus {-->
<!--    border: 1px solid #ff7496;-->
<!--  }-->

<!--  .get_verify_code {-->
<!--    cursor: pointer;-->
<!--    box-sizing: border-box;-->
<!--    text-align: center;-->
<!--    font-size: 1em;-->
<!--    height: 1.8em;-->
<!--    color: #90CAA4;-->
<!--    -moz-appearance: none;-->
<!--    display: block;-->
<!--    outline: 0;-->
<!--    padding: 0 1em;-->
<!--    text-decoration: none;-->
<!--    width: 40%;-->
<!--  }-->

<!--  .form_input {-->
<!--    background-color: #90CAA4;-->
<!--    cursor: pointer;-->
<!--    box-sizing: border-box;-->
<!--    text-align: center;-->
<!--    font-size: 1em;-->
<!--    height: 1.8em;-->
<!--    border-radius: 4px;-->
<!--    border: 1px solid #c8cccf;-->
<!--    color: white;-->
<!--    -moz-appearance: none;-->
<!--    display: block;-->
<!--    outline: 0;-->
<!--    padding: 0 1em;-->
<!--    text-decoration: none;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .form_input:focus {-->
<!--    border: 1px solid #ff7496;-->
<!--  }-->

<!--  .phone_input {-->
<!--    box-sizing: border-box;-->
<!--    text-align: center;-->
<!--    font-size: 1em;-->
<!--    height: 1.8em;-->
<!--    border-radius: 4px;-->
<!--    border: 1px solid #c8cccf;-->
<!--    color: #6a6f77;-->
<!--    -moz-appearance: none;-->
<!--    display: block;-->
<!--    outline: 0;-->
<!--    padding: 0 1em;-->
<!--    text-decoration: none;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .phone_input:focus {-->
<!--    border: 1px solid #ff7496;-->
<!--  }-->


<!--  .outer-div {-->
<!--    width: 800px;-->
<!--  }-->

<!--  /*hover(css选择器)：当鼠标移动上去时添加特殊样式*/-->
<!--  .item-list:hover {-->
<!--    background-color: #EFEFEF;-->
<!--    /*cursor 鼠标移动上去变小手*/-->
<!--    cursor: pointer;-->
<!--  }-->

<!--  .article-name:hover {-->
<!--    text-decoration: underline-->
<!--  }-->
<!--</style>-->

