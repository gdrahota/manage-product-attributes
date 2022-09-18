<template>
  <q-input
    :value="eanCode"
    clearable
    dense
    filled
    label="EAN Code"
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
    eanCode: {
      type: String,
      default: null,
    },
  },
}
</script>
