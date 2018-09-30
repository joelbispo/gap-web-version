import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'
const fb = require('./firebase-helpers/firebaseConfig')

Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      components: { App },
      router,
      store,
      template: '<App/>'
    }).$mount('#app')
  }
})
