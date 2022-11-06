import Vue from 'vue'
import { action } from '@/store/actions'
import { sortByName } from '@/sorters'

const state = {
  items: [],
  numberOfItems: 0,
  isWaitingForResponse: false,
}

const loadPage = async ( { commit }, { productGroupId, page, itemsPerPage } ) => {
  try {
    const items = await action( 'products.loadPage', null, { productGroupId, page, itemsPerPage } )
    commit( 'STORE_PAGE', items )
  } catch ( err ) {
    console.error( 'ERROR in store/products/loadPage', err )
  }
}

const save = async ( { commit }, changedItem ) => {
  const { id } = changedItem
  commit( 'IS_WAITING_FOR_RESPONSE' )
  const item = await action( 'products.saveChanges', changedItem, { id } )
  commit( 'UPDATE_ITEM', item )
  commit( 'STOP_WAITING_FOR_RESPONSE' )
}

const add = async ( { commit }, { product, productGroupId } ) => {
  commit( 'IS_WAITING_FOR_RESPONSE' )
  const item = await action( 'products.add', { product, productGroupId } )
  commit( 'UPDATE_ITEM', item )
  commit( 'STOP_WAITING_FOR_RESPONSE' )
  return item.id
}

const actions = {
  loadPage,
  save,
  add,
}

// mutations
const STORE_PAGE = ( state, { items, numberOfItems } ) => {
  state.items = items
  state.numberOfItems = numberOfItems
}

const UPDATE_ITEM = ( state, item ) => {
  const pos = state.items.findIndex( i => i.id === item.id )

  if ( pos !== -1 ) {
    const items = state.items
    Vue.set( items, pos, item )
    state.items = [ ...items ]
  } else {
    state.items.push( item )
  }
}

const IS_WAITING_FOR_RESPONSE = state => {
  state.isWaitingForResponse = true
}

const STOP_WAITING_FOR_RESPONSE = state => {
  state.isWaitingForResponse = false
}

const mutations = {
  STORE_PAGE,
  UPDATE_ITEM,
  IS_WAITING_FOR_RESPONSE,
  STOP_WAITING_FOR_RESPONSE,
}

const getters = {
  getPage: state => [ ...state.items ].sort( sortByName ),
  getNumberOfItems: state => state.numberOfItems,
  getById: state => id => state.items.find( i => i.id.toString() === id.toString() ),
  getByProductGroupId: state =>
    productGroupId =>
      [ ...state.items.filter( i => i.productGroups.some( ( { id } ) => id === productGroupId ) ) ].sort( sortByName ),
  isWaitingForResponse: state => state.isWaitingForResponse,
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
