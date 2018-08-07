// TODO: this is shared with specialists, move to UI

import moment from 'moment'
import Vue from 'vue'

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('currentAge', (value) => {
  if (value) {
    return moment().diff(String(value), 'years')
  }
})

Vue.filter('formatPrice', (value) => {
  if (!value) { return '' }
  var afterDecimal = value % 100
  var beforeDecimal = (value - (value % 100)) / 100
  if (afterDecimal < 10) {
    afterDecimal = '0' + afterDecimal
  }
  return beforeDecimal.toString() + '.' + afterDecimal
})

Vue.filter('capitalize', (value) => {
  if (!value) { return '' }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// converts _s to spaces
Vue.filter('humanize', (value) => {
  if (!value) { return '' }
  return value.toString().replace(/_/g, ' ')
})
