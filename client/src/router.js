import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      title: "Matcha - Homepage",
      component: () => import('./views/Home.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import('./views/auth/Login.vue')
    },
    {
      path: "/login/:oauthMethod/:oauthCode",
      name: "loginOauth",
      component: () => import('./views/auth/Login.vue')
    },
    {
      path: '/oauth/:oauthMethod',
      name: 'Oauth',
      meta: {title: "Oauth - Matcha"},
      component: () => import('./views/Oauth.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import('./views/auth/Register.vue')
    },
    {
      path: "/disconnect",
      name: "disconnect",
      component: () => import('./views/auth/Disconnect.vue')
    },
    {
      path: "/activate/:nickname/:token",
      name: "activate",
      component: () => import('./views/auth/Activate.vue')
    },
    {
      path: "/forgotPass",
      name: "forgotPass",
      component: () => import('./views/auth/ForgotPass.vue')
    },
    {
      path: "/changepass",
      name: "changePass",
      component: () => import('./views/auth/ChangePass.vue')
    },
    {
      path: "/chat",
      name: "chat",
      meta: {name: "Chat - Matcha"},
      component: () => import('./views/Chat.vue')
    },
    {
      path: "/settings",
      name: "settings",
      meta: {title: "Settings - Matcha"},
      component: () => import('./views/Settings.vue')
    },
    {
      path: "/search",
      name: "search",
      meta: {title: "Search - Matcha"},
      component: () => import('./views/Search.vue')
    },
    {
      path: "/user",
      name: "user",
      meta: {title: "User - Matcha"},
      component: () => import('./views/User.vue')
    },
    {
      path: '*',
      name: 'p404',
      component: () => import('./views/p404.vue')
    }
  ]
})
