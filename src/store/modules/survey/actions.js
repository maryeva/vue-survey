export default {
  addSelectedItem (context, { selection, type }) {
    context.commit('addSelection', { selection, type })
  },
  removeSelectedItem (context, { selection, type }) {
    context.commit('removeSelection', { selection, type })
  }
}
