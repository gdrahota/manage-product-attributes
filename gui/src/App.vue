<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    left: false,
  }),

  methods: {
    ...mapActions({
      loadManufacturers: 'manufacturers/loadAll',
      loadProductGroups: 'productGroups/loadAll',
      loadProductToProductGroups: 'productToProductGroups/loadAll',
      loadProductAttributes: 'productAttributes/loadAll',
      loadProductAttributeGroupsOfProductGroups: 'productAttributeGroupsOfProductGroups/loadAll',
      loadDealers: 'dealers/loadAll',
    }),
  },

  mounted() {
    this.loadManufacturers()
    this.loadProductGroups()
    this.loadProductToProductGroups()
    this.loadProductAttributes()
    this.loadProductAttributeGroupsOfProductGroups()
    this.loadDealers()
  },
}
</script>
