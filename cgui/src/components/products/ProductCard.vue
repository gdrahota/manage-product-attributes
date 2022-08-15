<template>
  <div :class="`shadow-1`" flat style="width: 330px;" class="shadow-box row q-ma-sm">
      <img :class="`shadow-1`" class="shadow-box rounded" width="150px" height="100px" src="../../assets/solar.jpg">

      <div class="q-pa-sm">
        <div class="text-subtitle1 text-bold">Solar Panel Item</div>
        <div class="text-subtitle2">description...</div>
      </div>

      <div  class="q-pt-sm">
        {{  }}
      </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props:['product']
}
</script>

<style>

</style>