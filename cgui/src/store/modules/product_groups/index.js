import {action} from "@/store/actions";
import {sortByName} from "@/sorters";

//state
const state = {
  items: [],
}

//actions
const loadAll = async ({commit}) => {
  try {
    const items = await action('productGroups.loadAll')
    commit('STORE_ALL_PRODUCT_GROUPS', items)
  } catch (err) {
    console.error('ERROR in store/products/load', err)
  }
}

const actions = {
  loadAll
}

//mutations
const STORE_ALL_PRODUCT_GROUPS = (state, items) => {
  state.items = items
}

const mutations = {
  STORE_ALL_PRODUCT_GROUPS
}


//getters
const getters = {
  getAll: state => [...state.items].sort(sortByName),
  getById: state => id => state.items.find(i => i.id.toString() === id.toString()),
}


export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
