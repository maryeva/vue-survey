export default {
  updateName (state, name) {
    state.name = name
  },
  addSelection (state, { selection, type }) {
    switch (type) {
      case 'goals':
        state[type] = [...state[type], selection]
        break
      default:
        state[type] = selection
        break
    }
  },
  removeSelection (state, { selection, type }) {
    switch (type) {
      case 'goals':
        state[type] = state[type].filter(item => item !== selection)
        break
      default:
        state[type] = ''
        break
    }
  },
  updateDob (state, dob) {
    state.dob = dob
  }
}
