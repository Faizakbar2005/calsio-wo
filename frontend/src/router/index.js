import { createRouter, createWebHistory } from 'vue-router'
import LandingPage  from '../views/LandingPage.vue'
import ProfileSetup from '../views/ProfileSetup.vue'
import Dashboard    from '../views/Dashboard.vue'
import Workout      from '../views/Workout.vue'
import History      from '../views/History.vue'
import EditProfile  from '../views/EditProfile.vue'
import BukuAcuan    from '../views/BukuAcuan.vue'
import Login        from '../views/auth/Login.vue'
import Register     from '../views/auth/Register.vue'
import AdminPage    from '../views/admin/AdminPage.vue'   // ← TAMBAHAN

const routes = [
  { path: '/',           name: 'Landing',   component: LandingPage  },
  { path: '/login',      name: 'Login',     component: Login        },
  { path: '/register',   name: 'Register',  component: Register     },
  { path: '/dashboard',  name: 'Home',      component: Dashboard    },
  { path: '/setup',      name: 'Setup',     component: ProfileSetup },
  { path: '/buku-acuan', name: 'BukuAcuan', component: BukuAcuan    },
  { path: '/history',    name: 'History',   component: History      },
  { path: '/profile',    name: 'Profile',   component: EditProfile  },
  { path: '/workout',    name: 'Workout',   component: Workout      },

  // ── Admin ──────────────────────────────────────────────────────
  {
    path     : '/admin',
    name     : 'Admin',
    component: AdminPage,
    meta     : { isAdmin: true },    // bebas dari guard user biasa
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, from, next) => {
  // ── Rute admin: guard terpisah ──────────────────────────────────
  if (to.meta.isAdmin) {
    const adminToken = localStorage.getItem('admin_token')
    // Kalau sudah punya admin_token langsung masuk,
    // kalau belum tetap masuk — AdminPage yang handle login-nya sendiri
    return next()
  }

  const isLoggedIn = localStorage.getItem('calsio_token')
  const isSetup    = localStorage.getItem('calsio_user_setup')
  const hasVisited = localStorage.getItem('calsio_visited')

  // Pertama kali buka app → Landing
  if (!hasVisited) {
    localStorage.setItem('calsio_visited', 'true')
    if (to.name === 'Landing') return next()
    return next({ name: 'Landing' })
  }

  // Landing selalu bisa diakses
  if (to.name === 'Landing') return next()

  // Login & Register: kalau sudah login redirect ke dashboard
  if (to.name === 'Login' || to.name === 'Register') {
    if (isLoggedIn && isSetup) return next({ name: 'Home' })
    return next()
  }

  if (isLoggedIn && !isSetup && to.name === 'Setup') return next()

  // Belum login → paksa ke Login
  if (!isLoggedIn) return next({ name: 'Login' })

  // Sudah login tapi belum setup → paksa ke Setup
  if (!isSetup && to.name !== 'Setup') return next({ name: 'Setup' })

  // Sudah setup tapi ke Setup → ke Dashboard
  if (isSetup && to.name === 'Setup') return next({ name: 'Home' })

  next()
})

export default router