<template>
  <q-page-container>
    <q-page>
      <div class="row q-pa-lg">
        <div class="col-10">
          <div class="row justify-center">
            <div class="col-3">
              <div>
                <img src="../../assets/1.jpg" />
              </div>
            </div>
            <div class="cols-9">
              {{ product }}
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  data(){
    return{
      productId: null
    }
  },
  computed: {
    ...mapGetters({
      getProduct: 'products/getById'
    }),
    product(){
      return this.getProduct(this.productId)
    }
  },
  mounted() {
    this.productId = parseInt(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
