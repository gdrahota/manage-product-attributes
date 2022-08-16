<template>
  <div :class="`shadow-1`" class="shadow-box q-ma-sm">
    <div v-for="(category, index) in productGroups" :key="index">
        <div class="q-pa-md my-card">
            <div class="row text-bold items-center justify-between">
                {{ category.name }}
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
import { mapGetters } from 'vuex'
export default {
    name: 'CategoriesCard',

    data(){
        return{
            show: false
        }
    },

    computed: {
        ...mapGetters({
            productGroups: 'productGroups/getAll'
        })
    },



}
</script>

<style lang="sass">
    .my-card:hover
        cursor: pointer
        background-color: #dcdcdc
    
</style>