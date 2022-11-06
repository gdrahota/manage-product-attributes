<template>
  <q-layout view="hHh lpR fFf">
    <q-header className="bg-blue-4 text-white" elevated>
      <Menu class="bg-primary" />
    </q-header>

    <router-view />

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import Menu from '@/pages/app/menu'

export default {
  components: {
    Menu,
  },

  created() {
    this.loadManufacturers()
    this.loadProductGroups()
    this.loadProductToProductGroups()
    this.loadProductAttributes()
    this.loadProductAttributeGroupsOfProductGroups()
    this.loadDealers()
  },

  data: () => ( {
    left: false,
  } ),

  methods: {
    ...mapActions( {
      loadManufacturers: 'manufacturers/loadAll',
      loadProductGroups: 'productGroups/loadAll',
      loadProductToProductGroups: 'productToProductGroups/loadAll',
      loadProductAttributes: 'productAttributes/loadAll',
      loadProductAttributeGroupsOfProductGroups: 'productAttributeGroupsOfProductGroups/loadAll',
      loadDealers: 'dealers/loadAll',
    } ),
  },

  mounted() {
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
