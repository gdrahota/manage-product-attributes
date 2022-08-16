<template>
  <div :class="`shadow-1`" flat style="width: 500px; height: 100px;" class="shadow-box row q-ma-sm">
      <img :class="`shadow-1`" class="shadow-box rounded" width="150px" height="100px" src="../../assets/solar.jpg">

      <div class="q-pa-sm">
        <div class="text-subtitle1 text-bold">{{ product.name }}</div>
        <div class="text-subtitle2">{{ product.description }}</div>
      </div>

      <div  class="q-pt-sm">
        {{  }}
      </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props:{
        product: Object
    },
}
</script>

<style>

</style>