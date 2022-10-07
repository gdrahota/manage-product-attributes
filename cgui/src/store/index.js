import Vue from 'vue'
import Vuex from 'vuex'


import products from './modules/products'
import productGroups from './modules/product_groups'
import productAttributes from './modules/product_attributes'
import productAttributeGroupsOfProductGroups from './modules/product-attribute-groups-of-product-groups'
import productSearch from './modules/product_search'
import productToProductGroups from './modules/product_to_product_groups'
import showProducts from "@/store/modules/show-products";


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        products,
        productGroups,
        productAttributes,
        productAttributeGroupsOfProductGroups,
        productSearch,
        productToProductGroups,
        showProducts
    }
})

export default store
