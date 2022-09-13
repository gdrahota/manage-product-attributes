import { action } from '@/store/actions'

const state = {
  request: null,
  result: null,
}

const search = async ( { commit }, { productGroupId, filters, page, itemsPerPage } ) => {
  try {
    const result = await action('productSearch.search', { filters, page, itemsPerPage }, { productGroupId })
    commit('STORE_SEARCH_RESPONSE', result)
  } catch ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const actions = {
  search,
}

// mutations
const STORE_SEARCH_RESPONSE = ( state, result ) => {
  state.result = result
}

const mutations = {
  STORE_SEARCH_RESPONSE,
}

const getters = {
  getProducts: state => state.result?.products || [],
  getNoOfProducts: state => state.result?.numberOfProducts || 0,
  getWhole: state => state.result,
  getAttrValuesByAttrId: state => attrId => state.result?.attributes[ attrId ] || [],
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
