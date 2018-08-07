export default {
  // hasCompletedTest: returns true if the client has completed a test
  // used in introduction view to determine whether they may personalise
  hasCompletedTest: (state, getters, rootState, rootGetters) => {
    let subscription = rootGetters['subscription/firstSub']
    if (!subscription) return false
    // check all subscriptions for a completed test
    let tests = Object.values(rootState.resource.subscription).map(subscription => {
      return rootGetters['resource/related']({resource: subscription, relationship: 'test'})
    }).reduce((a, b) => a.concat(b), [])
    if (tests) return tests.filter(t => t.attributes.state === 'complete').length > 0
    return false
  },

  subscriptionStatus: (state, getters, rootState, rootGetters) => {
    let subscription = rootGetters['subscription/firstSub']
    if (!subscription) return null
    return subscription.attributes.state
  },

  // current means current saved on backend (could already be personalised)
  currentSubscriptionPanel: (state, getters, rootState, rootGetters) => {
    let subscription = rootGetters['subscription/firstSub']
    if (!subscription) return {}
    return rootGetters['resource/related']({resource: subscription, relationship: 'panel'})
  },

  // current means current saved on backend
  currentSubscriptionProfiles: (state, getters, rootState, rootGetters) => {
    if (!getters.currentSubscriptionPanel.id) return []
    return rootGetters['resource/related']({resource: getters.currentSubscriptionPanel, relationship: 'profiles'}).filter(profile => {
      return profile !== undefined
    })
  },

  // profiles added
  addedProfiles: (state, getters, rootState) => {
    let allProfiles = rootState.resource.profile
    if (rootState.route.query.addons) {
      let addedProfileIDs = rootState.route.query.addons.toString().split(',')
      let addedProfiles = Object.values(allProfiles).filter(profile => addedProfileIDs.includes(profile.id))
      return addedProfiles.filter(profile => !getters.coreSubscriptionProfiles.map(c => c.id).includes(profile.id))
    } else return []
  },

  // profiles "removed" (so that we can have the undo behavior)
  removedProfiles: (state, getters, rootState) => {
    let allProfiles = rootState.resource.profile
    if (rootState.route.query.removed) {
      let removedProfileIDs = rootState.route.query.removed.toString().split(',')
      let removedProfiles = Object.values(allProfiles).filter(profile => removedProfileIDs.includes(profile.id))
      return removedProfiles.filter(profile => !getters.coreSubscriptionProfiles.map(c => c.id).includes(profile.id))
    } else return []
  },

  // returns the current core subscription
  coreSubscriptionPanel: (state, getters, rootState, rootGetters) => {
    let corePanels = Object.values(rootState.subscription.coreSubscriptions).map(subscription => {
      return {
        name: subscription.data.attributes.name,
        id: subscription.data.id,
        profiles: subscription.data.relationships.profiles.data.map(p => p.id)
      }
    }).sort((a, b) => b.profiles.length - a.profiles.length)
    return corePanels.find(panel => {
      return panel.profiles.every(profile => getters.currentSubscriptionProfiles.map(p => p.id).includes(profile))
    })
  },

  coreSubscriptionProfiles: (state, getters, rootState, rootGetters) => {
    if (!getters.coreSubscriptionPanel) return []
    let allProfiles = Object.values(rootState.resource.profile)
    return allProfiles.filter(profile => {
      return getters.coreSubscriptionPanel.profiles.includes(profile.id)
    })
  },

  // the current subscription panel profiles combined with any new ones added
  updatedSubscriptionProfiles: (state, getters, rootState) => {
    // use set to get unique values only
    return [...new Set(getters.coreSubscriptionProfiles.concat(getters.addedProfiles))]
  },

  // the panel which contains all the current panel profiles combined with any new ones added
  updatedSubscriptionPanel: (state, getters, rootState) => {
    let allPanels = Object.values(rootState.resource.panel)
    return allPanels.find(panel => {
      return panel.relationships.profiles.data.map(i => i.id).sort().toString() === getters.updatedSubscriptionProfiles.map(i => i.id).sort().toString()
    }) || {}
  },

  // check if the "built" subscription is different to the saved one
  panelHasChanged: (state, getters, rootState) => {
    return getters.currentSubscriptionProfiles.map(i => i.id).sort().toString() !== getters.updatedSubscriptionProfiles.map(i => i.id).sort().toString()
  },

  // Filter out invalid profiles based on core subscription panel
  // Essential and Baseline don't have AB12
  // Advanced doesn't have BVIT
  validProfilesForSub: (state, getters, rootState) => {
    if (!getters.coreSubscriptionPanel) return []
    if (getters.coreSubscriptionPanel.id !== 'TPIQH3') return state.validProfiles.filter(profile => profile !== 'AB12')
    else return state.validProfiles.filter(profile => profile !== 'BVIT')
  },

  // additional valid profiles available
  additionalProfiles: (state, getters, rootState) => {
    let allProfiles = Object.values(rootState.resource.profile)
    let additionalProfiles = allProfiles.filter(profile => {
      return !getters.recommendations.map(r => r.relationships.profile.data.id).includes(profile.id) &&
        !getters.coreSubscriptionProfiles.map(c => c.id).includes(profile.id) &&
        getters.validProfilesForSub.map(p => p).includes(profile.id)
    })
    return additionalProfiles
  },

  // profile recommendations, filtered by ones that are not part of core subscription or a valid profile
  recommendations: (state, getters, rootstate) => {
    let allRecommendations = Object.values(rootstate.resource.profile_recommendation)
    let recommendations = allRecommendations.filter(recommendation => {
      return !getters.coreSubscriptionProfiles.map(c => c.id).includes(recommendation.relationships.profile.data.id) &&
        getters.validProfilesForSub.map(p => p).includes(recommendation.relationships.profile.data.id)
    })
    return recommendations
  }
}
