<template>
  <div class="column container">
     <div class="text-grey-6 text-subtitle-1">Power Peak</div> 
     <div class="row">
      <div class="col-5">
        <q-input type="text" outlined dense label="Min" stack-label />
      </div>
      <q-space />
      <div class="col-5">
        <q-input type="text" outlined dense label="Max" stack-label />
      </div>
     </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="sass">
  .container
    border: 1px lightgrey solid,
    padding: 10px
</style>