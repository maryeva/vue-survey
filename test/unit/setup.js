import Vue from 'vue'

import VeeValidate from 'vee-validate'
import validationConfig from '@/config/validation.js'

import '@/filters/filters'
import './factories/factories'
import './mocks/matchMediaMock'

Vue.use(VeeValidate, validationConfig)

Vue.config.productionTip = false
