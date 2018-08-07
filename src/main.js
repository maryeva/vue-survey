// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@thrivadev/thriva-ui/dist/ui.css'
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import './filters/filters.js'

Vue.config.productionTip = false

// sync router with store under route module
sync(store, router, { moduleName: 'route' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
