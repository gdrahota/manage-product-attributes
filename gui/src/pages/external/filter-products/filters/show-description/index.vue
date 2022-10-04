<template>
  <q-btn
    v-if="description"
    color="info"
    flat
    icon="information-outline"
    round
  >
    <q-tooltip
      :delay="500"
      :offset="[-10, 20]"
      anchor="top start"
      content-class="text-body1 text-no-wrap"
      self="center start"
    >
      <div v-html="description" />
    </q-tooltip>
  </q-btn>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: null,
    },
  },
}
</script>
