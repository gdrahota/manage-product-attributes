<template>
  <q-field
    dense
    filled
    square
  >
    <template v-slot:control>
      {{ attributeValue.value }}
    </template>
  </q-field>
</template>

<script>
export default {
  props: {
    attributeValue: {
      default: null,
    },
  },
}
</script>
