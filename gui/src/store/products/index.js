import Vue from 'vue'
import { action } from '@/store/actions'
import { sortByName } from '@/sorters'

const state = {
  items: [],
}

const loadAll = async ( { commit } ) => {
  try {
    const items = await action('products.loadAll')
    commit('STORE_ALL_ITEMS', items)
  } catch ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const save = async ( { commit }, changedItem ) => {
  const { id } = changedItem
  const item = await action('products.saveChanges', changedItem, { id })
  commit('UPDATE_ITEM', item)
}

const add = async ( { commit }, { product, productGroupId } ) => {
  const item = await action('products.add', { product, productGroupId })
  commit('UPDATE_ITEM', item)
  return item.id
}

const actions = {
  loadAll,
  save,
  add,
}

// mutations
const STORE_ALL_ITEMS = ( state, items ) => {
  state.items = items
}

const UPDATE_ITEM = ( state, item ) => {
  const pos = state.items.findIndex(i => i.id === item.id)

  if ( pos !== -1 ) {
    const items = state.items
    Vue.set(items, pos, item)
    state.items = [ ...items ]
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
  getByProductGroupId: state =>
    productGroupId =>
      [ ...state.items.filter(i => i.productGroups.some(( { id } ) => id === productGroupId)) ].sort(sortByName),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
