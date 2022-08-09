<template>
  <q-tabs
    v-model="tab"
    :breakpoint="0"
    align="left"
    indicator-color="yellow"
  >
    <q-route-tab
      v-for="(route, pos) of routes"
      :key="pos"
      :exact="route.exact||false"
      :label="route.label"
      :name="pos"
      :to=route.to
      flat
    />
  </q-tabs>
</template>

<script>
export default {
  computed: {
    routes() {
      return Object.freeze([
        { to: '/', label: 'Home', exact: true },
        { to: { name: 'manage-products' }, label: 'Products' },
        { to: { name: 'manage-attributes' }, label: 'Product Attributes' },
        { to: { name: 'manage-product-groups' }, label: 'Product Groups' },
      ])
    },
  },

  data: () => ({
    tab: 0,
  }),
}
</script>
