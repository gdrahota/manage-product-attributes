import {action} from '@/store/actions'

const state = {
  items: [],
}

const loadAll = async ({commit}) => {
  try {
    const items = await action('productAttributes.loadAll')
    commit('STORE_ALL_ITEMS', items)
  } catch (err) {
    console.error('ERROR in store/productAttributes/load', err)
  }
}

const getById = async ({commit}, id) => {
  try {
    const item = await action('productAttributes.getById', null, {id})
    commit('UPDATE_ITEM', item)
  } catch (err) {
    console.error('ERROR in store/productAttributes/getById', err)
  }
}

const actions = {
  loadAll,
  getById,
}

// mutations
const STORE_ALL_ITEMS = (state, items) => {
  state.items = items
}


const mutations = {
  STORE_ALL_ITEMS,
}

const getters = {
  getAll: state => state.items,
  getById: state => id => state.items.find(i => i.id === id),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
