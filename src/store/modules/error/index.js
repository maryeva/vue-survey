import mutations from './mutations'
import state from './state'

export default {
  namespaced: true,
  state: state(),
  mutations
}
