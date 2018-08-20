import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index.vue'
import Artical from './pages/artical.vue'
import About from './pages/about.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/', 
      component: Index, 
      name:'首页' 
    },
    { 
      path: '/about', 
      component: About, 
      name:'关于' 
    },
    { 
      path: '/artical/:id', 
      component: Artical, 
      name:'文章详情'
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})