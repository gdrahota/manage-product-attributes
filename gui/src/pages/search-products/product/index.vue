<template>
  <q-card class="q-ma-sm product" flat>
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
                style="height: 80px; max-width: 80px"
              />
            </div>
          </div>
        </div>

        <div class="col-9 q-pa-md">
          <div class="col text-body2 q-pb-md text-underline">
            <router-link :to="getRouteToProduct(product)" class="title">
              {{ `${ product.manufacturer.name } ${ product.name }` }}
            </router-link>
          </div>


          <div class="row">
            <div class="col-6">
              <div class="text-caption">
                <table>
                  <tr>
                    <td class="text-bold text-body1" colspan="2">{{ firstProductGroup.name }}:</td>
                  </tr>
                  <product-attribute
                    v-for="(attr, key) of firstProductGroup.attributes"
                    :key="key"
                    :product-attribute="getProductAttributeById(attr.attrId)"
                    :product-group-attribute="productGroup.attributes.find(({attrId}) => attrId === attr.attrId)"
                    :value-obj="product.attributeValues.find(({ attrId }) => attrId === attr.attrId)"
                  />
                </table>
              </div>
            </div>

            <div class="col-3">
              <div class="number-of-offers">
                {{ product.offers.length }} Angebote
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
import ProductAttribute from './product-attribute'

export default {
  components: {
    BestPrice,
    ProductAttribute,
  },

  computed: {
    ...mapGetters({
      getByProductGroupId: 'productAttributeGroupsOfProductGroups/getByProductGroupId',
      getProductAttributeById: 'productAttributes/getById',
      itemsPerPage: 'productSearch/getItemsPerPage',
      page: 'productSearch/getPage',
    }),
    productAttributeGroupsOfProductGroup() {
      return this.getByProductGroupId(this.productGroup.id)
    },
    firstProductGroup() {
      return this.productAttributeGroupsOfProductGroup.find(( { position } ) => position === 0)
    },
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
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    productGroup: {
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
