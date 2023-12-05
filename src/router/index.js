import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const CreateCommunityVue = () => import('@/components/CreateCommunityVue.vue')
const PageNotFoundVue = () => import('@/views/PageNotFoundVue.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'CreateCommunityVue',
    component: CreateCommunityVue
  },
  {
    path: '/:catchall(.*)*',
    component: PageNotFoundVue
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
