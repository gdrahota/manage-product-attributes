<template>
   <q-layout view="hHh lpR fFf">
    <q-header class="text-white">
      <q-toolbar class="q-px-xl q-py-sm bg-teal-4 text-white">
        <q-btn flat round dense icon="assignment_ind" />
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-input dense filled v-model="text" input-class="text-left text-white" class="q-ml-md">
          <template v-slot:append>
            <q-icon name="search" />
            <q-icon name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
        <q-space />
        <q-btn flat round dense icon="apps" class="q-mr-xs" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </q-header>

    <router-view />

    <q-footer class="bg-grey-8 text-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
          </q-avatar>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
    name: 'MainLayout',

}
</script>

<style>

</style>