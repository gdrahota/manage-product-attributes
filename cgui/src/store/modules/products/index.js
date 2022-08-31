import { action } from '@/store/actions'

//state
const state = {
    items: [],
    searchResults: []
}

//actions
const loadAll = async ( { commit } ) => {
    try {
        const items = await action('products.loadAll')
        commit('STORE_ALL_PRODUCTS', items)
    } catch ( err ) {
        console.error('ERROR in store/products/loadAll', err)
    }
}

const search = async ({ commit }, searchString) => {
    try {
      if(searchString === ''){
        const searchResult = state.items
        commit('STORE_SEARCH_RESULT', searchResult)
      }
      const inputed = searchString.toLowerCase()
      const searchResult = state.items.filter((item) => (item.name.toLowerCase().includes(inputed)))
      commit('STORE_SEARCH_RESULT', searchResult)
    } catch ( err ) {
      console.error('ERROR in store/productSearch', err)
    }
}

const actions = {
    loadAll,
    search
}

//mutations
const STORE_ALL_PRODUCTS = ( state, items ) => {
    state.items = items
}
const STORE_SEARCH_RESULT = ( state, searchResult ) => {
  state.searchResults = searchResult
}


const mutations = {
    STORE_ALL_PRODUCTS,
    STORE_SEARCH_RESULT
}


//getters
const getters = {
    getAll: state => state.items,
    getSearchResult: state => state.searchResults
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
