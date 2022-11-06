import Vue from 'vue'
import router from '@/router'

export const EventBus = new Vue()

const routeTo = route => {
  router.push(route)
}

const onStart = async () => {
}

EventBus
  .$on('routeTo', routeTo)
  .$on('onStart', onStart)
