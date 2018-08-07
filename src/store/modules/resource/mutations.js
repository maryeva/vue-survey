import Vue from 'vue'

const singularResources = ['health_profile']

export default {
  SET_RECORD: (state, data) => {
    if (state[data.type]) {
      if (singularResources.includes(data.type)) state[data.type] = data
      else Vue.set(state[data.type], data.id, data)
    }
  },

  RESET_RECORDS: (state) => {
    state.records = []
  },

  SET_LOADING: (state, loading) => {
    state.loading = loading
  },

  RESET_LOADING: (state) => {
    state.loading = false
  },

  SET_ERROR: (state, error) => {
    state.error = error
  },

  RESET_ERROR: (state) => {
    state.error = null
  }
}
