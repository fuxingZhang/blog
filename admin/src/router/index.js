import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import admin from '@/pages/admin.vue'
import ArticalList from '@/pages/articalList.vue'
import AddArtical from '@/pages/addArtical.vue'
import EditArtical from '@/pages/editArtical.vue'
import account from '@/pages/account.vue'
import tag from '@/pages/tag.vue'

Vue.use(Router)

const router = new Router({ 
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login, name:'登录' }, 
    { path: '/admin', component: admin, name:'管理主页' }, 
    { path: '/admin/articalList', component: ArticalList, name:'文章列表' },
    { path: '/admin/addArtical', component: AddArtical, name:'添加文章' },
    { path: '/admin/editArtical/:id', component: EditArtical, name:'编辑文章' },
    { path: '/admin/account', component: account, name:'帐号管理' },
    { path: '/admin/tag', component: tag, name:'标签管理' }
  ]
})

router.beforeEach( async(to, from, next) => {
  document.title = to.name
  next()
})

export default router
