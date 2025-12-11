// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // Default entry -> Login
  {
    path: '/',
    redirect: '/auth/login'
  },

  // Auth routes (outside admin layout)
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: { title: 'Login - KFLIX', requiresAuth: false }
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/auth/ForgotPassword.vue'),
    meta: { title: 'Forgot Password - KFLIX', requiresAuth: false }
  },

  {
    path: '/auth/otp-verification',
    name: 'OtpVerification',
    component: () => import('../views/auth/OtpVerification.vue'),
    meta: { title: 'OTP Verification - KFLIX', requiresAuth: false }
  },

  // Admin layout shell and child pages
  {
    path: '/admin',
    component: () => import('../views/dashboard/KflixAdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      // Default redirect to dashboard
      { path: '', redirect: '/admin/dashboard' },

      // Dashboard (layout renders dashboard content when path === '/admin/dashboard')
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: { template: '<div></div>' },
        meta: { title: 'Dashboard - KFLIX', requiresAuth: true }
      },

      // Video streaming
      {
        path: 'video-streaming/add-video',
        name: 'AddNewVideo',
        component: () => import('../views/video-streaming/AddNewVideo.vue'),
        meta: { title: 'Add New Video - KFLIX', requiresAuth: true }
      },
      {
        path: 'video-streaming/add-episode',
        name: 'AddEpisode',
        component: () => import('../views/video-streaming/AddEpisode.vue'),
        meta: { title: 'Add Episode - KFLIX', requiresAuth: true }
      },
      {
        path: 'video-streaming/create-live-event',
        name: 'CreateLiveEvent',
        component: () => import('../views/video-streaming/CreateLiveEvent.vue'),
        meta: { title: 'Create Live Event - KFLIX', requiresAuth: true }
      },

      // Gaming
      {
        path: 'gaming/add-game',
        name: 'AddGame',
        component: () => import('../views/gaming/AddGame.vue'),
        meta: { title: 'Add New Game - KFLIX', requiresAuth: true }
      },

      // User management - Create User page
      {
        path: 'users/create',
        name: 'CreateUser',
        component: () => import('../views/dashboard/CreateUser.vue'),
        meta: { title: 'Create User - KFLIX', requiresAuth: true }
      }
    ]
  },

  // Catch-all -> Login (or a 404 page if available)
  { path: '/:pathMatch(.*)*', redirect: '/auth/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title on route change
router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'KFLIX'
  next()
})

export default router
