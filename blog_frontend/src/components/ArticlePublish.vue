<template>

  <div>
    <mavon-editor v-model="content" ref="md" @change="change" style="min-height: 600px"/>
  </div>
</template>

<script>

export default {
  name: "ArticlePublish",
  data() {
    return {
      content: '', // 输入的markdown
      html: '',    // 转成的html
    }
  },
  methods: {
    change(value, render) {
      //实时获取转成html的数据
      this.html = render
      console.log(this.html)
    },
  }
}
</script>

<style scoped>

</style>
