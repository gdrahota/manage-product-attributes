<template>
  <q-page-container>
    <q-page>
      <div class="row justify-center q-pa-lg">
        <div class="col-9">
          <div v-if="!product" class="row justify-center items-center full-height">
            <q-spinner-cube
              size="100"
              color="primary"
            />
          </div>
          <div v-else class="container q-mb-lg">
            <div class="text-h5 text-grey-5 text-weight-bold">
              {{ product.manufacturer.name }} {{ product.name }}
            </div>
            <div class="row justify-center">
              <div class="col-3">
                <div>
                  <img
                    class="full-width"
                    src="../../assets/1.jpg"
                    alt="ldhakdhaskjd"
                  />
                </div>
              </div>
              <div class="col-8 q-ml-md">
                <div class="column">
                  <product-groups-and-files
                    :product="product"
                    :product-groups="productGroups"
                  />
                  <div>
                    <div class="row dense items-center">
                      <div class="text-left text-grey-5 text-weight-bold">Description</div>
                      <q-space />
                      <q-card-actions>
                        <q-btn
                          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                          @click="expanded = !expanded"
                          color="grey"
                          round
                          flat
                          unelevated
                          dense
                        />
                      </q-card-actions>
                    </div>

                    <div
                      v-show="!expanded"
                      v-html="product.description"
                      class="text-weight-medium text-caption text-grey-6 ellipsis-2-lines"
                    >
                    </div>

                    <q-slide-transition>
                      <div v-show="expanded">
                        <div class="text-subitle2">
                          <div class="text-weight-medium text-caption text-grey-6 border-left" v-html="product.description"></div>
                        </div>
                      </div>
                    </q-slide-transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div v-if="product">
              <offers :product="product" />
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductGroupsAndFiles from '@/pages/product/product-groups-and-files'
import Offers from './offer'

export default {
  name: 'index',
  components: {
    ProductGroupsAndFiles,
    Offers,
  },
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    ...mapGetters( {
      getProduct: 'showProducts/getById',
      getProductGroupById: 'productGroups/getById',
      isLoadingProduct: 'showProducts/isLoadingProductWithId',
    } ),
    productId() {
      return parseInt( this.$route.params.id )
    },
    product() {
      return this.productId ? this.getProduct( this.productId ) : {}
    },
    productGroups() {
      return this.product
        ? this.product.productGroups.map( ( { id } ) => this.getProductGroupById( id ) )
        : []
    },
  },
  methods: {
    ...mapActions( {
      loadProduct: 'showProducts/loadById',
    } ),
  },
  mounted() {
    this.loadProduct( this.productId )
    console.log( 'the product ==>' )
    console.log( this.product )
  },
}
</script>

<style lang="sass" scoped>
.container
  background-color: white
  border-radius: 6px
  padding: 20px
  box-shadow: 1px 1px 30px 4px #cae9f6
</style>
