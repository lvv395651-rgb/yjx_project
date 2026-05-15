import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('../pages/Article.vue')
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('../pages/Categories.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/Register.vue')
    }
  ]
})

export default router
