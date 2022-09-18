<template>
  <q-input
    v-model="value"
    class="q-ma-md"
    outlined
    placeholder="Find solar system components here..."
    style="width: 50%"
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
      if ( this.value ) {
        this.searchProducts(this.value)
      }
    },
  },
}
</script>
