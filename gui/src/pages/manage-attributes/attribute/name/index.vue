<template>
  <q-input
    :rules="rules"
    :value="name"
    filled
    label="Property Name"
    stack-label
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        v => !!v || 'A property name is required!',
        v => !!v && v.length > 4 || 'The property name must have at least one character!',
      ]
    },
  },

  methods: {
    setValue( value ) {
      this.$emit('set', value)
    },
  },

  props: {
    name: {
      type: String,
      default: null,
    },
  },
}
</script>
