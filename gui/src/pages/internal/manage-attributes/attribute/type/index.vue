<template>
  <q-select
    :options="options"
    :rules="rules"
    :value="attrType"
    filled
    label="Type"
    options-dense
    stack-label
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    options() {
      return Object.freeze([ 'text', 'decimal', 'boolean' ])
    },
    rules() {
      return [
        v => !!v || 'The type is required!',
      ]
    },
  },

  methods: {
    setValue( value ) {
      this.$emit('set', value)
    },
  },

  props: {
    attrType: {
      type: String,
      default: null,
    },
  },
}
</script>
