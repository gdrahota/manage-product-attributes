<template>
  <q-page-container>
    <q-page>
      <div
        class="row justify-center"
        style="padding-top: 20px; padding-bottom: 50px"
      >
        <div class="col-9">
          <div class="row justify-between">
            <div class="col-lg-3 col-md-3 col-12">
              <div
                class="col-6 search-column q-mx-sm bg-white"
              >
                <q-input
                  placeholder="Search here ..."
                  borderless
                  dense
                  @input="updateSearchQuery"
                  @keydown.enter="filterProducts"
                  :input-style="{padding: '10px', color: `#104a61`, fontWeight: 'bold'}"
                  v-model="searchText"
                  :value="searchText"
                  autofocus
                >
                  <template v-slot:append>
                    <q-icon name="mdi-magnify"/>
                  </template>
                </q-input>
              </div>
              <div class="q-mx-sm">
                <div
                  class="text-white q-pa-md q-mt-lg bg-light-blue-10 text-weight-bold"
                  style="border-radius: 6px"
                >
                  PRODUCT CATEGORIES
                </div>
                <div
                  v-for="(category, key) in categories"
                  :key="key"
                  class="q-mt-sm"
                >
                  <product-category :category="category" />
                </div>
              </div>
            </div>
            <div
              class="col-12 col-xl-8 col-lg-8 col-md-8 q-mt-lg"
            >
              <div
                v-if="searchResult.length !== 0"
                class="top_container row q-ml-sm q-mt-sm text-h5 text-weight-bold text-accent"
              >
                Found {{ getNoOfProducts }} Products
                <div style="display: flex">
                  <q-btn
                    flat
                    round
                    color="light-blue-10"
                    icon="grid_view"
                    @click="viewStatus = 'grid'"
                  />
                  <q-btn
                    flat
                    round
                    color="light-blue-10"
                    icon="view_list"
                    @click="viewStatus = 'list'"
                  />
                </div>
              </div>
              <div
                class="row q-ml-sm text-h5 text-weight-bold text-accent"
                v-else
              >
                Search Does Not Match Any Product
              </div>
              <div class="row wrap justify-center q-mb-lg">
                <div v-if="searchInProgress" class="row justify-center items-center full-height">
                  <q-spinner-cube
                    size="100"
                    color="primary"
                  />
                </div>
                <div
                  v-else
                  v-for="(product, index) in searchResult"
                  :key="index"
                  :class="{'col-4 q-pa-sm q-mb-sm': viewStatus === 'grid', 'col-12 items-center q-my-md': viewStatus === 'list'}"
                >
                  <product-card
                    :product="product"
                    :viewStyle="viewStatus"
                  />
                </div>
              </div>
              <div class="row">
                <div
                  class="col-6 p_container row justify-between items-center bg-white q-ma-md q-pa-md"
                  style="opacity: 0.9; bottom: 5px; margin-left: 0px; width: 100%"
                  v-if="getNoOfProducts !== 0"
                >
                  <q-pagination
                    :max="Math.ceil((getNoOfProducts / 9))"
                    :max-pages="2"
                    unelevated
                    icon-next="mdi-arrow-right-bold-outline"
                    icon-prev="mdi-arrow-left-bold-outline"
                    v-model="page"
                    active-color="light-blue-10"
                    color="accent"
                    direction-links
                  />
                  <div>[ A <b>Total</b> Of <b>{{ Math.ceil((getNoOfProducts / 9)) }}</b> Pages ]</div>
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
import {mapActions, mapGetters} from "vuex";
import ProductCard from "@/components/products/product-card";
import ProductCategory from "@/components/products/product-category";

export default {
  name: "products",
  components: {ProductCategory, ProductCard},
  data() {
    return {
      searchText: '',
      viewStatus: 'grid',
    }
  },

  computed: {
    ...mapGetters({
      getNoOfProducts: "productSearch/getNoOfProducts",
      searchResult: "productSearch/getProducts",
      getPage: "productSearch/getPage",
      searchInProgress: "productSearch/isSearchInProgress",
      categories: "productGroups/getAll"
    }),
    page: {
      get() {
        return this.getPage
      },
      set(page) {
        if (this.getPage !== page) {
          this.setPage(page)
        }
      }
    }
  },

  watch: {
    '$route.query.query': {
      handler(newVal) {
        this.searchText = newVal
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions({
      doSearch: 'productSearch/search',
      setPage: 'productSearch/setSearchPage',
      setSearchString: 'productSearch/setSearchString'
    }),

    filterProducts() {
      const searchString = this.searchText ? this.searchText : this.$route.query.query ? this.$route.query.query : '@all@'
      const inputed = searchString.toLowerCase()
      this.setSearchString(inputed)
      this.doSearch()
    },

    updateSearchQuery() {
      this.$router.push({path: '/search', query: {query: this.searchText}}).catch(() => {
      })
    }
  },

  created() {
    this.filterProducts()
  }

}
</script>

<style lang="sass" scoped>
.p_container
  border-radius: 6px
  box-shadow: 1px 1px 30px 4px #cae9f6

.top_container
  border-radius: 6px
  box-shadow: 1px 1px 30px 4px #cae9f6
  background-color: white
  height: 60px
  margin-left: 0px
  align-items: center
  justify-content: space-between
  padding: 5px

.search-column
  box-shadow: 1px 1px 30px 4px #cae9f6
  padding: 4px
  margin-top: 36px
  border-radius: 5px
</style>
