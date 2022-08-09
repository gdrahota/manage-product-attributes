<template>
  <q-input
    :rules="rules"
    :value="name"
    filled
    label="Manufacturer Name"
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        v => !!v || 'The manufacturer name is required!',
        v => !!v && v.length > 4 || 'The manufacturer name must have at least 5 characters!',
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
