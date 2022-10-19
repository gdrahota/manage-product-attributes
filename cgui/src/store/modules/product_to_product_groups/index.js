import Vue from 'vue'
import {action} from '@/store/actions'

const state = {
  items: [],
}

const loadAll = async ({commit}) => {
  try {
    const items = await action('productToProductGroups.loadAll')
    commit('STORE_ALL_ITEMS', items)
  } catch (err) {
    console.error('ERROR in store/products/load', err)
  }
}

const set = async ({commit}, {id, productGroupIds}) => {
  const item = await action('productToProductGroups.add', {productGroupIds}, {id})
  commit('UPDATE_ITEM', item)
}

const actions = {
  loadAll,
  set,
}

// mutations
const STORE_ALL_ITEMS = (state, items) => {
  state.items = items
}

const UPDATE_ITEM = (state, item) => {
  const pos = state.items.findIndex(i => i.id === item.id)

  if (pos !== -1) {
    Vue.set(state.items, pos, item)
  } else {
    state.items.push(item)
  }
}

const mutations = {
  STORE_ALL_ITEMS,
  UPDATE_ITEM,
}

const getters = {
  getAll: state => state.items,
  getById: state => id => state.items.find(i => i.id.toString() === id.toString()),
  getByProductId: state => productId => state.items.filter(item => productId === item.productId),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
