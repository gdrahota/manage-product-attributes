<template>
  <div
    class="text-grey-9 text-weight-bold"
  >
    {{ attributeValue.value }}
  </div>
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
