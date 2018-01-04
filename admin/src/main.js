
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})