<template>
  <q-input
    :rules="rules"
    :step="1"
    :value="value"
    dense
    filled
    label="Fractional Digits"
    stack-label
    type="number"
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        v => !isNaN(v) || 'The number of fractional digits are required!',
        v => v <= 10 || 'maximal: 10',
        v => v >= 0 || 'minimal: 0',
      ]
    },
  },

  methods: {
    setValue( value ) {
      this.$emit('set', parseFloat(value))
    },
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
}
</script>
