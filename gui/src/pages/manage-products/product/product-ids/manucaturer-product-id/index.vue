<template>
  <q-input
    :value="manufacturerProductId"
    clearable
    dense
    filled
    label="Manufacturer Item Name"
    stack-label
    @input="setValue"
  />
</template>

<script>
export default {
  methods: {
    setValue( value ) {
      this.$emit('set', value)
    },
  },

  props: {
    manufacturerProductId: {
      type: String,
      default: null,
    },
  },
}
</script>
