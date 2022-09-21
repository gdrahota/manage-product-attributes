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
  numberOfProducts: 0
}

const search = async ( { commit }, { productGroupId, filters, page, itemsPerPage } ) => {
  try {
    const result = await action('productSearch.search', { filters, page, itemsPerPage }, { productGroupId })
    commit('STORE_SEARCH_RESPONSE', result)
  } catch ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const filter = async ({ commit, state }) => {
  try {
    commit('SET_FILTER_RESPONSE', null)

    const productGroupId = state.productGroupId

    const isNullOrUndefined = ( val ) => {
      return val === undefined || val === null
    }

    const filters = state.filter(f => {
      const response = {
        attrId: f.attrId,
        productType: f.productType,
        searchStrategy: f.searchStrategy
      }

      const nameMaps = [
        { from: 'valueFrom', to: 'valueIdFrom' },
        { from: 'valueTill', to: 'valueIdTill'},
        { from: 'value', to: 'valueId' },
        { from: 'values', to: 'valueIds'}
      ]

      nameMaps.forEach(nameMap => {
        if( !isNullOrUndefined( f[ nameMap.id ]?.id) ){
          response[ nameMap.to ] = f[ nameMap.from ]?.id
        }
      })

      return response
    })

    if( !isEqual(state.previousFilters, filters) ){
      commit('SET_PAGE', 1)
    }

    commit('SET_PREVIOUS_FILTERS', filters)

    const payload = {
      filters,
      page: state.page,
      itemsPerPage: state.itemsPerPage
    }

    const result = await action('productSearch.filter', payload, productGroupId)

    commit('SET_FILTER_RESPONSE', result)
  } catch ( err ) {
    console.error('ERROR in store/products/filter', err)
  }
}

const actions = {
  search,
  filter
}

// mutations
const SET_PRODUCT_GROUP_ID = ( state, id ) => {
  state.productGroupId = id
  state.page = 1
  state.filters = []
  state.itemsPerPage = 9
  state.foundProducts = []
  state.foundAttributes = []
  state.numberOfProducts = 0
}


const STORE_SEARCH_RESPONSE = ( state, result ) => {
  state.result = result
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
  const aId = state.filters.findIndex(( { attrId } ) => attrId === data.attrId )

  if( aId === -1 ) {
    state.filters.push(data)
  } else {
    Vue.set(state.filters, aId, data)
  }
}

const mutations = {
  SET_PRODUCT_GROUP_ID,
  STORE_SEARCH_RESPONSE,
  STORE_FILTER_RESPONSE,
  SET_FILTER,
  SET_PREVIOUS_FILTERS,
  SET_PAGE
}

const getters = {
  getProducts: state => state.result?.products || [],
  getNoOfProducts: state => state.result?.numberOfProducts || 0,
  getWhole: state => state.result,
  getAttrValuesByAttrId: state => attrId => state.foundAttributes && state.foundAttributes[ attrId ] ? state.foundAttributes[ attrId ] : [],
  getPage: state => state.page,
  getFilters: state => state.filters,
  getItemsPerPage: state => state.itemsPerPage

}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
