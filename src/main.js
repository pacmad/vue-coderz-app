import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Master from './layout/Master.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/app', component: App }
]

const router = new VueRouter({
  routes
})



new Vue({
  router: router,
  render: h => h(Master),
}).$mount('#app')
