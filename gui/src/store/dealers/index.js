import { action } from '@/store/actions'
import Vue from 'vue'
import { sortByName } from '@/sorters'

const state = {
  items: [],
}

const loadAll = async ( context ) => {
  try {
    const items = await action('dealers.loadAll')
    context.commit('STORE_ALL_ITEMS', items)
  } catch ( err ) {
    console.error('ERROR in store/dealers/load', err)
  }
}

const add = async ( { commit }, attr ) => {
  try {
    const item = await action('dealers.add', attr)
    commit('UPDATE_ITEM', item)
    return item
  } catch ( err ) {
    console.error('ERROR in store/dealers/add', err)
  }
}

const save = async ( { commit }, changedItem ) => {
  try {
    const item = await action('dealers.save', changedItem)
    commit('UPDATE_ITEM', item)
  } catch ( err ) {
    console.error('ERROR in store/dealers/add', err)
  }
}

const actions = {
  loadAll,
  add,
  save,
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
  getAll: state => [ ...state.items ].sort(sortByName),
  getById: state => id => state.items.find(i => i.id.toString() === id.toString()),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
