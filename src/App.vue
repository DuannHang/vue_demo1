<template>
  <div id="app">
    <!--    上面显示路由导航-->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <!--    下面FooterGuide作为导航-->
    <FooterGuide></FooterGuide>
  </div>


</template>

<script>
    import FooterGuide from "./components/FooterGuide/FooterGuide";

    export default {
        name: 'App',
        components: {
            FooterGuide,

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


</style>
