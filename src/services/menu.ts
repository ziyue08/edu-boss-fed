/*
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-28 16:12:35
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-28 16:59:05
 */
import request from '@/utils/request'

export const createOrUpdateMenu = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string|number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: { id } // 会自动以key=value的形式拼接到url后
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
