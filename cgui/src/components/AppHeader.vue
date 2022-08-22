<template>
  <q-header elevated class="q-m-lg text-white">
      <q-toolbar reveal class="q-px-xl q-py-sm  text-white">
        <q-toolbar-title>
          Solar Farms
        </q-toolbar-title>
        <q-space />
        <!-- <auto-search></auto-search> -->
        <q-space />
        <q-btn unelevated rounded color="deep-orange-7" label="Sign In" class="q-mr-lg" />
      </q-toolbar>
    </q-header>
</template>

<script>
import AutoSearch from './search/AutoSearch.vue';
export default {
  name: 'AppHeader',
  props:['type'],
  components: {
    // AutoSearch
  },
  mounted(){
    console.log('Showing passed ==<')
    console.log(this.type)
  }

}
</script>

<style>

</style>