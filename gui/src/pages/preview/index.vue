<template>
  <q-page-container class="full-height window-height bg-grey-3">
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
          caption-="Select products based on their properties"
          class="q-mt-md border shadow-2 bg-teal-2 q-ma-md"
          icon="mdi-filter-outline"
          label="Filter products..."
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

        <div class="row full-width q-pb-lg q-px-sm">
          <div
            v-for="(product, pos) of products"
            :key="pos"
            class="col-6"
          >
            <q-card class="q-ma-sm">
              <q-card-section class="q-pa-none">
                <div class="row">
                  <div class="col-4">
                    <div class="row product-images">
                      <div class="col-6">
                        <q-img
                          class="q-ma-md"
                          src="http://localhost:8082/product-example.jpeg"
                          style="height: 80px; max-width: 80px"
                        />
                      </div>
                      <div class="col-6">
                        <q-img
                          class="q-ma-md"
                          src="http://localhost:8082/product-example-2.jpeg"
                          style="height: 80px; max-width: 80px"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-8 q-pa-md">
                    <div class="col text-body2 q-pb-md">{{ `${ product.manufacturer.name } ${ product.name }` }}</div>
                    <div class="text-caption">
                      Viel Text
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </q-page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Filters from './filters'

export default {
  components: {
    Filters,
  },

  computed: {
    ...mapGetters({
      products: 'productSearch/getProducts',
      manufacturers: 'manufacturers/getAll',
      getAllProductGroups: 'productGroups/getAll',
    }),
    selectedProductGroupId() {
      return parseInt(this.$route.params.id)
    },
    productGroups() {
      return this.getAllProductGroups
    },
  },

  created() {
    this.search({ productGroupId: this.selectedProductGroupId, filters: [] })
  },

  data: () => ({
    productGroup: null,
  }),

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
