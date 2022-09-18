<template>
  <q-card
    class="product bg-grey-2"
    flat
    style="height: 150px"
    @click="routeTo(getRouteToProduct(product))"
  >
    <q-card-section class="q-pa-none">
      <div v-if="product" class="row">
        <div class="col-1 flex flex-center">
          <div class="position">{{ (position + 1) + (page - 1) * itemsPerPage }}</div>
        </div>

        <div class="col-2">
          <div class="row product-images">
            <div
              v-for="file of files"
              :key="file.id"
              class="col-6"
            >
              <q-img
                :src="file.link"
                class="q-ma-md"
                style="height: 60px; max-width: 60px"
              />
            </div>
          </div>
        </div>

        <div class="col-9 q-pa-xs">
          <div class="col text-body1 text-bold text-grey-7">
            <div class="title">{{ `${ product.manufacturer.name } ${ product.name }` }}</div>
          </div>

          <div class="row">
            <div class="col-6" />
            <div class="col-3">
              <div class="number-of-offers">
                <template v-if="product.offers.length === 1">{{ product.offers.length }} Offer</template>
                <template v-else>{{ product.offers.length }} Offers</template>
              </div>
            </div>

            <div class="col-3">
              <best-price :dealer="product.bestPriceDealer" :price="product.bestPrice" />
            </div>
          </div>

        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

import BestPrice from './best-price'

export default {
  components: {
    BestPrice,
  },

  computed: {
    ...mapGetters({
      itemsPerPage: 'productSearch/getItemsPerPage',
      page: 'productSearch/getPage',
    }),
    files() {
      const pictures = this.product.files.filter(( file ) => [ 'image/jpeg', 'image/png', 'image/webp' ].includes(file.mimeType))

      if ( pictures.length > 1 ) {
        return [ pictures[ 0 ], pictures[ 1 ] ]
      }

      if ( pictures.length > 0 ) {
        return [ pictures[ 0 ] ]
      }

      return []
    },
  },

  methods: {
    getRouteToProduct( product ) {
      return {
        name: 'show-product',
        params: {
          id: product.id,
        },
      }
    },
    routeTo( route ) {
      this.$router.push(route)
    },
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="sass">
.product
  cursor: pointer

  .title
    font-size: 16px

  .number-of-offers
    font-size: 14px
    margin-top: 7px

  .position
    font-size: 30px
    color: #888
    border: 0
    height: 80px
    width: 80px
    padding-top: 18px
    text-align: center
    vertical-align: center

  .offers
    font-size: 16px
    color: grey

  .price
    font-size: 20px
    color: teal
    font-weight: bold
</style>
