<template>
  <q-layout view="hHh lpR fFf">
    <app-header></app-header>
    <q-page-container>
        <q-page class="">
            <div style="height:280px" class="column bg-primary justify-center items-center">
                <div class="row justify-baseline items-baseline">
                    <p class="text-subtitle-1 text-white q-pr-md">Find anything solar here</p>
                </div>
                <auto-search></auto-search>
                <!-- <div class="q-pt-lg row justify-center">
                    <div v-for="(category, index) in categories" :key="index">
                        <q-chip clickable style="background:linear-gradient(to right, #36454F, #71797E)" @click="searchCategory(category)" class="chip q-mx-md text-white text-subtitle-1" icon="directions">
                            {{category}}
                        </q-chip>
                    </div>
                </div> -->
            </div>

            <div class="row justify-center">
                <div class="col-9">
                    <div class="row q-pa-lg justify-center">
                        <div class="row">
                            <div class="col-2">
                                <categories-card></categories-card>
                            </div>
                            <div class="col-10">
                                <div class="row">
                                    <div v-for="(product, index) in products" class=" " :key="index">
                                    <product-card :product="product"></product-card>
                                </div>
                                </div>
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
import ProductCard from '@/components/products/ProductCard.vue'
import CategoriesCard from '@/components/products/CategoriesCard'
import AutoSearch from '../../components/search/AutoSearch.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    components:{
        AppHeader,
        ProductCard,
        CategoriesCard,
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
        searchCategory(category){
            console.log(category)

        }
    },



}
</script>

<style  scoped>
   
</style>