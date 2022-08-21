<template>
  <q-page-container class="full-height window-height bg-grey-3">
    <is-loading-overlay :is-search-in-progress="isSearchInProgress" />

    <q-scroll-area class="fit border-right">
      <div class="preview-page bg-white" style="height: calc(100%); min-height: calc(100vh - 100px)">
        <q-tabs align="left">
          <q-route-tab
            v-for="(productGroup, pos) of productGroups"
            :key="pos"
            :label="productGroup.name"
            :to="{ params: { id: productGroup.id } }"
          />
        </q-tabs>

        <q-separator />

        <q-expansion-item
          v-if="selectedProductGroupId"
          :label="filterLabel"
          caption-="Select products based on their properties"
          class="q-mt-md border shadow-2 bg-teal-2 q-ma-md"
          icon="mdi-filter-outline"
        >
          <q-card class="bg-teal-1">
            <q-card-section>
              <filters
                :product-group-id="selectedProductGroupId"
                @searchProducts="searchProducts"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <div class="full-width q-pb-lg q-px-sm">
          <div
            v-for="(product, pos) of products"
            :key="pos"
          >
            <product
              :product="product"
              :product-group="selectedProductGroup"
            />
            <q-separator />
          </div>
        </div>
      </div>
    </q-scroll-area>
  </q-page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Filters from './filters'
import IsLoadingOverlay from './is-loading'
import Product from './product'

export default {
  components: {
    Filters,
    IsLoadingOverlay,
    Product,
  },

  computed: {
    ...mapGetters({
      products: 'productSearch/getProducts',
      manufacturers: 'manufacturers/getAll',
      getAllProductGroups: 'productGroups/getAll',
      isSearchInProgress: 'productSearch/isSearchInProgress',
    }),
    selectedProductGroupId() {
      return parseInt(this.$route.params.id)
    },
    productGroups() {
      return this.getAllProductGroups
    },
    selectedProductGroup() {
      return this.productGroups.find(( { id } ) => id === this.selectedProductGroupId)
    },
    filterLabel() {
      return this.products
        ? `Filter ${ this.products.length } products...`
        : `Filter products...`
    },
  },

  created() {
    if ( this.selectedProductGroupId ) {
      this.search({ productGroupId: this.selectedProductGroupId, filters: [] })
    }
  },

  methods: {
    ...mapActions({
      searchProducts: 'productSearch/search',
    }),
    isSelected( product ) {
      return this.$route.params.id && product
        ? parseInt(product.id) === parseInt(this.$route.params.id)
        : false
    },
    routeTo( id ) {
      this.$router.push({
        name: 'manage-product',
        params: { id },
      })
    },
    search( { productGroupId, filters } ) {
      this.searchProducts({ productGroupId, filters, page: 1, itemsPerPage: 10 })
    },
  },

  watch: {
    selectedProductGroupId() {
      this.search({
        productGroupId: this.selectedProductGroupId,
        filters: [],
      })
    },
  },
}
</script>

<style lang="sass" scoped>
.border
  border: 1px solid #ddd
  border-radius: 4px

.border-right
  border-right: 1px solid #ddd

.preview-page
  max-width: 1600px
  margin: 0 auto
  border-left: 1px solid #ddd
  border-right: 1px solid #ddd
  padding: 0 8px

.product-images
  border-right: 1px solid #ddd
  overflow: hidden
</style>
