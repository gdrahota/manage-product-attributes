import { action } from '@/store/actions'

const state = {
  items: [],
}

const loadAll = async ( context ) => {
  try {
    const items = await action('products.loadAll')
    context.commit('STORE_ALL_ITEMS', items)
  } catch ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const actions = {
  loadAll,
}

// mutations
const STORE_ALL_ITEMS = ( state, items ) => {
  state.items = items
}

const mutations = {
  STORE_ALL_ITEMS,
}

const getters = {
  getAll: state => state.items,
  getById: state => id => state.items.find(i => i.id.toString() === id.toString()),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
