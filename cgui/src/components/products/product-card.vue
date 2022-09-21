<template>
  <div
    class="p_card bg-white outline"
    @click="moveToDetailPage(product.id)"
  >
    <div class="">
      <img
        class="q-pa-sm"
        src="../../assets/1.jpg"
      />
    </div>

    <div class="row q-pa-sm flex-center">
      <div class="card_title text-center">{{ product.name }}</div>
      <div class="card_sub_title q-pt-sm text-center">{{ product.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  methods: {
    moveToDetailPage(productId){
      this.$router.push({
        name: 'product-details',
        params: {
          id: productId
        }
      })
    }
  }
}
</script>

<style lang="sass">
.p_card
  height: 350px
  border-radius: 6px
  box-shadow: 1px 1px 30px 4px #cae9f6


  img
    height: 200px
    width: 100%
    object-fit: cover
    border-radius: 6px

  &:hover
    cursor: pointer
    animation: zoom-in-zoom-out 0.3s

    @keyframes zoom-in-zoom-out
      0%
        transform: scale(1, 1)

      50%
        transform: scale(1.05, 1.05)

      100%
        transform: scale(1, 1)

.card_title
  font-size: 15px
  font-weight: 700
  color: #516573

.card_sub_title
  font-size: 12px
  font-weight: 500
  color: #697888
</style>
