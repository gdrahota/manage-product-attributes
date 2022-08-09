<template>
  <q-input
    :rules="rules"
    :value="unit"
    filled
    label="Unit"
    stack-label
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        v => !!v || 'The unit is required!',
        v => !!v && v.length >= 1 || 'The unit must have at least 5 characters!',
      ]
    },
  },

  methods: {
    setValue( value ) {
      this.$emit('set', value)
    },
  },

  props: {
    unit: {
      type: String,
      default: null,
    },
  },
}
</script>
