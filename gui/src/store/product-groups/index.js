import Vue from 'vue'
import { action } from '@/store/actions'

const state = {
  items: [],
}

const loadAll = async ( { commit } ) => {
  try {
    const items = await action('productGroups.loadAll')
    commit('STORE_ALL_ITEMS', items)
  } catch ( err ) {
    console.error('ERROR in store/products/load', err)
  }
}

const save = async ( { commit }, attr ) => {
  try {
    const item = await action('productGroups.save', attr, { id: attr.id })
    commit('UPDATE_ITEM', item)
  } catch ( err ) {
    console.error('ERROR in store/productGroups/save', err)
  }
}

const add = async ( { commit }, attr ) => {
  try {
    const item = await action('productGroups.add', attr)
    commit('UPDATE_ITEM', item)
  } catch ( err ) {
    console.error('ERROR in store/productGroups/add', err)
  }
}

const addProductAttributeValue = async ( { commit }, obj ) => {
  return await action('productAttributeValue.createProductAttributeValue', obj)
}

const actions = {
  loadAll,
  save,
  addProductAttributeValue,
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
