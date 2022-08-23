<template>
  <q-tabs
    v-model="tab"
    :breakpoint="0"
    align="left"
    content-class="bg-grey-7"
    indicator-color="yellow"
  >
    <q-route-tab
      v-for="(route, pos) of routes"
      :key="pos"
      :content-class="route.classes"
      :exact="route.exact||false"
      :icon="route.icon"
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
        { to: '/', label: null, icon: 'home', exact: true },
        { to: { name: 'manage-manufacturers' }, label: 'Manufacturers' },
        { to: { name: 'manage-attributes' }, label: 'Product Attributes' },
        { to: { name: 'manage-product-groups' }, label: 'Product Groups' },
        { to: { name: 'manage-products' }, label: 'Products' },
        { to: { name: 'manage-dealers' }, label: 'Dealers' },
        { to: { name: 'preview' }, label: 'Preview', classes: 'text-bold text-yellow' },
      ])
    },
  },

  data: () => ({
    tab: 0,
  }),
}
</script>
