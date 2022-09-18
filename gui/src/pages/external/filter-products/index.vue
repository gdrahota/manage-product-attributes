<template>
  <div v-if="productGroup">
    <div class="q-my-xs q-mt-md q-px-lg">
      <filters
        :product-group-id="productGroup.id"
        class=""
        @filter="filter"
      />
    </div>

    <div style="height: calc(100vh - 189px); overflow-y: auto">
      <div class="q-pl-sm row q-ma-sm">
        <div
          v-for="(product, pos) of products"
          :key="pos"
          class="col-6 q-pb-sm q-pl-sm q-pr-md"
        >
          <product
            :position="pos"
            :product="product"
            :product-group="productGroup"
            class=""
          />
        </div>
      </div>
    </div>

    <div class="row border-top">
      <div class="col-3">
        <div class="q-pa-md text-bold text-brown" style="margin-top: 6px">
          {{ numberOfProducts }} Produkte
        </div>
      </div>

      <div class="col-6 flex flex-center q-pt-md">
        <q-pagination
          v-if="!searchInProgress"
          v-model="page"
          :max="lastPage"
          :max-pages="7"
          boundary-links
          class="q-pb-md"
          color="brown"
          direction-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-next="fast_forward"
          icon-prev="fast_rewind"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Filters from './filters'
import Product from './product'

export default {
  components: {
    Filters,
    Product,
  },

  computed: {
    ...mapGetters({
      getProductGroupById: 'productGroups/getById',
      products: 'productSearch/getProducts',
      manufacturers: 'manufacturers/getAll',
      getAllProductGroups: 'productGroups/getAll',
      numberOfProducts: 'productSearch/getNumberOfProducts',
      getPage: 'productSearch/getPage',
      getItemsPerPage: 'productSearch/getItemsPerPage',
      filters: 'productSearch/getFilters',
      searchInProgress: 'productSearch/isSearchInProgress',
    }),
    productGroupId() {
      return this.$route.params.id
        ? parseInt(this.$route.params.id)
        : null
    },
    productGroup() {
      return this.getProductGroupById(this.productGroupId)
    },
    selectedProductGroupId() {
      return parseInt(this.$route.params.id)
    },
    productGroups() {
      return this.getAllProductGroups
    },
    page: {
      get() {
        return this.getPage
      },
      set( page ) {
        if ( this.getPage !== page ) {
          this.setPage(page)
        }
      },
    },
    lastPage() {
      return Math.ceil(this.numberOfProducts / 10)
    },
  },

  created() {
    if ( this.productGroupId ) {
      this.setProductGroupId(this.productGroupId)
    }
  },

  methods: {
    ...mapActions({
      filterProducts: 'productSearch/filter',
      setProductGroupId: 'productSearch/setProductGroupId',
      setPage: 'productSearch/setPage',
    }),
    routeTo( id ) {
      this.$router.push({
        name: 'manage-product',
        params: { id },
      })
    },
    filter() {
      this.filterProducts(this.productGroupId)
    },
  },

  watch: {
    selectedProductGroupId( newId, oldId ) {
      if ( newId !== oldId ) {
        this.setProductGroupId(this.selectedProductGroupId)
      }
    },
  },
}
</script>

<style lang="sass">
#product-filter-page
  .border
    border: 1px solid #ddd
    border-radius: 4px

  .border-top
    border-top: 1px solid #ddd

  .border-right
    border-right: 1px solid #ddd

  .border-left
    border-left: 1px solid #ddd

  .preview-page
    max-width: 1200px
    margin: 0 auto
    border-left: 1px solid #ddd
    border-right: 1px solid #ddd
    padding: 0

  .product-images
    border-right: 1px solid #ddd
    overflow: hidden

  .q-tab__indicator
    height: 5px
</style>
