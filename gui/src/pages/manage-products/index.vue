<template>
  <q-page-container class="full-height window-height">
    <q-splitter
      v-model="splitter"
      style="height: calc(100vh - 98px)"
      unit="px"
    >
      <template v-slot:before>
        <q-scroll-area class="fit border-right bg-teal-1">
          <div class="q-pl-md q-pr-md q-pb-md">
            <q-btn
              color="secondary"
              icon="add"
              label="new"
              rounded
              size="14px"
              style="margin: 10px 5px"
              @click="routeToProduct('new')"
            />

            <q-select
              :options="productGroups"
              :value="productGroup"
              class="bg-white"
              clearable
              filled
              label="Product Group"
              square
              @input="setProductGroup"
            >
              <template v-slot:option="{ opt, itemProps, itemEvents }">
                <q-item v-bind="itemProps" v-on="itemEvents">
                  <q-item-section>
                    <q-item-label>
                      {{ opt.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:selected-item="{ opt }">
                <q-item dense>
                  <q-item-section>
                    <q-item-label>{{ opt.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-list
              v-if="products.length > 0"
              bordered
              class="q-pa-none"
              dense
              padding
              separator
            >
              <q-separator />
              <template v-for="(product, pos) in products">
                <q-item
                  :key="pos"
                  v-ripple
                  :class="{ 'bg-teal-6': isSelected(product), 'text-white': isSelected(product), 'text-bold': isSelected(product) }"
                  class="bg-white"
                  clickable
                >
                  <q-item-section @click="routeToProduct(product.id)">
                    <q-item-label>
                      <div :style="{ width: `${splitter-70}px` }" class="truncate">
                        {{ product.manufacturer.name }}&nbsp;{{ product.name }}
                      </div>
                      <q-tooltip :delay="500" :offset="[20,0]" anchor="center end" self="center start">
                        <div class="text-body1 text-no-wrap">{{ product.manufacturer.name }}&nbsp;{{ product.name }}</div>
                      </q-tooltip>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator :key="pos + '-sep'" />
              </template>
            </q-list>
          </div>
        </q-scroll-area>
      </template>

      <template v-slot:separator>
        <q-avatar color="grey-5" icon="drag_indicator" size="30px" text-color="white" />
      </template>

      <template v-slot:after>
        <router-view />
      </template>
    </q-splitter>
  </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getByProductGroupId: 'products/getByProductGroupId',
      manufacturers: 'manufacturers/getAll',
      getAllProductGroups: 'productGroups/getAll',
      getProductGroupById: 'productGroups/getById',
    }),
    productGroups() {
      return this.getAllProductGroups
    },
    products() {
      return this.productGroup?.id
        ? this.getByProductGroupId(this.productGroup.id)
        : []
    },
    productGroup() {
      return this.$route.params.productGroupId
        ? this.getProductGroupById(this.$route.params.productGroupId)
        : null
    },
  },

  data: () => ({
    splitter: 300,
  }),

  methods: {
    isSelected( product ) {
      return this.$route.params.id && product
        ? parseInt(product.id) === parseInt(this.$route.params.id)
        : false
    },
    setProductGroup( productGroup ) {
      this.$router.push({
        name: 'manage-products',
        params: {
          productGroupId: productGroup?.id,
          id: undefined,
        },
      })
    },
    routeToProduct( id ) {
      this.$router.push({
        name: 'manage-product',
        params: {
          productGroupId: this.productGroup.id,
          id,
        },
      })
    },
  },
}
</script>

<style lang="sass" scoped>
.truncate
  white-space: nowrap
  overflow-x: hidden
  text-overflow: ellipsis
</style>
