<template>
  <q-footer>
    <q-toolbar class="bg-grey-9 q-px-none">
      <template
        v-for="(item, key) of items"
      >
        <q-btn
          :key="key"
          :icon="item.icon"
          :isActive="$route.name === item.to.name"
          :label="item.label"
          :to="item.to"
          flat
          no-caps
          ripple
        />
        <q-separator :key="`${ key }-sep`" color="grey-7" vertical />
      </template>

      <q-space />

      <!--      <q-btn label="Dealer's Area" no-caps icon="mdi-handshake" flat />-->
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  computed: {
    items() {
      return [
        { label: 'Home', to: { name: 'home' }, icon: 'home' },
        { label: 'About Us', to: { name: 'about-us' }, icon: 'mdi-account-supervisor' },
        { label: 'Impressum', to: { name: 'impressum' }, icon: 'mdi-pillar' },
        { label: 'Contact Us', to: { name: 'contact-us' }, icon: 'mdi-account-box-outline' },
      ]
    },
  },
}
</script>

<style lang="sass">
[isActive]
  color: gold
</style>
