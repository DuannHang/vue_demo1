<template>
  <div id="app">
    <!--    上面显示路由导航-->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <!--    下面FooterGuide作为导航-->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>


</template>

<script>
    import FooterGuide from "./components/FooterGuide/FooterGuide";

    export default {
        name: 'App',
        mounted() {
             this.$store.dispatch('getAddress')
        },
        components: {
            FooterGuide,

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


</style>
