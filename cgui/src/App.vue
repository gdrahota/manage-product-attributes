<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  components: {
    
  },

  data: () => ({
    
  }),

  methods: {
    ...mapActions({
      loadProducts: 'products/loadAll',
      loadProductGroups: 'productGroups/loadAll',
      loadProductToProductGroups: 'productToProductGroups/loadAll',
      loadProductAttributes: 'productAttributes/loadAll',
      loadProductAttributeGroupsOfProductGroups: 'productAttributeGroupsOfProductGroups/loadAll',
    }),
  },

  mounted() {
    this.loadProducts(),
    this.loadProductGroups(),
    this.loadProductToProductGroups(),
    this.loadProductAttributes(),
    this.loadProductAttributeGroupsOfProductGroups()
  }
}
</script>

<style>
#app {
  font-family: "Montserrat", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
