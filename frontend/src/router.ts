import { createWebHistory, createRouter } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/account',
      component: () => import('@/views/AccountView.vue')
    },
    {
      path: '/vehicle/:id',
      component: () => import('@/views/VehicleView.vue')
    },
    {
      path: '/payment/infos=:infos&price=:price',
      component: () => import('@/views/PaymentView.vue')
    }
  ]
})
