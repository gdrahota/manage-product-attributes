<template>
  <div class="row justify-center full-width q-my-sm">
    <div v-for="(category, index) in productGroups" :key="index">
      <div
        class="q-ma-sm c_card bg-white"
        @click="navToFilter(category.id)"
      >
        <div class="column text-bold justify-between">
          <img
            style="border-radius: 10px; object-fit: cover"
            :src="require(`../../assets/${category.id}.jpg`)"
            alt="image for product category"
            width="100%"
            height="150px"
          />
          <div class="card_title q-pt-md q-pl-md text-left">{{ category.name }}</div>
          <div class="card_sub_title q-pt-md q-pl-md text-left">{{ getCategoryProductsLength(category.id) }} products
            found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'CategoriesCard',

  data() {
    return {
      show: false
    }
  },

  computed: {
    ...mapGetters({
      productGroups: 'productGroups/getAll',
      products: 'products/getAll'
    }),
  },

  methods: {
    navToFilter(id) {
      this.$router.push({
        name: 'main_filter',
        params: {
          id: id
        }
      })
    },

    getCategoryProductsLength(categoryId) {
      const FIRST_PRODUCT_GROUP_ID = 0
      const filteredProducts = this.products.filter(product => product.productGroups[FIRST_PRODUCT_GROUP_ID].id === categoryId)
      return filteredProducts.length
    }
  },

}
</script>

<style lang="sass">
    .c_card
      width: 350px
      height: 250px
      box-shadow: 1px 1px 30px 4px #cae9f6

      border-radius: 10px

      &:hover
        cursor: pointer
        animation: zoom-in-zoom-out 0.3s

    @keyframes zoom-in-zoom-out
      0%
        transform: scale(1, 1)

      50%
        transform: scale(1.05, 1.05)

      100%
        transform: scale(1, 1)




    .card_title
      font-size: small
      color: lightslategrey

    .card_sub_title
      font-size: x-small
      color: lightslategrey

</style>
