import Vue from 'vue'
import { action } from '@/store/actions'
import {isEqual} from "lodash/lang";

const state = {
  request: null,
  result: null,
  page: 1,
  itemsPerPage: 9,
  filters: [],
  previousFilters: [],
  foundProducts: [],
  foundAttributes: [],
  numberOfProducts: 0,
  searchInProgress: false,
  searchString: ''
}

const search = async ( { commit, state }, searchStr ) => {
  commit('SET_SEARCH_IN_PROGRESS', true)

  const params = {
    searchStr: state.searchString,
    page: state.page,
    itemsPerPage: state.itemsPerPage,
  }

  const result = await action('productSearch.search', null, params)

  commit('STORE_SEARCH_RESPONSE', result)
  commit('SET_SEARCH_IN_PROGRESS', false)

}

const setProductGroupId = ( { commit, dispatch }, productGroupId ) => {
  commit('SET_PRODUCT_GROUP_ID', productGroupId)

  if ( productGroupId ) {
    dispatch('filter')
  }
}

const setPage = ( { state, commit, dispatch }, page ) => {
  commit('SET_PAGE', page)

  if ( state.productGroupId ) {
    dispatch('filter')
  }
}

const setSearchString = ({ commit }, searchStr) => {
  commit('SET_SEARCH_STRING', searchStr)
}


const setSearchPage = ( {state, commit, dispatch}, page ) => {
  commit('SET_PAGE', page)
  dispatch('search')
}

const filter = async ( { commit, state } ) => {
  try {
    commit('SET_SEARCH_IN_PROGRESS', true)
    commit('STORE_FILTER_RESPONSE', null)

    const productGroupId = state.productGroupId

    const isNullOrUndefined = ( val ) => {
      return val === undefined || val === null
    }

    const filters = state.filters.map(f => {
      const response = {
        attrId: f.attrId,
        productValueType: f.productValueType,
        searchStrategy: f.searchStrategy,
      }

      const nameMaps = [
        { from: 'valueFrom', to: 'valueIdFrom' },
        { from: 'valueTill', to: 'valueIdTill' },
        { from: 'value', to: 'valueId' },
        { from: 'values', to: 'valueIds' },
      ]

      nameMaps.forEach(nameMap => {
        if ( !isNullOrUndefined(f[ nameMap.from ]?.id) ) {
          response[ nameMap.to ] = f[ nameMap.from ]?.id
        }
      })

      return response
    })

    if ( !isEqual(state.previousFilters, filters) ) {
      commit('SET_PAGE', 1)
    }

    commit('SET_PREVIOUS_FILTERS', filters)

    const payload = {
      filters,
      page: state.page,
      itemsPerPage: state.itemsPerPage,
    }

    const result = await action('productSearch.filter', payload, { productGroupId })

    commit('STORE_FILTER_RESPONSE', result)
    commit('SET_SEARCH_IN_PROGRESS', false)
  } catch
    ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const actions = {
  search,
  filter,
  setProductGroupId,
  setPage,
  setSearchPage,
  setSearchString
}

// mutations
const SET_PRODUCT_GROUP_ID = ( state, id ) => {
  state.productGroupId = id
  state.page = 1
  state.filters = []
  state.itemsPerPage = 9
  state.searchInProgress = false
  state.foundProducts = []
  state.foundAttributes = []
  state.numberOfProducts = 0
}

const SET_SEARCH_STRING = ( state, str ) => {
  state.searchString = str
}

const SET_SEARCH_IN_PROGRESS = ( state, val ) => {
  state.searchInProgress = val
}


const STORE_SEARCH_RESPONSE = ( state, result ) => {
  if( !result ){
    state.foundProducts = []
    state.foundAttributes = []
  } else {
    const { numberOfProducts, products, attributes } = result
    state.foundProducts = products
    state.foundAttributes = attributes
    state.numberOfProducts = numberOfProducts
  }
}

const STORE_FILTER_RESPONSE = (state, response) => {
  if( !response ){
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

const SET_PREVIOUS_FILTERS = ( state, filters ) => {
  state.previousFilters = filters
}

const SET_FILTER = ( state, data ) => {
  const idx = state.filters.findIndex(( { attrId } ) => attrId === data.attrId )

  if( idx === -1 ) {
    state.filters.push(data)
  } else {
    Vue.set(state.filters, idx, data)
  }
}

const mutations = {
  SET_PRODUCT_GROUP_ID,
  STORE_SEARCH_RESPONSE,
  SET_SEARCH_IN_PROGRESS,
  STORE_FILTER_RESPONSE,
  SET_FILTER,
  SET_PREVIOUS_FILTERS,
  SET_PAGE,
  SET_SEARCH_STRING
}

const getters = {
  getProducts: state => state.foundProducts,
  getNoOfProducts: state => state.numberOfProducts,
  getWhole: state => state.result,
  getAttrValuesByAttrId: state => attrId => state.foundAttributes && state.foundAttributes[ attrId ] ? state.foundAttributes[ attrId ] : [],
  getPage: state => state.page,
  getFilters: state => state.filters,
  getItemsPerPage: state => state.itemsPerPage,
  isSearchInProgress: state => state.searchInProgress
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
