<template>
  <div class="container bg-white">
    <q-input
      placeholder="I am looking for ..."
      :input-style="{padding: '30px', fontSize: '16px'}"
      use-input
      :loading="isLoading"
      @keydown.enter="moveToSearchLanding"
      @input="doSearch(searchString)"
      v-model="searchString"
      borderless
      class="full-height"
      standout="no-border-rounded q-mb-md"
    >
      <template v-slot:append>
        <q-icon size="30px" class="q-pr-lg q-pt-xs full-width" name="mdi-magnify"/>
      </template>
    </q-input>
    <div
      v-if="searchString !== ''"
      class="found"
      @click="moveToSearchLanding"
    >
      <div style="padding: 30px">
        <span
          class="text-weight-bold"
          style="color: #104a61"
        >
          {{searchString}}
        </span>
        <span class="">
          in Products
        </span>
        <span style="font-size: 11px; font-style: italic; font-weight: bold">{{ searchResult.length }} found</span>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from "vuex/dist/vuex.esm.browser";

export default {
  data: () => ({
    isLoading: false,
    items: [
      'Solar Panel',
      'PVC',
      'Inverter',
      'Solar Battery',
      'Mounter',
      'Connector'
    ],
    options: [],
    groupOptions: [],
    model: [],
    searchString: "",
    tab: null,
  }),

  computed: {
    ...mapGetters({
      products: 'products/getAll',
      productGroups: 'productGroups/getAll',
      searchResult: 'products/getSearchResult'
    }),
  },


  methods: {
    ...mapActions({
      doSearch: "products/search"
    }),

    getCategorySearch(category) {
      const inputed = this.searchString.toLowerCase()
      let f_products = this.products.filter((product) => product.productGroups[0].id === category.id)
      return f_products.filter((item) => (item.name.toLowerCase()).includes(inputed)).length
    },

    filterFxn() {
      this.isLoading = true
      if (this.searchString === "") {
        this.options = []
        this.isLoading = false
        return
      }
      const inputed = this.searchString.toLowerCase()
      this.options = this.products.filter((item) => (item.name.toLowerCase()).includes(inputed))
      this.isLoading = false
    },

    moveToSearchLanding() {
      this.$router.push({
        name: 'products',
        query: {
          query: this.searchString
        },
        params: {}
      })
    }
  },

}
</script>

<style lang="sass" scoped>
.found
  cursor: pointer
  &:hover
    background-color: #edf7fc

.container
  width: 800px
  border-radius: 7px
  box-shadow: 1px 1px 30px 4px #cae9f6
  -webkit-transition: max-height 0.8s
  -moz-transition: max-height 0.8s
  transition: max-height 0.8s

  @media only screen and (max-width: 800px)
    width: 90%

  &:hover
    animation: zoom-in-zoom-out 0.3s

@keyframes zoom-in-zoom-out
  0%
    transform: scale(1, 1)

  50%
    transform: scale(1.05, 1.05)

  100%
    transform: scale(1, 1)

.m_item
  &:hover
    background-color: white
    font-weight: bolder
</style>
