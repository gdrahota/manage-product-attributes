<template>
  <div row class="bg-white">
    <div >
        <auto-search></auto-search>
    </div>
  </div>
</template>

<script>
import AutoSearch from './AutoSearch.vue'
export default {
    name:'SearchContainer',
    components: {
        AutoSearch
    }

}
</script>

<style>

</style>