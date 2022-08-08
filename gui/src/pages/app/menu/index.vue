<template>
  <q-toolbar class="q-pt-sm">
    <q-btn flat label="Home" to="/" />
    <q-btn :to="{ name: 'manage-products' }" flat label="Products" />
    <q-btn :to="{ name: 'manage-attributes' }" flat label="Attribute" />
  </q-toolbar>
</template>

<script>
export default {}
</script>
