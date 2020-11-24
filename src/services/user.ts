/*
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-22 20:52:35
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-24 21:35:22
 */

// import store from '@/store'
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string;
  password: string;
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login', // 此处要走代理，否则无法跨域请求
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // 如果 data 是 qs.stringify(data) 格式，则 content-type 是 application/x-www-form-urlencoded
    // 如果 data 是 json 格式，则 content-type 是 application/json
    // 如果 data 是FormData 格式，则 content-type 是 multipart/form-data
    data: qs.stringify(data) // axios 默认发送是 application/json 格式的数据
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo' // 此处要走代理，否则无法跨域请求
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}
