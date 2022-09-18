<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container id="product-filter-page" class="full-height window-height">
      <is-loading-overlay :is-search-in-progress="isLoading" />

      <q-scroll-area class="fit border-right">
        <q-splitter
          v-model="splitterWidth"
          style="height: calc(100vh - 49px)"
          unit="px"
        >
          <template v-slot:before>
            <product-groups :width-in-px="splitterWidth" class="q-pt-sm" />
          </template>

          <template v-slot:separator>
            <q-avatar color="grey-5" icon="drag_indicator" size="30px" text-color="grey-1" />
          </template>

          <template v-slot:after>
            <router-view />
          </template>
        </q-splitter>
      </q-scroll-area>
    </q-page-container>

    <app-footer />
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import AppFooter from './footer'
import IsLoadingOverlay from './is-loading'
import ProductGroups from './product-groups'

export default {
  components: {
    AppFooter,
    IsLoadingOverlay,
    ProductGroups,
  },

  computed: {
    ...mapGetters({
      isSearchInProgress: 'productSearch/isSearchInProgress',
    }),
    isLoading() {
      return this.isSearchInProgress
    },
  },

  data: () => ({
    splitterWidth: 300,
  }),
}
</script>
