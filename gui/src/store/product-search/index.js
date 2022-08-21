import { action } from '@/store/actions'

const state = {
  searchInProgress: false,
  productGroupId: null,
  page: 1,
  itemsPerPage: 10,
  filters: [],
  foundProducts: [],
  foundAttributes: [],
  numberOfProducts: 0,
}

const search = async ( { commit, state } ) => {
  try {
    commit('SET_SEARCH_IN_PROGRESS', true)
    commit('STORE_SEARCH_RESPONSE', null)

    const productGroupId = state.productGroupId

    const payload = {
      filters: state.filters,
      page: state.page,
      itemsPerPage: state.itemsPerPage,
    }

    const result = await action('productSearch.search', payload, { productGroupId })

    commit('STORE_SEARCH_RESPONSE', result)
    commit('SET_SEARCH_IN_PROGRESS', false)
  } catch ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const setProductGroupId = ( { commit, dispatch }, productGroupId ) => {
  commit('SET_PRODUCT_GROUP_ID', productGroupId)

  if ( productGroupId ) {
    dispatch('search')
  }
}

const setPage = ( { commit, dispatch }, page ) => {
  commit('SET_PAGE', page)

  if ( state.productGroupId ) {
    dispatch('search')
  }
}

const actions = {
  search,
  setProductGroupId,
  setPage,
}

// mutations
const SET_PRODUCT_GROUP_ID = ( state, id ) => {
  state.productGroupId = id

  state.page = 1
  state.filters = []
  state.searchInProgress = false
  state.itemsPerPage = 10
  state.foundProducts = []
  state.foundAttributes = []
  state.numberOfProducts = 0
}

const SET_SEARCH_IN_PROGRESS = ( state, val ) => {
  state.searchInProgress = val
}

const STORE_SEARCH_RESPONSE = ( state, response ) => {
  if ( !response ) {
    state.foundProducts = []
    state.foundAttributes = []
  } else {
    const { numberOfProducts, products, attributes } = response
    state.foundProducts = products
    state.foundAttributes = attributes
    state.numberOfProducts = numberOfProducts
  }
}

const SET_PAGE = ( state, page ) => {
  state.page = page
}

const SET_FILTER = ( state, filters ) => {
  state.filters = filters
}

const mutations = {
  SET_PRODUCT_GROUP_ID,
  SET_SEARCH_IN_PROGRESS,
  STORE_SEARCH_RESPONSE,
  SET_PAGE,
  SET_FILTER,
}

const getters = {
  getProducts: state => state.foundProducts,
  getAttrValuesByAttrId: state => attrId => state.foundAttributes && state.foundAttributes[ attrId ]
    ? state.foundAttributes[ attrId ]
    : [],
  isSearchInProgress: state => state.searchInProgress,
  getNumberOfProducts: state => state.numberOfProducts,
  getFilters: state => state.filters,
  getPage: state => state.page,
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
