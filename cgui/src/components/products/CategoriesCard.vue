<template>
  <div :class="`shadow-1`" class="shadow-box q-ma-sm">
    <div v-for="i in 20" :key="i">
        <div class="q-pa-md my-card">
            <div class="row text-bold items-center justify-between">
                Category Name
                <q-icon name="mdi-chevron-right" />
            </div>
            <q-menu
                anchor="top right"
                self="top left"
            >
                <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                        <q-item-section>detail 1</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-section>detail 2</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CategoriesCard',

    data(){
        return{
            show: false
        }
    }

}
</script>

<style lang="sass">
    .my-card:hover
        cursor: pointer
        background-color: #dcdcdc
    
</style>