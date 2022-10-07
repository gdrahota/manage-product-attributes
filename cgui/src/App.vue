<template>
  <div class="bg-secondary">
    <q-layout view="hHh lpR fFf">
      <app-header></app-header>
      <router-view></router-view>
      <app-footer></app-footer>
    </q-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";

export default {
  components: {
    AppHeader,
    AppFooter
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
