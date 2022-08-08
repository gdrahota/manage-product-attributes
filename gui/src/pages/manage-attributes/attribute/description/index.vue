<template>
  <q-input
    :value="description"
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
    description: {
      type: String,
      default: null,
    },
  },
}
</script>
