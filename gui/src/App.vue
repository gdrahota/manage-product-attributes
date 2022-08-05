<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from './pages/home'

import { mapActions } from 'vuex'

export default {
  components: {
    Home,
  },

  methods: {
    ...mapActions({
      loadProducts: 'products/loadAll',
    }),
  },

  mounted() {
    this.loadProducts()
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
