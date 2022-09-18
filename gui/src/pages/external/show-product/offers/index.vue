<template>
  <q-card flat>
    <q-card-section class="offers">
      <div class="row header text-brown-4">
        <div class="col-4">Dealer</div>
        <div class="col-2">Delivery Time</div>
        <div class="col-2">Item Price</div>
        <div class="col-2">Shipping Cost</div>
        <div class="col-2">Total Price</div>
      </div>

      <div
          v-for="(offer, key) of product.offers"
          :key="key"
          class="row offer text-blue-8"
      >
        <div class="col-4 text-grey-8">{{ offer.dealer.name }}</div>
        <div class="col-2 right">1 bis 2 Wochen</div>
        <div class="col-2 right">{{ offer.itemPrice | number(2) }} €</div>
        <div class="col-2 right">{{ offer.shippingPrice| number(2) }} €</div>
        <div class="col-2 right">{{ offer.totalPrice | number(2) }} €</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
.offers
  .row > div
    border-bottom: 1px dotted #ddd

  .row:first-child
    border-bottom: 2px solid #ccc

  .header > div
    font-size: 18px
    font-weight: bold
    text-align: center
    padding: 8px

  .offer > div
    font-size: 16px
    text-align: left
    padding: 8px

  .offer > .right
    text-align: right

  .offer > div:last-child
    font-weight: bold
</style>
