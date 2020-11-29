/*
 * @Descripttion:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-09 20:43:02
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-26 02:05:07
 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'
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

function redirectLogin () {
  return router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({ // 创建一个新的 axios 实例发送请求，因为如果使用request会可能发生 401 死循环
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token // refreshtoken只能使用一次
    })
  })
}
// 无痛刷新：先请求接口，如果是401，判断容器中是否有user，
// 如果没有的话，直接进入登录页，
// 如果有user，则请求refresh_token接口，然后重新设置接口的返回值给容器的user，再重新请求接口。

let isRefreshing = false // 控制刷新 token 的状态
let requests: any[] = []
// 响应拦截器
request.interceptors.response.use(function (response) { // 状态码为 2xx 都会进入这里
  console.log('请求响应成功了', response)
  return response
}, async function (error) { // 超过 2xx 状态码都在这里
  console.dir('请求响应失败了', error)
  // 如果使用的 HTTP 状态码，错误处理就写到这里
  if (error.response) {
    // 请求收到响应了，但是状态码超过了 2xx 范围
    // 400
    // 401
    // 403
    // 404
    // 500
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效 （没有提供 token, token 是无效的, token 过期了）
      // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (!isRefreshing) { // 解决多次请求重新刷新 Token 的问题
        isRefreshing = true
        // 尝试刷新token
        return refreshToken().then((res) => {
          if (!res.data.success) {
            throw new Error('刷新TOKEN失败')
          }

          // 成功了->把本次失败的请求重新发出去
          // 把成功刷新拿到的access_token更新到容器和本地存储中
          store.commit('setUser', res.data.content)
          // 把本地失败的请求重新发出去
          requests.forEach(cb => cb())
          requests = [] // 重置request数组
          return request(error.config) // 失败请求的配置信
        }).catch(err => {
          // 把当前登录用户状态清除
          store.commit('setUser', null)
          // 失败了->直接跳转到登录页
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRefreshing = false // 重置状态
        })
      }

      // 刷新状态下，把请求挂起，放到 requests 数组中
      return new Promise((resolve) => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去了，但是没有收到响应（请求超时，网络断开）
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error('请求失败: ' + error.message)
  }

  // 把请求失败的错误对象继续抛出，扔给下一个调用者
  return Promise.reject(error)
})

export default request
