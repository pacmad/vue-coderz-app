import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Master from './layout/Master.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    loggedUser: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLoggedUser(state, user) {
      state.loggedUser = user
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state){
      return state.loggedUser;
    },
    loggedIn(state){
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
          context.commit('setLoggedUser', response.data)
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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/app',
    name: 'app',
    component: App
  }
]

const router = new VueRouter({
  routes
})



new Vue({
  store: store,
  router: router,
  render: h => h(Master),
}).$mount('#app')
