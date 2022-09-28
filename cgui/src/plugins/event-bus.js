import Vue from 'vue'
import store from '@/store'
import router from '@/router'

export const EventBus = new Vue()

const routeTo = route => {
  router.push(route)
}

const onStart = async () => {
  await store.dispatch('products/loadAll')
}

EventBus
  .$on('routeTo', routeTo)
  .$on('onStart', onStart)
