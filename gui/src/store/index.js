import Vue from 'vue'
import Vuex from 'vuex'

import products from './products'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    products,
  },
  strict: process.env.env !== 'production',
})

export default store

export const getters = store.getters
export const commit = store.commit
export const dispatch = store.dispatch
