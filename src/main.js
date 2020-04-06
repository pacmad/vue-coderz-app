import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import Master from './layout/Master.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || '',
    loggedUser: JSON.parse(localStorage.getItem('user')) || {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLoggedUser(state, user) {
      state.loggedUser = user
    },
    deleteToken(state) {
      state.token = ''
    },
    deleteLoggedUser(state){
      state.loggedUser = {}
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.loggedUser;
    },
    loggedIn(state) {
      return state.token !== ''
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/login', {
            username: credentials.username,
            password: credentials.password
          })
          .then((response) => {
            context.commit('setToken', response.data.access_token)
            localStorage.setItem('access_token', response.data.access_token)
            resolve(response)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    retrieveUser(context, token) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/user', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            context.commit('setLoggedUser', response.data)
            resolve(response)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    deleteToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/logout')
          .then((response) => {
            console.log(response)
            context.commit('deleteToken')
            localStorage.removeItem('access_token')
            context.commit('deleteLoggedUser')
            localStorage.removeItem('user')
            resolve(response)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
})

const routes = [{
    path: '/',
    name: 'root',
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/app',
    name: 'app',
    component: App
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'root' && !store.getters.loggedIn)
    next({
      name: 'login'
    })
  else if (to.name === 'app' && !store.getters.loggedIn)
    next({
      name: 'login'
    })
  else if (to.name === 'login' && store.getters.loggedIn)
    next({
      name: 'app'
    })
  else if (to.name === 'root' && store.getters.loggedIn)
    next({
      name: 'app'
    })
  else next()
})


new Vue({
  store: store,
  router: router,
  render: h => h(Master),
}).$mount('#app')
