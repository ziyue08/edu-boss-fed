/*
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-28 17:55:06
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-28 17:56:46
 */
/**
 * 资源分类相关请求模块
 */

import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
