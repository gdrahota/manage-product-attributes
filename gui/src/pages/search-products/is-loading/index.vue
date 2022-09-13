<template>
  <q-dialog
    :value="isSearchInProgress"
    persistent
  >
    <q-spinner-cube
      color="teal"
      size="15em"
    />
  </q-dialog>
</template>

<script>
export default {
  props: {
    isSearchInProgress: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
