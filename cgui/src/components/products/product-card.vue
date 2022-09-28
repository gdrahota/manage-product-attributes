<template>
  <div
    class="p_card bg-white outline"
    @click="moveToDetailPage(product.id)"
    @mouseover="showCol = true"
    @mouseleave="showCol = false"
  >
    <div class="">
      <img
        class="q-pa-sm"
        src="../../assets/1.jpg"
      />
    </div>

    <div class="column q-pa-sm justify-center">
      <div class="card_title text-center">{{ product.name }}</div>
      <div class="card_sub_title q-pt-sm text-center">{{ product.description ? product.description : 'Description Here ...' }}</div>
    </div>
    <div 
      style="padding-bottom: 0"
      class="row justify-center h-100"
    >
      <q-btn
        dense
        padding="0 10px"
        unelevated
        class="s_btn"
        :color="showCol ? 'light-blue-10' : 'grey-3'"
        :text-color="showCol ? 'white' : 'grey-8'"
        style="text-transform: none; font-weight: 600; border-radius: 3px;"
      >
        More details
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data(){
    return{
      showCol: false
    }
  },
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
.s_btn
  transition: background-color 1.0s ease-in-out

.p_card
  height: 350px
  border-radius: 6px
  box-shadow: 1px 1px 30px 4px #cae9f6


  img
    height: 220px
    width: 100%
    object-fit: cover
    border-radius: 6px

  &:hover
    cursor: pointer
    animation: zoom-in-zoom-out 1.0s

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
