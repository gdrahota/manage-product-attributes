<template>
  <q-page-container class="full-height window-height">
    <q-drawer :width="400" show-if-above side="left">
      <q-scroll-area class="fit border-right">
        <q-btn
          color="secondary"
          icon="add"
          label="new"
          size="14px"
          style="margin: 10px 5px"
          @click="routeTo('new')"
        />

        <div class="q-pa-md">
          <q-select
            v-model="productGroup"
            :options="productGroups"
            class="bg-indigo-1"
            dense
            filled
            label="Product Group"
            square
          >
            <template v-slot:option="{ opt, itemProps, itemEvents }">
              <q-item v-bind="itemProps" v-on="itemEvents">
                <q-item-section>
                  <q-item-label>{{ opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:selected-item="{ opt }">
              <q-item>
                <q-item-section>
                  <q-item-label>{{ opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-list
            v-if="products.length > 0"
            bordered
            class="q-mt-md- q-pa-none"
            dense
            padding
            separator
          >
            <template v-for="(product, pos) in products">
              <q-item
                :key="pos"
                v-ripple
                :class="{ 'bg-primary': isSelected(product), 'text-white': isSelected(product), 'text-bold': isSelected(product) }"
                clickable
              >
                <q-item-section @click="routeTo(product.id)">
                  <q-item-label>
                    <!--                  {{ product }}-->
                    {{ product.manufacturer.name }}&nbsp;{{ product.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator :key="pos + '-sep'" />
            </template>
          </q-list>
        </div>
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
      getByProductGroupId: 'products/getByProductGroupId',
      manufacturers: 'manufacturers/getAll',
      getAllProductGroups: 'productGroups/getAll',
    }),
    productGroups() {
      return this.getAllProductGroups
    },
    products() {
      return this.productGroup?.id
        ? this.getByProductGroupId(this.productGroup.id)
        : []
    },
  },

  data: () => ({
    productGroup: null,
  }),

  methods: {
    isSelected( product ) {
      return this.$route.params.id && product
        ? parseInt(product.id) === parseInt(this.$route.params.id)
        : false
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

<style lang="sass" scoped>
.border-right
  border-right: 1px solid #ddd
</style>
