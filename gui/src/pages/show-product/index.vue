<template>
  <q-page-container v-if="product" class="full-height window-height bg-grey-3">
    <q-scroll-area class="fit border-right">
      <div class="preview-page bg-white">
        <div class="q-pa-lg">
          <div class="title text-grey-8">{{ product.manufacturer.name }} {{ product.name }}</div>
        </div>

        <q-list bordered class="rounded-borders">
          <q-expansion-item
            :label="`${product.offers.length} Offers`"
            :value="true"
            expand-separator
            header-class="bg-teal-1"
            icon="list"
          >
            <q-card flat>
              <q-card-section class="offers">
                <div class="row header text-grey-7">
                  <div class="col-4">Anbieter</div>
                  <div class="col-2">Lieferzeit</div>
                  <div class="col-2">Artikelpreis</div>
                  <div class="col-2">Versandkosten</div>
                  <div class="col-2">Gesamtpreis</div>
                </div>

                <div
                  v-for="(offer, key) of product.offers"
                  :key="key"
                  class="row offer text-blue-8"
                >
                  <div class="col-4 text-grey-8">{{ offer.dealer.name }}</div>
                  <div class="col-2 right">1 bis 2 Wochen</div>
                  <div class="col-2 right">{{ offer.itemPrice | number(2) }} €</div>
                  <div class="col-2 right">{{ offer.shippingPrice| number(2) }} €</div>
                  <div class="col-2 right">{{ offer.totalPrice | number(2) }} €</div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            :value="true"
            expand-separator
            header-class="bg-teal-1"
            icon="table"
            label="Product Details"
            style="margin-top: 1px"
          >
            <q-card flat>
              <q-card-section>
                <files :files="product.files" />

                <attributes
                  v-for="productGroup of productGroups"
                  :key="productGroup.id"
                  :product="product"
                  :product-group="productGroup"
                  class="q-mb-md"
                />

                <q-field
                  label="Description"
                  outlined
                  stack-label
                >
                  <template v-slot:control>
                    <div v-html="product.description" />
                  </template>
                </q-field>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-scroll-area>
  </q-page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Attributes from './attributes'
import Files from './files'

export default {
  components: {
    Attributes,
    Files,
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

  methods: {
    ...mapActions({
      loadById: 'showProducts/loadById',
    }),
  },
}
</script>

<style lang="sass" scoped>
.preview-page
  max-width: 1200px
  margin: 0 auto
  border-left: 1px solid #ddd
  border-right: 1px solid #ddd
  padding: 8px

.title
  font-size: 20px
  font-weight: bold

.offers
  .row > div
    border-bottom: 1px dotted #ddd

  .row:first-child
    border-bottom: 2px solid #ccc

  .header > div
    font-size: 18px
    font-weight: bold
    text-align: center
    padding: 8px

  .offer > div
    font-size: 16px
    text-align: left
    padding: 8px

  .offer > .right
    text-align: right

  .offer > div:last-child
    font-weight: bold
</style>
