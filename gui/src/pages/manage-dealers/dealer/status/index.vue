<template>
  <q-select
    :options="options"
    :rules="rules"
    :value="value"
    filled
    label="Status"
    options-dense
    stack-label
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    options() {
      return Object.freeze([ 'created', 'valid', 'paused', 'deactivated' ])
    },
    rules() {
      return [
        v => !!v || 'The status is required!',
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
