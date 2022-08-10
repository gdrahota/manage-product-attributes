import { action } from '@/store/actions'
import Vue from 'vue'

const state = {
  items: [],
}

const loadAll = async ( context ) => {
  try {
    const items = await action('manufacturers.loadAll')
    context.commit('STORE_ALL_ITEMS', items)
  } catch ( err ) {
    console.error('ERROR in store/manufacturers/load', err)
  }
}

const add = async ( { commit }, attr ) => {
  try {
    const item = await action('manufacturers.add', attr)
    commit('UPDATE_ITEM', item)
  } catch ( err ) {
    console.error('ERROR in store/manufacturers/add', err)
  }
}

const actions = {
  loadAll,
  add,
}

// mutations
const STORE_ALL_ITEMS = ( state, items ) => {
  state.items = items
}

const UPDATE_ITEM = ( state, item ) => {
  const pos = state.items.findIndex(i => i.id === item.id)

  if ( pos !== -1 ) {
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
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
