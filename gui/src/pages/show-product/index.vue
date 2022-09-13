<template>
  <q-page-container v-if="product" id="JGHRGHVT" class="full-height window-height bg-grey-4">
    <q-scroll-area class="fit border-right q-my-md">
      <div class="preview-page bg-white">
        <div class="q-pa-lg">
          <div class="row">
            <div class="col-8">
              <div class="title text-grey-8">{{ product.manufacturer.name }} {{ product.name }}</div>
            </div>

            <div class="col-4 text-right">
              <q-chip
                v-for="pg of productGroups"
                :key="pg.id"
                color="brown-2"
                square
              >
                {{ pg.name }}
              </q-chip>
            </div>
          </div>
        </div>

        <q-tabs
          v-model="tab"
          :breakpoint="0"
          active-class="text-white"
          align="left"
          class="bg-brown-6 text-grey-5 q-ma-none"
          indicator-color="brown-3"
          no-caps
        >
          <q-tab :label="`${product.offers.length} Offers`" name="offers" />
          <q-tab label="Product Details" name="details" />
        </q-tabs>

        <div style="height: calc(100vH - 255px); overflow-y: auto">
          <q-tab-panels
            v-model="tab"
            animated
            transition-next="slide-up"
            transition-prev="slide-down"
          >
            <q-tab-panel name="offers">
              <offers :product="product" />
            </q-tab-panel>

            <q-tab-panel name="details">
              <product-details :product="product" :product-groups="productGroups" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-scroll-area>
  </q-page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Offers from './offers'
import ProductDetails from './details'

export default {
  components: {
    Offers,
    ProductDetails,
  },

  computed: {
    ...mapGetters({
      getById: 'showProducts/getById',
      getProductGroupById: 'productGroups/getById',
    }),
    productId() {
      return parseInt(this.$route.params.id)
    },
    product() {
      return this.productId
        ? this.getById(this.productId)
        : null
    },
    productGroups() {
      return this.product
        ? this.product.productGroups.map(( { id } ) => this.getProductGroupById(id))
        : []
    },
  },

  created() {
    this.loadById(this.productId)
  },

  data: () => ({
    tab: 'offers',
  }),

  methods: {
    ...mapActions({
      loadById: 'showProducts/loadById',
    }),
  },
}
</script>

<style lang="sass">
#JGHRGHVT
  .preview-page
    max-width: 1200px
    margin: 0 auto
    border-left: 1px solid #ddd
    border-right: 1px solid #ddd

  .title
    font-size: 20px
    font-weight: bold

  .q-tab__indicator
    height: 5px
</style>
