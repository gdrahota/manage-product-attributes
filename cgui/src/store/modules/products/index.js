import Vue from "vue";
import { action } from '@/store/actions'

//state
const state = {
    items: []
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


const actions = {
    loadAll
}

//mutations
const STORE_ALL_PRODUCTS = ( state, items ) => {
    state.items = items
}


const mutations = {
    STORE_ALL_PRODUCTS
}


//getters
const getters = {
    getAll: state => state.items
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}