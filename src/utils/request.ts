/*
 * @Descripttion:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-09 20:43:02
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-24 21:36:09
 */
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  // 配置选项
  // baseURl
  // timeout,

})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 这里是拦截的接口
  // 改写 config 对象来实现业务功能的统一
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  console.log('config', config)
  // 注意这里一定要返回config,否则请求就发不出去了
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
export default request
