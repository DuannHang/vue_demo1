<template>
  <van-tabbar route active-color="#02a774">
    <van-tabbar-item
      replace
      to="/msite"
      icon="wap-home"
    >
      外买
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/search"
      icon="search"
    >
      搜索
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/order"
      icon="cart"
    >
      订单
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/profile"
      icon="friends"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
    export default {
        methods: {
            //导航函数-url
            // goTo(url) {
            //     this.$router.replace(url)
            // }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*@import "../../common/stylus/mixins.styl"
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex

    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999

      &.on
        color #02a774

      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px

        .iconfont
          font-size 22px*/
</style>
