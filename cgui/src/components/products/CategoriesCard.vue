<template>
  <div class="row q-ma-sm">
    <div v-for="(category, index) in productGroups" :key="index">
      <div
        class="q-ma-sm c_card"
        @click="navToFilter(category.id)"
      >
        <div class="column text-bold justify-between">
          <img
            style="border-radius: 10px"
            src="../../assets/solar_back_2.jpg"
            width="100%"
            height="120px"
            object-fit="cover"
          />
          <div class="card_title q-pt-md q-pl-md text-left">{{ category.name }}</div>
          <div class="card_sub_title q-pt-md q-pl-md text-left">{{ getCategoryProducts(category.id) }} products found</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CategoriesCard',

  data() {
    return {
      show: false
    }
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

    getCategoryProducts(categoryId){
      let f_products = this.products.filter((product) => product.productGroups[0].id === categoryId)
      return f_products.length
    }
  },

  computed: {
    ...mapGetters({
      productGroups: 'productGroups/getAll',
      products: 'products/getAll'
    }),
  },


  mounted() {
    console.log(this.products)
  }

}
</script>

<style lang="sass">
    .c_card
      width: 300px
      height: 200px
      border: 1px solid #dcdcdc
      border-radius: 10px

      &:hover
        cursor: pointer
        border: 2px solid #303C6C


    .card_title
      font-size: small
      color: lightslategrey

    .card_sub_title
      font-size: x-small
      color: lightslategrey

</style>
