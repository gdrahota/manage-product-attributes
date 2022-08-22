<template>
  <div flat class="p_card outline row q-ma-sm">
      <div class="col-3">
        <img :class="`shadow-1`" class="shadow-box rounded" width="120px" height="100px" src="../../assets/solar.jpg" />
      </div>

      <div class="col-9 q-pa-sm">
        <div class="text-subtitle1 text-bold" style="overflow:hidden; text-overflow:ellipsis">{{ product.name }}</div>
        <div class="text-subtitle2">{{ product.manufacturer.name }}</div>
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

<style lang="sass">
  .p_card 
    border: 1px lightgrey solid
    width: 500px 
    height: 110px
</style>