<template>
  <div>
    <div class="border-left" style="height: calc(100vh - 200px); overflow-y: auto">
      <div class="q-pl-sm row q-ma-sm">
        <div
          v-for="(product, pos) of products"
          :key="pos"
          class="col-6 q-pb-sm q-pr-sm"
        >
          <product
            :position="pos"
            :product="product"
          />
        </div>
      </div>
    </div>

    <div v-if="products.length > 0 && !searchInProgress" class="row border-top">
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
import { mapGetters } from 'vuex'
import Product from './product'

export default {
  components: {
    Product,
  },

  computed: {
    ...mapGetters({
      products: 'productSearch/getProducts',
      numberOfProducts: 'productSearch/getNumberOfProducts',
      searchInProgress: 'productSearch/isSearchInProgress',
      getPage: 'productSearch/getPage',
      getItemsPerPage: 'productSearch/getItemsPerPage',
    }),
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
}
</script>
