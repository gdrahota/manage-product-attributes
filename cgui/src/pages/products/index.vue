<template>
  <div
    class="row justify-center"
    style="padding-top: 100px; padding-bottom: 50px"
  >
    <div class="col-10">
      <div class="row justify-between">
        <div class="col-lg-3 col-md-3 col-12">
          <div class="search-column q-mx-sm bg-white">
            <q-input
              placeholder="Search here ..."
              borderless
              dense
              @keydown.enter="updateSearchQuery"
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
        </div>
        <div class="col-12 col-lg-8 col-md-8">
          <div
            v-if="filteredProducts.length !== 0"
            class="q-ml-sm text-h5 text-weight-bold text-accent"
          >
            Found {{ filteredProducts.length }} Products
          </div>
          <div
            class="q-ml-sm text-h5 text-weight-bold text-accent"
            v-else
          >
            Search Does Not Match Any Product
          </div>
          <div class="row wrap justify-center">
            <div
              v-for="(product, index) in filteredProducts" :key="index"
              class="col-4 q-pa-sm"
            >
              <product-card :product="product"></product-card>
            </div>
          </div>
          <div
            class="row justify-between items-center bg-white col-12 q-ma-sm q-pa-md"
            style=" width: available"
          >
            <q-pagination
              :max="Math.ceil((filteredProducts.length / 9))"
              :max-pages="2"
              unelevated
              icon-next="mdi-arrow-right-bold-outline"
              icon-prev="mdi-arrow-left-bold-outline"
              v-model="currentPage"
              active-color="accent"
              color="accent"
              direction-links
            />
            <div>[ A Total Of {{ Math.ceil((filteredProducts.length / 9)) }} Pages ]</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex/dist/vuex.esm.browser";
import ProductCard from "@/components/products/product-card";

export default {
  name: "products",
  components: {ProductCard},
  data() {
    return {
      searchText: '',
      currentPage: 1
    }
  },

  computed: {
    ...mapGetters({
      products: "products/getAll",
      searchResult: "products/getSearchResult"
    }),

    filteredProducts() {
      const searchString = this.searchText ? this.searchText : this.$route.query.query ? this.$route.query.query : ''
      if (searchString === '') {
        return this.products
      } else {
        const inputed = searchString.toLowerCase()
        this.doSearch(inputed)
        return this.searchResult
      }
    }
  },

  watch: {
    '$route.query.query': {
      handler(newVal) {
        this.searchText = newVal
      },
      immediate: true
    },

    'currentPage': {
      handler(newVal) {

      }
    }
  },

  methods: {
    ...mapActions({
      doSearch: 'products/search'
    }),

    updateSearchQuery() {
      this.$router.push({path: '/search', query: {query: this.searchText}})
    }
  }

}
</script>

<style lang="sass" scoped>
.search-column
  box-shadow: 1px 1px 30px 4px #cae9f6
  padding: 4px
  margin-top: 36px
  border-radius: 5px
</style>
