<template>
  <q-layout view="hHh lpR fFf">
    <app-header ></app-header>
    <q-page-container>
        <q-page class="">
            <div class="row justify-center q-pa-sm">
                <div class="col-9">
                    <div class="row">
                        <div class="col-3">
                            <div class="row">
                                <div style="height:40px; width: 100%;">
                                    <p class="q-pa-sm text-subtitle-2 text-white bg-primary">Filter Categories</p>
                                </div>
                                <filters
                                    :product-group-id="selectedProductGroupId"
                                    @searchProducts="searchProducts"
                                />
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="">
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

  </q-layout>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import Filters from './_components/filters/index.vue'
import ProductCard from '@/components/products/ProductCard.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'index',
    components: {
        AppHeader,
        Filters,
        ProductCard
    },

    computed: {
        ...mapGetters({
            products: 'productSearch/getProducts',
            getAllProductGroups: 'productGroups/getAll',
        }),
        selectedProductGroupId() {
            return parseInt(this.$route.params.id)
        },
    },

    methods: {
        ...mapActions({
            searchProducts: 'productSearch/search',
        }),
        search( { productGroupId, filters } ) {
            this.searchProducts({ productGroupId, filters, page: 1, itemsPerPage: 10 })
        },
    },

    mounted(){
        
    },

    created() {
        this.search({ productGroupId: this.selectedProductGroupId, filters: [] })
    },

    watch: {
        selectedProductGroupId() {
            this.search({
                productGroupId: this.selectedProductGroupId,
                filters: [],
            })
        },
    },

}
</script>

<style>

</style>