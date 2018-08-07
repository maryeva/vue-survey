import Vue from 'vue'

export default {
  SET_ONE_OFF_PANEL: (state, panel) => {
    state.oneOffPanel = panel
  },

  SET_TYPE: (state, type) => {
    state.type = type
  },

  SHOW_PRODUCT_COMPARE: (state) => {
    state.showProductCompare = !state.showProductCompare
  },

  SET_FETCHING_PROFILE_PRICES: (state) => {
    state.fetchingProfilePrices = true
  },

  RESET_FETCHING_PROFILE_PRICES: (state) => {
    state.fetchingProfilePrices = false
  },

  SET_PROFILE_PRICE: (state, data) => {
    Vue.set(state.profilePrices, data.id, data.price)
  }
}
