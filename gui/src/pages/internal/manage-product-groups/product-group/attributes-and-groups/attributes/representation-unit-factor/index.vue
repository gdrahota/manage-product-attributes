<template>
  <q-input
    :rules="rules"
    :value="value"
    dense
    filled
    label="Conversion Factor"
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
        v => !!v || 'The factor is required!',
        v => !!v && v > 0 || 'The factor must be bigger than zero (0)!',
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
      default: null,
    },
  },
}
</script>
