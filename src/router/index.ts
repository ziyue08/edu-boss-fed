/*
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-08 16:14:55
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-28 20:20:44
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { // 父路由写过了 requiresAuth ，子路由就可以不用写了
      requiresAuth: true // 自定义数据
    }, // meta 默认就是一个空对象，不写也行
    children: [
      {
        path: '',
        name: 'home', // 默认子路由
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
        // meta: {
        //   requiresAuth: true // 自定义数据
        // } // meta 默认就是一个空对象，不写也行
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
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-creat-edit' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-creat-edit' */ '@/views/menu/edit.vue')
      },
      {
        path: '/role/:rollId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue')
      }
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) { // 跳转到登录页面
      next({
        name: 'login',
        query: {
          redirectTo: to.fullPath
        }
      })
    } else {
      next() // 允许通过
    }
  } else {
    next() // 允许通过
  }
  // 路由守卫中一定要调用next, 否则页面无法展示
  // next()
  // if(to.path !== '/login'){
  //   // 校验登录状态
  // }
})
export default router
