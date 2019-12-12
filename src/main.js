import Vue from 'vue'
import App from './App.vue'
//路由
import router from './router'
//vueX
import store from './store'
//vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.devtools = true
Vue.use(Vant)


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//vue-router
  store,//vuex
  render: h => h(App)
})

