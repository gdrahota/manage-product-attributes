import Vue from 'vue'
import Vuex from 'vuex'


import products from './modules/products'
import productGroups from './modules/product_groups'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        products,
        productGroups
    }
})

export default store