//调动mutations
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER
} from './mutation-types'

//调用api接口
import {
  reqAddress,
  reqFoodCategorys,
  reqShops
} from '../api/index'

export default {
//  定义3个异步actions
//  异步获取地址
  async getAddress ({commit, state}) {
    //发送ajax异步请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

//  异步获取食品分类
  async getFoodCategorys ({commit, state}) {
    //发送ajax异步请求
    const result = await reqFoodCategorys()
    //提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

//  异步获取商家列表
  async getShops ({commit, state}) {
    //发送ajax异步请求
    const result = await reqShops(state.longitude, state.latitude)
    //提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

//  获取用户信息--由于login页面已经获取到user信息，故现在是同步获取的user信息，不是再次发请求到后台获取user
  getUer ({commit}, user) {
    commit(RECEIVE_USER, {user})
  }

}
