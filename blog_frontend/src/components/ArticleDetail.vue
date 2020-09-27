<template>
<div>
  文章详情
<!--  {{res_detail_data}}-->
</div>
</template>

<script>
  export default {
    name: "ArticleDetail",
    data() {
      return {
        res_detail_data :{} //文章详情
      }
    },
    created() {
      this.getArticleDetail()
    },
    methods: {
      getArticleDetail(id) {
        //获取文章详情
        window.open('http://127.0.0.1:8000/article-detail/' + `${id}`);
        getArticleDetail(id).then(res => {
          console.log("来到了getArticleDetail=====")
          console.log(res)
          this.res_detail_data = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
