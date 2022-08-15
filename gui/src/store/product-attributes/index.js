import Vue from 'vue'
import { action } from '@/store/actions'

const state = {
  items: [],
}

const loadAll = async ( { commit } ) => {
  try {
    const items = await action('productAttributes.loadAll')
    commit('STORE_ALL_ITEMS', items)
  } catch ( err ) {
    console.error('ERROR in store/productAttributes/load', err)
  }
}

const getById = async ( { commit }, id ) => {
  try {
    const item = await action('productAttributes.getById', null, { id })
    commit('UPDATE_ITEM', item)
  } catch ( err ) {
    console.error('ERROR in store/productAttributes/getById', err)
  }
}

const save = async ( { commit }, attr ) => {
  try {
    const item = await action('productAttributes.save', attr, { id: attr.id })
    commit('UPDATE_ITEM', item)
  } catch ( err ) {
    console.error('ERROR in store/productAttributes/save', err)
  }
}

const add = async ( { commit }, attr ) => {
  try {
    const item = await action('productAttributes.add', attr)
    commit('UPDATE_ITEM', item)
    return item
  } catch ( err ) {
    console.error('ERROR in store/productAttributes/add', err)
  }
}

const addValue = async ( { commit }, attr ) => {
  try {
    const updatedProductAttribute = await action('productAttributeValues.add', attr)
    commit('UPDATE_ITEM', updatedProductAttribute)
    return updatedProductAttribute
  } catch ( err ) {
    console.error('ERROR in store/productAttributes/addValue', err)
  }
}

const actions = {
  loadAll,
  getById,
  save,
  add,
  addValue,
}

// mutations
const STORE_ALL_ITEMS = ( state, items ) => {
  state.items = items
}

const ADD_VALUE_TO_ATTRIBUTE = ( state, item ) => {
  const pos = state.items.findIndex(i => i.id === item.attrId)
  if ( pos !== -1 ) {
    state.items[ pos ].values.push(item)
  }
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
  ADD_VALUE_TO_ATTRIBUTE,
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
