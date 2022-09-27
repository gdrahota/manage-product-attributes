<template>
  <q-header
    elevation="0"
    class="q-m-lg bg-secondary"
    style="box-shadow: 1px 1px 30px 4px #cae9f6"
  >
    <q-toolbar
      reveal
      class="q-px-xl q-py-sm text-accent"
    >
      <q-toolbar-title>
        <q-icon name="mdi-solar-panel" size="20px" color="#f4fafd" />
        SolarTech
      </q-toolbar-title>
      <q-space/>
      <q-btn :color="`light-blue-10`" v-if="$q.screen.sm || $q.screen.xs" flat dense icon="mdi-menu" />
      <q-tabs
        v-else
        v-model="tab"
        shrink
      >
        <q-route-tab
          name="home"
          to="/"
          label="Home"
          style="text-transform: capitalize"
        />
        <q-route-tab
          name="products"
          to="/search"
          label="Products"
          style="text-transform: capitalize"
        />
        <q-route-tab
          name="about"
          label="About Us"
          style="text-transform: capitalize"
        />
        <q-route-tab
          name="contact"
          label="Contact Us"
          style="text-transform: capitalize"
        />
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'app-header',
  props:['type'],
  data(){
    return{
      tab: ''
    }
  },
  components: {

  },
  mounted(){
    console.log('Showing passed ==<')
    console.log(this.type)
  }

}
</script>

<style>

</style>
