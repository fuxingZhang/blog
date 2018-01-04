import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import admin from '@/pages/admin.vue'
import account from '@/pages/account.vue'
import tag from '@/pages/tag.vue'

Vue.use(Router)

const router = new Router({ 
  mode: 'hash',
  routes: [
    { path: '/login', component: login, name:'登录' }, 
    { path: '/admin', component: admin, name:'管理主页' }, 
    { path: '/admin/account', component: account, name:'帐号管理' },
    { path: '/admin/tag', component: tag, name:'标签管理' }
  ]
})

router.beforeEach( async(to, from, next) => {

  document.title = to.name

  next()
})

export default router
