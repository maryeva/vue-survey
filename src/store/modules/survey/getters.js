import { getField } from 'vuex-map-fields'
import { reduce } from 'lodash'

export default {
  // This creates the two way data binding between the store and the health profile form
  // For more info see https://github.com/maoberlehner/vuex-map-fields
  getField: (state) => {
    return getField(state.surveyData)
  },
  // returns an array of each category that has reached its allowed limit
  selectionLimitReached: state => {
    let selectedLimits = state.config.selectedLimits
    let limitReached = reduce(selectedLimits, (result, value, key) => {
      let amountSelected = Object.values(state.surveyData[key]).filter(category => category.selected).length
      return amountSelected >= value ? result.concat(key) : result
    }, [])
    return limitReached
  },

  // returns an array of currently selected values for a category
  selectedValue: state => category => {
    return reduce(state.surveyData[category], (result, value, key) => {
      return value.selected ? result.concat(key) : result
    }, [])
  }
}
