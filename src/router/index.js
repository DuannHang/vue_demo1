import Vue from 'vue'
import Router from 'vue-router'
import MSite from "../pages/MSite/MSite";
import Order from "../pages/Order/Order";
import Profile from "../pages/Profile/Profile";
import Search from "../pages/Search/Search";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      component: MSite
    }, {
      path: '/profile',
      component: Profile
    }, {
      path: '/order',
      component: Order
    }, {
      path: '/search',
      component: Search
    },
    {
      path:'/',
      redirect:'/msite'
    }
  ]
})
