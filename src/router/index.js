import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'hello-page',
    component: () => import('../pages/t-hello-page.vue')
  },
  {
    path:'/gameplay',
    name:'gameplay',
    component: () => import('../pages/t-gameplay.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
