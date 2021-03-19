import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue')
  },
  {
    path: '/myprofil',
    name: 'MyProfil',
    component: () => import(/* webpackChunkName: "myprofil" */ '../views/MyProfil.vue')
  },
  {
    path: '/modifyprofil',
    name: '/ModifyProfil',
    component: () => import(/* webpackChunkName: "modifyprofil" */ '../views/ModifyProfil.vue')
  },
  {
    path: '/allusers',
    name: 'AllUsers',
    component: () => import(/* webpackChunkName: "allusers" */ '../views/AllUsers.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
