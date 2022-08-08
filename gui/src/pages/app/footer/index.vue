<template>
  <q-footer class="bg-blue-grey-6 text-white" elevated>
    <q-bar dense>
      <div class="text-white text-caption jump-to-supplier">
        Created by
        <a class="text-white text-bold" href="https://www.db-training.de/" target="_blank">Guido Drahota</a>
      </div>

      <q-space />
    </q-bar>
  </q-footer>
</template>

<script>
export default {}
</script>

<style lang="sass">
.jump-to-supplier
  > a
    text-decoration: none

.jump-to-supplier:hover
  > a
    text-decoration: underline
</style>
