import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresLogin: true
    },
    component: Home
  },
  {
    path: '/posts/:postId/',
    name: 'Posts',
    meta: {
      requiresLogin: true
    },
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/register/',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/logout/',
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/messages/',
    name: 'Messages',
    meta: {
      requiresLogin: true
    },
    component: () => import('../views/Messages.vue')
  },
  {
    path: '/notifications/',
    name: 'Notifications',
    meta: {
      requiresLogin: true
    },
    component: () => import('../views/Notifications.vue')
  },
  {
    path: '/profile/:userId/',
    name: 'Profile',
    meta: {
      requiresLogin: true
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/bookmarks/',
    name: 'Bookmarks',
    meta: {
      requiresLogin: true
    },
    component: () => import('../views/Bookmarks.vue')
  },
  {
    path: '/settings/',
    name: 'Settings',
    meta: {
      requiresLogin: true
    },
    component: () => import('../views/Settings.vue')
  },
    {
    path: '/search/:content/',
    name: 'Search',
    meta: {
      requiresLogin: true
    },
    component: () => import('../views/Search.vue')
  },
  {
    path: '/redirect/:location/:id',
    name: 'Redirect',
    component: () => import('../views/Redirect.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
