import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  modules
})

export default store
