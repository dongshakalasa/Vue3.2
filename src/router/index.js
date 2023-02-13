import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: ()=>import("@/views/Home.vue")
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import('@/views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    component: () => import('@/views/InfoUser.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.isLogin) {
        next()
      }else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
