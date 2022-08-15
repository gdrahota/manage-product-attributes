import { action } from '@/store/actions'

const state = {
  searchInProgress: false,
  request: null,
  result: null,
}

const search = async ( { commit }, { productGroupId, filters, page, itemsPerPage } ) => {
  try {
    commit('SET_SEARCH_IN_PROGRESS', true)
    commit('STORE_SEARCH_RESPONSE', null)
    const result = await action('productSearch.search', { filters, page, itemsPerPage }, { productGroupId })
    commit('STORE_SEARCH_RESPONSE', result)
    commit('SET_SEARCH_IN_PROGRESS', false)
  } catch ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const actions = {
  search,
}

// mutations
const SET_SEARCH_IN_PROGRESS = ( state, val ) => {
  state.searchInProgress = val
}

const STORE_SEARCH_RESPONSE = ( state, result ) => {
  state.result = result
}

const mutations = {
  SET_SEARCH_IN_PROGRESS,
  STORE_SEARCH_RESPONSE,
}

const getters = {
  getProducts: state => state.result?.products,
  getAttrValuesByAttrId: state => attrId => state.result?.attributes[ attrId ] || [],
  isSearchInProgress: state => state.searchInProgress,
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
