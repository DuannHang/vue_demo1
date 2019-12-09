<template>
  <!--首页外卖-->
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
        </span>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <!-- 动态获取食品分类的轮播图-->
        <!--<div class="swiper-container" v-if="categorys.length>0">
          <div class="swiper-wrapper">-->
            <!--<div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
              <a href="javascript:;" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>-->
            <div class="swiper-container">
              <div class="swiper-wrapper">
            <div class="swiper-slide">
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/1.jpg">
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg">
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/3.jpg">
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/4.jpg">
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/5.jpg">
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/6.jpg">
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/7.jpg">
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/8.jpg">
                </div>
                <span>土豪推荐</span>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/9.jpg">
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/10.jpg">
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/11.jpg">
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/12.jpg">
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/13.jpg">
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/14.jpg">
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/1.jpg">
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg">
                </div>
                <span>土豪推荐</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <!--当v-if的条件没成立--categorys没有加载完全的时候，就显示一个背景图-->
        <!--<img src="./images/msite_back.svg" alt="categorys_not_prepared_backSVG" v-else>-->
      </nav>
      <!--首页附近商家-->
      <ShopList></ShopList>
    </section>
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  //swiper插件 手机端的滑动效果
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  //映射函数
  import {mapState} from 'vuex'

  export default {
    mounted () {
      //这一步其实有待考虑的---categorys对象数据未获取之前，不应该实例化swiper，所以这个实例化语句，应该写在watch属性里面
      new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })
    },
    data () {
      return {
        //动态轮播图的基本路径
        baseImageUrl: 'https://fuss10.elemecdn.com',
      }
    },
    components: {
      HeaderTop,
      ShopList,
    },
    computed: {
      //前端使用state里面的数据
      ...mapState(['address', 'categorys']),
      //  计算食品分类的分页数（有几页需要滑动的）
      categorysArr () {
        const {categorys} = this
        //  准备空的二维数据
        const arr = []
        let minArr = []
        categorys.forEach(c => {
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          if (minArr.length < 8) {
            minArr.push(c)
          } else {
            //  minArr.length=8了
            minArr = []
          }
        })
        return arr
      }
    },
    //监视watch -- categorys有了数据，才初始化这个swiper--看watch属性里的做法
    watch: {
      categorys (comeValue) {
        //settimeout可以实现，但是效果不算最好
        // setTimeout(()=>{
        //   //创建一个swiper实例对象，实现手机滑动轮播
        //   new Swiper('.swiper-container', {
        //     // direction: 'vertical', // 垂直切换选项
        //     loop: true, // 循环模式选项
        //     // 如果需要分页器
        //     pagination: {
        //       el: '.swiper-pagination',
        //     },
        //
        //     // 如果需要前进后退按钮
        //     navigation: {
        //       nextEl: '.swiper-button-next',
        //       prevEl: '.swiper-button-prev',
        //     },
        //
        //     // 如果需要滚动条
        //     scrollbar: {
        //       el: '.swiper-scrollbar',
        //     },
        //   })
        // },100)

        // 数据更新--》 界面更新--》创建swiper对象
        //   this.nextTick(()=>{
        //     new Swiper('.swiper-container', {
        //       // direction: 'vertical', // 垂直切换选项
        //       loop: true, // 循环模式选项
        //       // 如果需要分页器
        //       pagination: {
        //         el: '.swiper-pagination',
        //       },
        //
        //       // 如果需要前进后退按钮
        //       navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //       },
        //
        //       // 如果需要滚动条
        //       scrollbar: {
        //         el: '.swiper-scrollbar',
        //       },
        //     })
        //   })

      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774


</style>
