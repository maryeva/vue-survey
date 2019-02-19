import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import modules from './modules/index'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: state(),
  modules,
  plugins: [createPersistedState()]
})

export default store
