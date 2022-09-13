<template>
  <div>
    ab <strong class="price">{{ price | number(2) }} €</strong>
    <br />
    <div class="q-mt-sx text-grey-6 text-caption">{{ dealer.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
    dealer: {
      type: Object,
      required: true,
    },
  },
}
</script>
