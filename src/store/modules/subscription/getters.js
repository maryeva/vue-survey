export default {
  firstSub: (state, getters, rootState) => {
    const subscription = rootState.resource.subscription
    if (Object.keys(subscription).length !== 1) {
      let firstActiveSub = Object.values(subscription).filter(s => s.attributes.state === 'active')
      if (firstActiveSub.length) return firstActiveSub[0]
    }
    return subscription[Object.keys(subscription)[0]]
  }
}
