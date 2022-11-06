<template>
  <q-page-container>
    <q-page>
      <div class="row justify-center q-pa-md">
        <div :class="{'col-9': !($q.screen.xs || $q.screen.sm),'col-12': !($q.screen.md || $q.screen.lg || $q.screen.xl)}">
          <div class="row justify-between full-width q-px-md">
            <div
              v-if="!($q.screen.xs || $q.screen.sm || $q.screen.md)"
              class="col-3"
            >
              <div class="row">
                <div
                  style="height:50px; border-radius: 6px; width: 100%;"
                  class="row"
                >
                  <div
                    v-if="!($q.screen.xs || $q.screen.sm)"
                    class="q-pt-sm q-pl-sm bg-light-blue-10 full-width"
                    style="border-radius: 6px; height: 40px"
                  >
                    <p
                      class="text-bold text-white items-center"
                      style="font-size: 16px"
                    >
                      FILTER CATEGORIES
                    </p>
                  </div>
                </div>
                <search-strategies
                  v-if="!($q.screen.xs || $q.screen.sm)"
                  :productGroupId="selectedProductGroupId"
                  :page="page"
                  @filter="loadFilteredProducts"
                />
              </div>
            </div>
            <div :class="{'col-8': !($q.screen.xs || $q.screen.sm || $q.screen.md) }">
              <div
                v-if="searchInProgress"
                class="row justify-center items-center full-height"
              >
                <q-spinner-cube
                  color="primary"
                  size="100"
                />
              </div>
              <div
                v-else
                class="justify-center"
              >
                <div class="row justify-between q-mb-md">
                  <div>
                    <q-icon
                      v-if="$q.screen.xs || $q.screen.sm"
                      name="filter_alt"
                      color="light-blue-10"
                      size="md"
                    />
                  </div>
                  <div class="row justify-end">
                    <q-btn
                      color="light-blue-10"
                      flat icon="grid_view"
                      round
                      @click="listLayoutType = ListLayoutType.GRID"
                    />
                    <q-btn
                      color="light-blue-10"
                      flat icon="view_list"
                      round
                      @click="listLayoutType = ListLayoutType.LIST"
                    />
                  </div>
                </div>
                <div class="row justify-start">
                  <div
                    v-for="(product) in products"
                    :class="{
                      'col-4 q-pa-sm q-mb-sm': listLayoutType === ListLayoutType.GRID,
                      'col-12 items-center q-my-md': listLayoutType === ListLayoutType.LIST,
                      'col-6 q-pa-sm q-mb-sm': listLayoutType === ListLayoutType.GRID && ($q.screen.sm || $q.screen.xs),
                      'col-12 items-center q-my-md': listLayoutType === ListLayoutType.LIST
                    }"
                    :key="product.id"
                  >
                    <product-card
                      :product="product"
                      :view-style="listLayoutType"
                    />
                  </div>
                </div>
                <div
                  class="p_container bg-white row justify-between items-center col-12 q-mt-lg q-pa-md"
                  style=" width: available"
                >
                  <q-pagination
                    v-if="!searchInProgress"
                    v-model="page"
                    :max="noOfPages"
                    :min="numberOfFirstPage"
                    :max-pages="$q.screen.xs || $q.screen.sm ? 3 : 6"
                    unelevated
                    icon-next="mdi-arrow-right-bold-outline"
                    icon-prev="mdi-arrow-left-bold-outline"
                    active-color="accent"
                    color="accent"
                    direction-links
                  />
                  <div v-if="!($q.screen.xs)">
                    <b>[</b> A Total Of <b>{{ noOfPages }}</b> Pages <b>]</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import SearchStrategies from './search-strategies'
import ProductCard from '@/components/products/product-card'
import { ListLayoutType } from '@/store/enums/list-layout-type'

export default {
  name: 'index',

  components: {
    SearchStrategies,
    ProductCard,
  },

  computed: {
    ...mapGetters( {
      products: 'productSearch/getProducts',
      noOfProducts: 'productSearch/getNoOfProducts',
      response: 'productSearch/getWhole',
      getAllProductGroups: 'productGroups/getAll',
      getPage: 'productSearch/getPage',
      searchInProgress: 'productSearch/isSearchInProgress',
    } ),
    selectedProductGroupId() {
      return parseInt( this.$route.params.id )
    },
    productGroupId() {
      return this.$route.params.id
        ? parseInt( this.$route.params.id )
        : null
    },
    page: {
      get() {
        return this.getPage
      },
      set( page ) {
        if ( page !== this.getPage ) {
          this.setPage( page )
        }
      },
    },
    noOfPages() {
      return Math.ceil( this.noOfProducts / 9 )
    },
    numberOfFirstPage() {
      return 1
    },
    ListLayoutType() {
      return ListLayoutType
    },
  },

  data() {
    return {
      listLayoutType: ListLayoutType.GRID,
    }
  },

  created() {
    if ( this.productGroupId ) {
      this.setProductGroupId( this.productGroupId )
    }
  },

  methods: {
    ...mapActions( {
      searchProducts: 'productSearch/search',
      filterProducts: 'productSearch/filter',
      setProductGroupId: 'productSearch/setProductGroupId',
      setPage: 'productSearch/setPage',
    } ),
    loadFilteredProducts() {
      this.filterProducts( this.productGroupId )
    },
  },

  watch: {
    selectedProductGroupId( newId, oldId ) {
      if ( newId !== oldId ) {
        this.setProductGroupId( newId )
      }
    },
  },

}
</script>

<style scoped lang="sass">
.p_container
  border-radius: 6px
  box-shadow: 1px 1px 30px 4px #cae9f6
</style>
