import Vue from 'vue'

import { booleanFilter } from './boolean'
import { registerNumberFilter } from './number'

export const registerFilters = () => {
  Vue.filter('bool', booleanFilter)
  registerNumberFilter(Vue)
}
