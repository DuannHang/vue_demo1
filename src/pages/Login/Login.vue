<template>
  <!--on表示显示，off表示关闭-->
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">农行外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginByPhoneNum}" @click="loginByPhoneNum=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginByPhoneNum}" @click="loginByPhoneNum=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <!--短信登录方式-->
            <div :class="{on:loginByPhoneNum}">
              <section class="login_message">
                <input v-model="phone" type="tel" maxlength="11" placeholder="手机号">
                <button :disabled="!checkPhone" @click.prevent="getCheckCode" class="get_verification"
                        :class="{right_phone:checkPhone}">{{Timer>0?'已发送'+Timer+'秒':'获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册农行外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <!--密码登录方式-->
            <div :class="{on:!loginByPhoneNum}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="loginName">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="loginPwd">
                  <input type="text" maxlength="8" placeholder="密码" v-else v-model="loginPwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <!--后台是一个请求接口，直接放链接就好-->
                  <!--                  <img class="get_verification"  ref="captcha" src="http://localhost:4000" alt="captcha" @click="getCpatcha()">-->
                  <img class="get_verification" src="./images/captcha.svg" alt="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <van-icon name="arrow-left" size="25px"/>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
  // <!--调用api接口-->
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api/index'
  //vant的弹出窗函数--引入
  import {Dialog} from 'vant'

  export default {
    name: 'Login',
    data () {
      return {
        //true代表短信登录，false代表用户账户登录
        loginByPhoneNum: true,
        //手机号
        phone: '',
        //验证码发送计时器
        Timer: '',
        //验证码
        code: '',
        //是否显示密码
        showPwd: false,
        //登录名
        loginName: '',
        //登录密码
        loginPwd: '',
        //验证码
        captcha: ''
      }
    },
    components: {
      //vant的弹出窗函数--注册
      [Dialog.Component.name]: Dialog.Component
    },
    computed: {
      //检查手机号格式
      checkPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      //获取短信验证码
      async getCheckCode () {
        //如果当前没有计时--才启动倒计时，不然多次点击会产生多个计时，出现bug
        if (this.Timer == 0) {
          //    1`启动倒计时
          this.Timer = 30
          this.intervalID = setInterval(() => {
            this.Timer--
            if (this.Timer <= 0) {
              clearInterval(this.intervalID)
            }
          }, 1000)
          //    2·发送ajax请求
          const result = await reqSendCode(this.phone)
          //失败
          if (result.code === 1) {
            //显示提示--发送失败
            Dialog.alert({
              message: result.msg
            })
            //  停止计时
            if (this.Timer) {
              this.Timer = 0
              clearInterval(this.intervalID)
              //置空
              this.intervalID = undefined
            }
          }
        }
      },
      //前台登录表单验证
      async login () {
        //登录方式true-短信登录
        if (this.loginByPhoneNum) {
          const {phone, code, checkPhone} = this
          if (!checkPhone) {
            //手机号不正确
            Dialog.alert({
              message: '手机号不正确'
            })
            return
          } else if (!/^\d{6}$/.test(code)) {
            //验证码不正确
            Dialog.alert({
              message: '验证码不正确'
            })
            //刷新验证码
            this.getCpatcha()
            return
          }
          // 发送短信登录信息--ajax
          const result = await reqSmsLogin(phone, code)
          //登录成功
          if (result.code === 0) {
            const user = result.data
            //  保存user到vuex中的state
            this.$store.dispatch('getUer', user)
            //路由跳转到profile
            this.$router.replace('/profile')

          } else {
            //登录失败
            Dialog.alert({
              message: result.msg
            })
            //刷新验证码
            this.getCpatcha()
            //  停止计时
            if (this.Timer) {
              this.Timer = 0
              clearInterval(this.intervalID)
              //置空
              this.intervalID = undefined
            }
          }
        } else {
          //登录方式false-帐号登录
          const {loginName, loginPwd, captcha} = this
          if (!loginName) {
            //输入用户名
            Dialog.alert({
              message: '输入用户名'
            })
            return
          } else if (!loginPwd) {
            //密码错误
            Dialog.alert({
              message: '密码错误'
            })
            return
          } else if (!captcha) {
            //验证码未指定
            Dialog.alert({
              message: '验证码未指定'
            })
            //刷新验证码
            this.getCpatcha()
            return
          }
          //发送帐号登录信息--ajax
          const result = await reqPwdLogin(name, loginPwd, captcha)
          //登录成功
          if (result.code === 0) {
            const user = result.data
            //  保存user到vuex中的state
            this.$store.dispatch('getUer', user)
            //路由跳转到profile
            this.$router.replace('/profile')
          } else {
            //登录失败
            Dialog.alert({
              message: result.msg
            })
            //刷新验证码
            this.getCpatcha()
            //  停止计时
            if (this.Timer) {
              this.Timer = 0
              clearInterval(this.intervalID)
              //置空
              this.intervalID = undefined
            }
          }
        }

      },
      //获取新的图片验证码
      getCpatcha () {
        //每次点击的src是不一样的，就能保证获取不同的验证码
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  /*>.off*/
  /*  display none*/
  /*>.on*/
  /*  position fixed*/
  /*  top 0*/
  /*  left 0*/
  /*  right 0*/
  /*  bottom 0*/
  /*  z-index 200*/
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.right_phone
                  color: mediumvioletred


            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s

                  &.right
                    transform translateX(27px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999
</style>
