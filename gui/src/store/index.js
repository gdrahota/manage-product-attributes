import Vue from 'vue'
import Vuex from 'vuex'

import manufacturers from './manufacturers'
import products from './products'
import productAttributes from './product-attributes'
import productAttributeGroupsOfProductGroups from './product-attribute-groups-of-product-groups'
import productGroups from './product-groups'
import productSearch from './product-search'
import productToProductGroups from './product-to-product-groups'
import dealers from './dealers'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dealers,
    manufacturers,
    products,
    productAttributes,
    productAttributeGroupsOfProductGroups,
    productGroups,
    productSearch,
    productToProductGroups,
  },
  strict: process.env.env !== 'production',
})

export default store

export const getters = store.getters
export const commit = store.commit
export const dispatch = store.dispatch
