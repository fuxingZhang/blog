import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import Index from './pages/index.vue'
import Artical from './pages/artical.vue'
import About from './pages/about.vue'
import axios from './api/axios.js'

Vue.prototype.axios = axios

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index, name:'首页' },
  { path: '/about', component: About, name:'关于' },
  { path: '/artical/:id', component: Artical, name:'文章详情'},
]

const router = new VueRouter({
  mode: 'history',
  routes 
})

router.beforeEach( async(to, from, next) => {
  document.title = to.name

  next()
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   el: '#app',   //语法糖
//   router,
//   render: h => h(App)
// })

