<template>
    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between">

        <q-parallax
          :height="1500"
          style="background-size: contain"
        >
          <template v-slot:media>
            <img
              style="opacity: 0.05; background-position: center; background-size: contain"
              src="../../assets/solar.jpg"
            />
          </template>
          <q-page-container>
            <q-page class="">
              <div class="banner column justify-center items-center">
                <div class="row justify-baseline items-baseline">
                  <p class="text-subtitle-1 text-accent text-weight-bolder q-pr-md">Find anything solar here</p>
                </div>
                <auto-search></auto-search>
              </div>

              <div class="row justify-center">
                <div class="col-12">
                  <div class="row q-pa-lg justify-center items-center text-center" style="height:300px"
                       v-if="products.length === 0">
                    <q-spinner-cube
                      size="100"
                      color="primary"
                    />
                  </div>
                  <div v-else class="row q-pa-lg full-width justify-center items-center text-start">
                    <div class="text-center">
                      <div class="q-pt-lg text-h6 text-accent">Browse Our Popular Categories And Filter Products Below</div>
                      <category-card></category-card>
                    </div>
                  </div>
                </div>
              </div>
            </q-page>
          </q-page-container>
        </q-parallax>
      </div>
    </div>
</template>

<script>
import CategoryCard from '@/components/products/categories-card'
import AutoSearch from '../../components/search/auto-search.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    CategoryCard,
    AutoSearch
  },
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      products: 'products/getAll'
    }),
  },

}
</script>

<style lang="sass" scoped>
.banner
  background-blend-mode: difference
  background-size: cover
  background-position: center

  img
    border-radius: 10px
    width: 100%
    height: 100%

  @media only screen and (max-width: 1400px)
    margin-left: 2rem
    margin-right: 2rem

  @media only screen and (max-width: 800px)
    margin-left: 0
    margin-right: 0


.footer
  width: 100%
  height: 300px
  background-color: secondary
  background-repeat: no-repeat
</style>
