import Vue from 'vue'

export default {
  SET: (state, key) => { Vue.set(state, key, true) },
  RESET: (state, key) => { Vue.delete(state, key) },
  RESET_ALL: (state, key) => { state = {} }
}
