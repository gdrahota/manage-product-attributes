<template>
  <q-input
    :rules="rules"
    :value="name"
    filled
    label="Item Name"
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        v => !!v || 'The item name is required!',
        v => !!v && v.length > 4 || 'The item name must have at least 5 characters!',
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
