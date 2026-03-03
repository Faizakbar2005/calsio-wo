import { createRouter, createWebHistory } from 'vue-router'
import ProfileSetup from '../views/ProfileSetup.vue'
import Dashboard from '../views/Dashboard.vue'
import Workout from '../views/Workout.vue'
import History from '../views/History.vue'


// router/index.js
import BukuAcuan from '../views/BukuAcuan.vue'

const routes = [
  { path: '/', name: 'Home', component: Dashboard },
  { path: '/setup', name: 'Setup', component: ProfileSetup },
  { path: '/buku-acuan', name: 'BukuAcuan', component: BukuAcuan },
  { path: '/history', name: 'History', component: History },
  { path: '/workout', name: 'Workout', component: Workout }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isSetup = localStorage.getItem('calsio_user_setup')

  if (!isSetup && to.name !== 'Setup') {
    return next({ name: 'Setup' })
  }

  if (isSetup && to.name === 'Setup') {
    return next({ name: 'Home' })
  }

  next()
})

export default router