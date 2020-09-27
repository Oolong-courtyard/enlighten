<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<!--加全局样式，去除最外层div背景边界颜色不统一-->
<style>
  *{
    margin: 0;
    padding: 0;
  }
</style>

