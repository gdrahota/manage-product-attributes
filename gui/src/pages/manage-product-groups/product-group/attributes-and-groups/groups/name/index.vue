<template>
  <q-input
    :rules="rules"
    :value="value"
    filled
    label="Attribute Group Name"
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    rules() {
      return [
        v => !!v || 'An attribute group name is required!',
        v => !!v && v.length > 2 || 'The attribute group name must have at least 3 character!',
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
