<template>
  <q-input
    :value="value"
    autogrow
    clearable
    filled
    label="Description"
    stack-label
    type="textarea"
    @input="setValue"
  />
</template>

<script>
export default {
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
