<template>
  <q-input
    :rules="rules"
    :value="value"
    dense
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
        v => !!v && v.length > 0 || 'The unit must have at least one character!',
      ]
    },
  },

  methods: {
    setValue( value ) {
      this.$emit('set', value)
    },
  },

  props: {
    value: {
      type: String,
      default: null,
    },
  },
}
</script>
