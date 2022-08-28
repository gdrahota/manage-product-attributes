import Vue from 'vue'
import { action } from '@/store/actions'

const state = {
  items: [],
  isLoadingProductWithId: null,
}

const loadById = async ( { commit }, id ) => {
  try {
    commit('SET_LOADING_PRODUCT_WITH_ID', id)
    const item = await action('show-products.loadById', null, { id })
    commit('STORE_ITEM', item)
    commit('SET_LOADING_PRODUCT_WITH_ID', null)
  } catch ( err ) {
    console.error('ERROR in store/show-products/loadById', err)
  }
}

const actions = {
  loadById,
}

// mutations
const SET_LOADING_PRODUCT_WITH_ID = ( state, id ) => {
  state.isLoadingProductWithId = id
}

const STORE_ITEM = ( state, item ) => {
  Vue.set(state.items, item.id, item)
}

const mutations = {
  SET_LOADING_PRODUCT_WITH_ID,
  STORE_ITEM,
}

const getters = {
  getById: state => id => state.items[ id ],
  isLoadingProductWithId: state => id => state.isLoadingProductWithId,
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
