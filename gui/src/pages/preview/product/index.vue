<template>
  <q-card class="q-ma-sm product" flat>
    <q-card-section class="q-pa-none">
      <div class="row">
        <div class="col-2">
          <div class="row product-images">
            <div class="col-6">
              <q-img
                class="q-ma-md"
                src="/product-example.jpeg"
                style="height: 80px; max-width: 80px"
              />
            </div>
            <div class="col-6">
              <q-img
                class="q-ma-md"
                src="/product-example-2.jpeg"
                style="height: 80px; max-width: 80px"
              />
            </div>
          </div>
        </div>

        <div v-if="productGroup" class="col-6 q-pa-md">
          <div class="col text-body2 q-pb-md">{{ `${ product.manufacturer.name } ${ product.name }` }}</div>

          <div class="text-caption">
            <table>
              <tr>
                <td class="text-bold" colspan="2">{{ firstProductGroup.name }}:</td>
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

        <div v-if="productGroup" class="col-2 q-pa-md text-right offers">
          {{ Math.round(Math.random() * 20) + 1 }} Angebote
        </div>
        <div v-if="productGroup" class="col-2 q-pa-md text-right price">
          <span class="low">{{ lowestPrice | number(2) }} €</span> - {{ highestPrice | number(2) }} €
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

import ProductAttribute from './product-attribute'

export default {
  components: {
    ProductAttribute,
  },

  computed: {
    ...mapGetters({
      getByProductGroupId: 'productAttributeGroupsOfProductGroups/getByProductGroupId',
      getProductAttributeById: 'productAttributes/getById',
    }),
    productAttributeGroupsOfProductGroup() {
      return this.getByProductGroupId(this.productGroup.id)
    },
    firstProductGroup() {
      return this.productAttributeGroupsOfProductGroup.find(( { position } ) => position === 0)
    },
    lowestPrice() {
      return Math.random() * 36 + 170
    },
    highestPrice() {
      return Math.random() * 74 + this.lowestPrice
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
  },
}
</script>

<style lang="sass">
.product
  .offers
    font-size: 16px
    color: grey

  .price
    font-size: 20px
    color: teal

    .low
      font-weight: bold

</style>
