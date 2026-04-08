/*
 * @Descripttion: 
 * @uniVersion: 
 * @Author: zq
 * @Date: 2026-04-08 16:42:34
 * @LastEditors: zq
 * @LastEditTime: 2026-04-08 17:15:54
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Service from '../views/Service.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '主页', icon: '🏠' }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { title: '产品', icon: '📦' }
  },
  {
    path: '/service',
    name: 'Service',
    component: Service,
    meta: { title: '服务', icon: '🎧' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: '我的', icon: '👤' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
