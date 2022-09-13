<template>
  <q-input
    v-model="value"
    class="q-ma-md"
    outlined
    placeholder="Find solar system components here..."
    rounded
    @keypress.enter="search"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({ value: null }),

  methods: {
    ...mapActions({
      searchProducts: 'productSearch/search',
    }),
    search() {
      console.log('enter', this.value)
      if ( this.value ) {
        this.searchProducts(this.value)
      }
    },
  },
}
</script>
