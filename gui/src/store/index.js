import Vue from 'vue'
import Vuex from 'vuex'

import manufacturers from './manufacturers'
import products from './products'
import productAttributes from './product-attributes'
import productGroups from './product-groups'
import productToProductGroups from './product-to-product-groups'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    manufacturers,
    products,
    productAttributes,
    productGroups,
    productToProductGroups,
  },
  strict: process.env.env !== 'production',
})

export default store

export const getters = store.getters
export const commit = store.commit
export const dispatch = store.dispatch
