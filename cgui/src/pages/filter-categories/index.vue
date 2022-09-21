<template>
  <q-page-container>
    <q-page class="">
      <div class="row justify-center q-pa-md">
        <div class="col-10">
          <div class="row justify-between">
            <div v-if="!($q.screen.sm || $q.screen.md)" class="col-3">
              <div class="row">
                <q-card
                  class="shadow-box shadow-2 bg-accent q-mb-lg q-pa-sm flex"
                  style="height:50px; border-radius: 6px; width: 100%;">
                  <p class="text-h6 text-weight-bold text-white">Filter Categories</p>
                </q-card>
                <filters
                  :product-group-id="selectedProductGroupId"
                  @searchProducts="search"
                  :page="page"
                />
              </div>
            </div>
            <div :class="{'col-8': !($q.screen.sm || $q.screen.md) }">
              <div class="">
                <div class="row q-col-gutter-md justify-start">
                  <div v-for="(product, index) in products" class="col-4 " :key="index">
                    <product-card :product="product"></product-card>
                  </div>
                </div>
                <div
                  class="p_container bg-white row justify-between items-center col-12 q-mt-lg q-pa-md"
                  style=" width: available"
                >
                  <q-pagination
                    :max="noOfPages"
                    :max-pages="6"
                    unelevated
                    :min="min"
                    icon-next="mdi-arrow-right-bold-outline"
                    icon-prev="mdi-arrow-left-bold-outline"
                    v-model="currentPage"
                    active-color="accent"
                    color="accent"
                    direction-links
                  />
                  <div><b>[</b> A Total Of <b>{{ noOfPages }}</b> Pages <b>]</b></div>
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
import Filters from './_components/filters/index.vue'
import ProductCard from '@/components/products/product-card.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'index',
  components: {
    Filters,
    ProductCard
  },
  data() {
    return {
      min: 1,
      currentPage: 1,
      page: 1
    }
  },

  computed: {
    ...mapGetters({
      products: 'productSearch/getProducts',
      noOfProducts: 'productSearch/getNoOfProducts',
      response: 'productSearch/getWhole',
      getAllProductGroups: 'productGroups/getAll',
    }),
    selectedProductGroupId() {
      return parseInt(this.$route.params.id)
    },
    noOfPages(){
      return Math.ceil(this.noOfProducts / 9)
    }
  },

  methods: {
    ...mapActions({
      searchProducts: 'productSearch/search',
    }),
    search({productGroupId, filters}) {
      this.searchProducts({productGroupId, filters, page: this.currentPage, itemsPerPage: 9})
    }
  },

  mounted() {

  },

  created() {
    this.search({productGroupId: this.selectedProductGroupId, filters: []})
  },

  watch: {
    selectedProductGroupId() {
      this.search({
        productGroupId: this.selectedProductGroupId,
        filters: [],
      })
    },
    currentPage(newVal){
      this.page = newVal
    }

  },

}
</script>

<style scoped lang="sass">
  .p_container
    border-radius: 6px
    box-shadow: 1px 1px 30px 4px #cae9f6

</style>
