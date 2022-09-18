<template>
  <q-input
    :rules="rules"
    :value="name"
    filled
    label="Product Group Name"
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        v => !!v || 'A product group name is required!',
        v => !!v && v.length > 4 || 'The product group name must have at least one character!',
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
