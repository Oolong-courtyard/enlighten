<template>
  <div class="hello">
    <p>welcome to mamamafeng blog</p>
    <ul class="content">
      <li v-for="item in article_list">{{item.article_id}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      msg: String
    },
    data() {
      return {
        article_list: [
          {
            "article_id": "123",
            "created_time": "2020-09-03T00:34:45+08:00",
            "updated_time": "2020-09-03T00:34:47+08:00",
            "article_name": "今日热点",
            "summary": "最新发现冰山",
            "author": "liuzh",
            "content": "最新发现北极一个地区",
            "image_url": null
          },
          {
            "article_id": "124",
            "created_time": "2020-09-03T01:31:10+08:00",
            "updated_time": "2020-09-03T01:31:12+08:00",
            "article_name": "阿拉panda",
            "summary": "最新发现阿拉panda",
            "author": "liuzh",
            "content": "阿拉panda在潘多拉星球,距离地球300万公里",
            "image_url": null
          }
        ],

      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    /*取消列表左边的点点*/
    list-style: none;
    /*字体大小*/
    font-size: 50px;
    /*字体颜色*/
    color: brown
  }

</style>

