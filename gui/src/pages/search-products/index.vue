<template>
  <q-page-container id="product-filter-page" class="full-height window-height bg-grey-3">
    <is-loading-overlay :is-search-in-progress="isSearchInProgress" />

    <q-scroll-area class="fit border-right">
      <div class="preview-page bg-white" style="min-height: calc(100vh - 100px); overflow-y: hidden">
        <q-tabs
          align="left"
          class="bg-brown-2 shadow-4"
          indicator-color="orange"
        >
          <q-route-tab
            v-for="(productGroup, pos) of productGroups"
            :key="pos"
            :label="productGroup.name"
            :to="{ params: { id: productGroup.id } }"
          />
        </q-tabs>

        <q-separator />

        <div class="row">
          <div class="col-5">
            <filters
              :product-group-id="selectedProductGroupId"
              class="q-my-md q-px-sm"
              style="height: calc(100vh - 192px); overflow-y: auto"
            />

            <div class="text-center bg-brown-2 border-top" style="height: 64px">
              <q-btn
                :color="filters.length === 0 ? 'grey' : 'brown'"
                :disable="filters.length === 0"
                label="Apply Filter"
                style="margin-top: 13px"
                @click="search"
              />
            </div>
          </div>

          <div class="col-7 border-left">
            <div class="q-my-md q-pl-sm" style="height: calc(100vh - 192px); overflow-y: auto">
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

            <div class="row bg-brown-2 border-top">
              <div class="col-3">
                <div class="q-pa-md text-bold text-brown" style="margin-top: 6px">
                  {{ numberOfProducts }} Produkte
                </div>
              </div>

              <div class="col-9">
                <div class="flex flex-center q-pt-md">
                  <q-pagination
                    v-if="!isSearchInProgress"
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
