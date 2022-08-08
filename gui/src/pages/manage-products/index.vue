<template>
  <q-page-container class="full-height window-height">
    <q-drawer :width="400" show-if-above side="left">
      <q-scroll-area class="fit bg-teal-1 q-py-sm">
        <q-list dense padding>
          <template v-for="(product, pos) in products">
            <q-item
              :key="pos"
              v-ripple
              :class="{ 'bg-teal-6': isSelected(product), 'text-white': isSelected(product), 'text-bold': isSelected(product) }"
              clickable
            >
              <q-item-section @click="routeTo(product.id)">
                <q-item-label>
                  {{ getManufacturerName(product.manufacturerId)?.name }}&nbsp;{{ product.name }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator :key="pos + '-sep'" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <router-view />
  </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'products/getAll',
      manufacturers: 'manufacturers/getAll',
    }),
  },

  methods: {
    isSelected( product ) {
      return this.$route.params.id && product
        ? parseInt(product.id) === parseInt(this.$route.params.id)
        : false
    },
    getManufacturerName( manufacturerId ) {
      return this.manufacturers.find(( { id } ) => id === manufacturerId)
    },
    routeTo( id ) {
      this.$router.push({
        name: 'manage-product',
        params: { id },
      })
    },
  },
}
</script>
