import {action} from '@/store/actions'

const state = {
  items: [],
}

const loadAll = async ({commit}) => {
  try {
    const items = await action('productAttributeGroupOfProductGroup.getAll')
    commit('STORE_ALL_ITEMS', items)
  } catch (err) {
    console.error('ERROR in store/productAttributeGroupOfProductGroup/loadAll', err)
  }
}

const save = async ({commit}, {productGroupId, items}) => {
  try {
    const updatedAttributeGroups = await action('productAttributeGroupOfProductGroup.save', {productGroupId, items})
    commit('UPDATE_ITEM', {productGroupId, updatedAttributeGroups})
  } catch (err) {
    console.error('ERROR in store/productAttributeGroupOfProductGroup/save', err)
  }
}

const actions = {
  loadAll,
  save,
}

// mutations
const STORE_ALL_ITEMS = (state, items) => {
  state.items = items
}

const ADD_VALUE_TO_ATTRIBUTE = (state, item) => {
  const pos = state.items.findIndex(i => i.id === item.attrId)
  if (pos !== -1) {
    state.items[pos].values.push(item)
  }
}

const UPDATE_ITEM = (state, {productGroupId, updatedAttributeGroups}) => {
  const items = [...state.items].filter(ag => ag.productGroupId !== productGroupId)

  state.items = [
    ...items,
    ...updatedAttributeGroups,
  ]
}

const mutations = {
  STORE_ALL_ITEMS,
  UPDATE_ITEM,
  ADD_VALUE_TO_ATTRIBUTE,
}

const getters = {
  getAll: state => state.items,
  getById: state => id => state.items.find(i => i.id.toString() === id.toString()),
  getByProductGroupId: state => id => state.items.filter(i => i.productGroupId.toString() === id.toString()),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
