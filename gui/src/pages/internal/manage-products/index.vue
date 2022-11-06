<template>
  <q-page-container class="full-height window-height">
    <q-splitter
      v-model="splitter"
      style="height: calc(100vh - 48px)"
      unit="px"
    >
      <template v-slot:before>
        <q-scroll-area class="fit border-right bg-teal-1">
          <div class="q-pl-md q-pr-md q-pb-md">
            <q-btn
              color="secondary"
              icon="add"
              label="new"
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
              style="height: calc(100vh - 240px); overflow-y: auto"
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
                      <div :style="{ width: `${splitter - 70}px` }" class="truncate">
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

            <q-pagination
              v-if="numberOfItems > 20"
              v-model="page"
              :max="Math.ceil(numberOfItems / 20)"
              :max-pages="4"
              active-color="accent"
              class="q-my-sm"
              color="accent"
              input
              input-class="text-orange-10"
              unelevated
              @input="setPage"
            />
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
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters( {
      getPage: 'products/getPage',
      getNumberOfItems: 'products/getNumberOfItems',
      manufacturers: 'manufacturers/getAll',
      getAllProductGroups: 'productGroups/getAll',
      getProductGroupById: 'productGroups/getById',
    } ),
    productGroups() {
      return this.getAllProductGroups
    },
    products() {
      return this.getPage
    },
    numberOfItems() {
      return this.getNumberOfItems
    },
    productGroup() {
      return this.$route.params.productGroupId
        ? this.getProductGroupById( this.$route.params.productGroupId )
        : null
    },
  },

  created() {
    this.loadPage( this.$route.params.productGroupId )
  },

  data: () => ( {
    splitter: 300,
    page: 1,
  } ),

  methods: {
    ...mapActions( {
      loadPageAction: 'products/loadPage',
    } ),
    loadPage( productGroupId ) {
      if ( productGroupId ) {
        this.loadPageAction( {
          productGroupId,
          page: 1,
          itemsPerPage: 20,
        } )
      }
    },
    setPage( page ) {
      this.loadPageAction( {
        productGroupId: this.$route.params.productGroupId,
        page: page,
        itemsPerPage: 20,
      } )
    },
    isSelected( product ) {
      return this.$route.params.id && product
        ? parseInt( product.id ) === parseInt( this.$route.params.id )
        : false
    },
    setProductGroup( productGroup ) {
      this.$router.push( {
        name: 'manage-products',
        params: {
          productGroupId: productGroup?.id,
          id: undefined,
        },
      } )

      this.loadPage( productGroup.id )
    },
    routeToProduct( id ) {
      this.$router.push( {
        name: 'manage-product',
        params: {
          productGroupId: this.productGroup.id,
          id,
        },
      } )
    },
  },

  updated() {
    this.loadPage( this.$route.params.productGroupId )
  },
}
</script>

<style lang="sass" scoped>
.truncate
  white-space: nowrap
  overflow-x: hidden
  text-overflow: ellipsis
</style>
