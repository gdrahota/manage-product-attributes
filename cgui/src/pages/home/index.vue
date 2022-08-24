<template>
  <q-layout view="hHh lpR fFf">
    <app-header></app-header>
    <q-page-container>
      <q-page class="">
        <div
          style="height:280px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px"
          class="column bg-primary justify-center items-center">
          <div class="row justify-baseline items-baseline">
            <p class="text-subtitle-1 text-white q-pr-md">Find anything solar here</p>
          </div>
          <auto-search></auto-search>
        </div>

        <div class="row justify-center">
          <div class="col-9">
            <div class="row q-pa-lg justify-center items-center text-center" style="height:300px"
                 v-if="products.length === 0">
              <q-spinner-cube
                size="100"
                color="primary"
              />
            </div>
            <div v-else class="row q-pa-lg justify-center">
              <div class="row">
                <div class="">
                  <div class="q-pt-md q-pl-md text-h6 text-grey-6">Browse Our Categories Of Products Below</div>
                  <category-card></category-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

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
import AppHeader from '@/components/AppHeader.vue'
import CategoryCard from '@/components/products/CategoriesCard'
import AutoSearch from '../../components/search/AutoSearch.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    components:{
        AppHeader,
        CategoryCard,
        AutoSearch
    },
    data(){
        return{

        }
    },

    computed:{
        ...mapGetters({
            products: 'products/getAll'
        }),
    },

    methods: {

    },



}
</script>

<style  scoped>

</style>
