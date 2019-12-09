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
    //映射函数
    import {mapActions} from 'vuex'
    export default {
        name: 'App',
        mounted() {
             //获取地址栏的实时地址
             // this.$store.dispatch('getAddress')
        //  获取食品分类的轮播--前端请求数据
        //   this.$store.dispatch('getFoodCategorys')
        // this.$store.dispatch('getShops')
        },
        components: {
            FooterGuide,
        },
      methods:{
          //前端获取数据，存储在vuex中
          ...mapActions(['getAddress','categorys','getShops'])
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


</style>
