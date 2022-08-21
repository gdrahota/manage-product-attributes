<template>
  <q-page-container class="full-height window-height bg-grey-3">
    <is-loading-overlay :is-search-in-progress="isSearchInProgress" />

    <q-scroll-area class="fit border-right">
      <div class="preview-page bg-white" style="height: calc(100vh - 100px); min-height: calc(100vh - 100px); overflow-y: hidden">
        <q-tabs align="left">
          <q-route-tab
            v-for="(productGroup, pos) of productGroups"
            :key="pos"
            :label="productGroup.name"
            :to="{ params: { id: productGroup.id } }"
          />
        </q-tabs>

        <q-separator />

        <div
          class="preview-page bg-white border"
          style="height: calc(100vh - 248px); min-height: calc(100vh - 210px); overflow-y: auto"
        >
          <q-expansion-item
            v-if="selectedProductGroupId"
            :label="filterLabel"
            caption-="Select products based on their properties"
            class="q-ma-sm shadow-2 bg-blue-2 q-mt-md"
            icon="mdi-filter-outline"
          >
            <q-card class="bg-teal-1">
              <q-card-section>
                <filters
                  :product-group-id="selectedProductGroupId"
                  @searchProducts="search"
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
                :position="pos"
                :product="product"
                :product-group="selectedProductGroup"
              />
              <q-separator />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <div class="q-pa-md text-bold text-grey-6" style="margin-top: 6px">
              {{ numberOfProducts }} Produkte
            </div>
          </div>
          <div class="col-4">
            <div class="flex flex-center q-pt-md">
              <q-pagination
                v-if="!isSearchInProgress"
                v-model="page"
                :max="lastPage"
                boundary-links
                class="q-pb-md"
                color="teal"
                direction-links
                icon-first="skip_previous"
                icon-last="skip_next"
                icon-next="fast_forward"
                icon-prev="fast_rewind"
              />
            </div>
            <div class="col-4"></div>
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
      numberOfProducts: 'productSearch/getNumberOfProducts',
      getPage: 'productSearch/getPage',
      getItemsPerPage: 'productSearch/getItemsPerPage',
      filters: 'productSearch/getFilters',
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
        ? `Filter ${ this.$root.$options.filters.number(this.numberOfProducts) } products...`
        : `Filter products...`
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
    if ( this.selectedProductGroupId ) {
      this.setProductGroupId(this.selectedProductGroupId)
    }
  },

  methods: {
    ...mapActions({
      searchProducts: 'productSearch/search',
      setProductGroupId: 'productSearch/setProductGroupId',
      setPage: 'productSearch/setPage',
    }),
    isSelected( product ) {
      return this.$route.params.id && product
        ? parseInt(product.id) === this.selectedProductGroupId
        : false
    },
    routeTo( id ) {
      this.$router.push({
        name: 'manage-product',
        params: { id },
      })
    },
    search() {
      this.searchProducts()
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
