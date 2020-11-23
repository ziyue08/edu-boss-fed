/*
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-08 16:14:55
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-22 21:26:32
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

import Layout from '@/layout/index.vue'
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',  // 默认子路由
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
    {
      path: '/resource',
      name: 'resource',
      component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
    },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫：任何页面的访问都要经过这里
// to: 要去哪里的路由信息
// from 从哪里来的路由信息
// next 通行标志
router.beforeEach((to, from, next) => {
  console.log();

  //路由守卫中一定要调用next, 否则页面无法展示
  next()
  if(to.path !== '/login'){
    // 校验登录状态

  }
})
export default router
