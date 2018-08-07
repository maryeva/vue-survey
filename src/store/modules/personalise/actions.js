// import axios from 'axios'
import router from '@/router'
import moment from 'moment'

export default {
  SETUP_EXISTING_PROFILES ({ dispatch, getters }, params) {
    let personalisedProfiles = getters.currentSubscriptionProfiles.filter(profile => {
      return !getters.coreSubscriptionPanel.profiles.includes(profile.id)
    })
    personalisedProfiles.forEach(profile => {
      if (!getters.addedProfiles.map(p => p.id).includes(profile.id)) {
        dispatch('TOGGLE_PROFILE', { id: profile.id })
      }
    })
  },

  FETCH_PROFILE_PRICES ({ commit, dispatch, state, getters }, params) {
    commit('SET_FETCHING_PROFILE_PRICES')
    let toFetch = []

    // fetch current panel price
    toFetch.push({ id: 'CURRENT', panelProfileCombination: getters.updatedSubscriptionProfiles.map(profile => profile.id) })

    // fetch prices of added profiles
    getters.addedProfiles.forEach(addedProfile => {
      toFetch.push({
        id: addedProfile.id,
        panelProfileCombination: getters.updatedSubscriptionProfiles.filter(profile => profile.id !== addedProfile.id).map(profile => profile.id)
      })
    })

    // fetch prices of recommendations and additional profiles
    state.validProfiles.forEach(profile => {
      if (!getters.addedProfiles.find(addedProfile => profile === addedProfile.id)) {
        toFetch.push({
          id: profile,
          panelProfileCombination: getters.updatedSubscriptionProfiles.map(profile => profile.id).concat(profile)
        })
      }
    })

    // fetch relevant panels
    let fetchPromises = toFetch.map(async fetchable => {
      let request = fetchable.panelProfileCombination
      try {
        let data = await dispatch('resource/FETCH', { path: `test_panels?filter[profile_ids]=${request}`, type: 'panels' }, { root: true })
        return { id: fetchable.id, panel: data[0] }
      } catch (e) { return e }
    })

    // We want to wait until all are returned (or errored)
    Promise.all(fetchPromises)
      .then(results => {
        let currentPanelPrice = results.find(result => result.id === 'CURRENT').panel.attributes.price
        results.forEach(result => {
          if (result.panel) {
            let newPanelPrice = result.panel.attributes.price
            let priceDifference = Math.abs(newPanelPrice - currentPanelPrice) || null
            commit('SET_PROFILE_PRICE', { id: result.id, price: priceDifference })
          } else {
            commit('SET_PROFILE_PRICE', { id: result.id, price: null })
          }
        })
        commit('RESET_FETCHING_PROFILE_PRICES')
      })
  },

  async UPDATE_SUBSCRIPTION ({ dispatch, rootGetters, getters, commit }, params) {
    let currentSubscription = rootGetters['subscription/firstSub']

    // TODO move to resource module once we switch fully to global error module
    commit('error/RESET', 'resource/update/subscription', { root: true })

    try {
      let updatedSubscription = await dispatch('resource/UPDATE', {
        path: `subscriptions/${currentSubscription.id}?include=panel.profiles`,
        type: 'subscription',
        attributes: { test_panel_id: params.id, personalised_at: moment().format() }
      }, { root: true })
      commit('subscription/SET_MODAL_VISIBLE', { modal: 'personaliseConfirmation', data: currentSubscription.id }, { root: true })

      dispatch('analytics/TRACK', {
        event: 'Subscription Personalised',
        properties: {
          initialPrice: currentSubscription.attributes.price_per_test,
          initialPanel: currentSubscription.relationships.panel.data.id,
          updatedPrice: updatedSubscription.attributes.price_per_test,
          updatedPanel: updatedSubscription.relationships.panel.data.id,
          addonProfiles: getters.addedProfiles.map(profile => {
            return {
              id: profile.id,
              recommended: getters.recommendations.some(r => r.relationships.profile.data.id === profile.id)
            }
          })
        }
      }, { root: true })

      router.push({ name: 'ManageSubscription' })
    } catch (e) {
      commit('error/SET', 'resource/update/subscription', { root: true })
    }
  },

  async PURCHASE_ONE_OFF_TEST ({ dispatch, state, rootGetters, getters, commit }, params) {
    try {
      let request = {
        data: {
          type: 'test',
          attributes: {
            test_panel_id: state.oneOffPanel.id,
            test_date: moment().format('YYYY-MM-DD')
          }
        }
      }
      await dispatch('onboarding/PURCHASE_TEST', request, { root: true })

      dispatch('analytics/TRACK', {
        event: 'OneOffTest Purchased',
        properties: {
          price: state.oneOffPanel.attributes.price,
          profiles: getters.addedProfiles.map(profile => profile.id)
        }
      }, { root: true })
    } catch (e) { console.log(e) }
  },

  TOGGLE_PROFILE ({ dispatch, getters }, params) {
    let profileID = params.id
    let addonProfiles = getters.addedProfiles.map(profile => profile.id)
    let removedProfiles = getters.removedProfiles.map(profile => profile.id)
    if (addonProfiles.includes(profileID)) {
      if (!params.remove) removedProfiles.push(profileID)
      addonProfiles = addonProfiles.filter(p => p !== profileID)
      dispatch('analytics/TRACK', { event: 'TestProfile Removed', id: profileID }, { root: true })
    } else {
      addonProfiles.push(profileID)
      dispatch('analytics/TRACK', { event: 'TestProfile Added', id: profileID }, { root: true })
      removedProfiles = removedProfiles.filter(p => p !== profileID)
    }

    router.replace({ query: { type: params.type, addons: addonProfiles.join(','), removed: removedProfiles.join(',') } })

    if (params.type === 'oneOff') {
      dispatch('FETCH_ONE_OFF_PANEL')
    } else {
      dispatch('FETCH_PROFILE_PRICES')
    }
  },

  async FETCH_ONE_OFF_PANEL ({ dispatch, commit, getters }, params) {
    let profiles = getters.addedProfiles.map(profile => profile.id).join(',')
    try {
      const data = await dispatch('resource/FETCH', { path: `test_panels?filter[profile_ids]=${profiles}&include=profiles`, type: 'panels' }, { root: true })
      commit('SET_ONE_OFF_PANEL', data[0])
    } catch (e) { console.log(e) }
  }
}
