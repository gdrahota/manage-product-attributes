<template>
  <q-header>
    <q-toolbar class="bg-grey-4 text-grey-9 q-px-none">
      <template v-for="(item, key) of items">
        <q-space
          v-if="item.type === 'space'"
          :key="key"
        />
        <q-btn
          v-else
          :key="key"
          :icon="item.icon"
          :isActive="$route.name === item.to.name"
          :label="item.label"
          :size="`${ item.size || 16 }px`"
          :to="item.to"
          flat
          no-caps
          ripple
        />
      </template>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  computed: {
    items() {
      return [
        { label: 'Solar Parts', to: { name: 'home' }, icon: 'home', size: 20 },
        { type: 'space' },
        { label: 'Impressum', to: { name: 'impressum' }, icon: 'mdi-pillar' },
        { label: 'Contact Us', to: { name: 'contact-us' }, icon: 'mdi-account-box-outline' },
        { label: 'About Us', to: { name: 'about-us' }, icon: 'mdi-account-supervisor' },
      ]
    },
  },
}
</script>

<style lang="sass">
[isActive]
  color: gold
</style>
