<template>
  <div class="container bg-white">
    <q-input
      placeholder="I am looking for ..."
      :input-style="{padding: '30px', fontSize: '16px'}"
      use-input
      :loading="isLoading"
      @keydown.enter="navigateToSearchLandingPage"
      @input="doSearch"
      v-model="searchString"
      borderless
      class="full-height"
      standout="no-border-rounded q-mb-md"
    >
      <template v-slot:append>
        <q-icon
          size="30px"
          class="q-pr-lg q-pt-xs full-width"
          name="mdi-magnify"
        />
      </template>
    </q-input>
    <div
      v-if="searchString !== ''"
      class="base_container"
      @click="navigateToSearchLandingPage"
    >
      <div style="padding: 30px">
        <span
          class="text-weight-bold"
          style="color: #104a61"
        >
          {{searchString}}
        </span>
        <span>
          in Products
        </span>
        <span
          style="font-size: 11px; font-style: italic; font-weight: bold"
        >
          {{ searchResult }} found
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from "vuex/dist/vuex.esm.browser";

export default {
  name: 'auto-search',

  computed: {
    ...mapGetters({
      products: 'products/getAll',
      productGroups: 'productGroups/getAll',
      searchResult: 'productSearch/getNoOfProducts'
    }),
  },

  data: () => ({
    isLoading: false,
    searchString: ""
  }),

  methods: {
    ...mapActions({
      search: "productSearch/search",
      setSearchString: "productSearch/setSearchString",
      setPage:"productSearch/setSearchPage"
    }),

    doSearch(){
      this.setSearchString(this.searchString);
      this.search(this.searchString)
      this.setPage(1)
    },

    navigateToSearchLandingPage() {
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
.container
  width: 800px
  border-radius: 7px
  box-shadow: 1px 1px 30px 4px #cae9f6

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

.base_container
  cursor: pointer

  &:hover
    background-color: #edf7fc
</style>
