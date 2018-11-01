export default {
  UPDATE_NAME: (state, data) => {
    state.surveyData.name = data.value
  },

  UPDATE_FIELD: (state, data) => {
    state.surveyData[data.category][data.value].selected = !state.surveyData[data.category][data.value].selected
  }
}
