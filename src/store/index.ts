/*
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-08 16:14:55
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-22 21:12:53
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化的功能
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')  //字符串'null'通过JSON.parse 转换后对应是数据类型null
    // user: null // 当前登录用户状态
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user',payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
