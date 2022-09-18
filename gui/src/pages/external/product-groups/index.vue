<template>
  <q-list class="bg-grey-7 text-white" style="height: calc(100vh -  50px)">
    <q-item
      v-for="(productGroup, pos) of productGroups"
      :key="pos"
      :class="{ active: isSelected( productGroup ) }"
      :to="getRoute( productGroup )"
    >
      <q-item-section class="text-body1 text-white">
        <div :style="{ 'width': (widthInPx - 70)+'px' }" class="ellipsis">
          {{ productGroup.name }}
        </div>
      </q-item-section>

      <q-item-section class="text-white" side top>
        <q-icon v-if="isSelected( productGroup )" class="q-mt-xs" name="mdi-arrow-right" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getAll: 'productGroups/getAll',
    }),
    productGroups() {
      return this.getAll
    },
    productGroupId() {
      return this.$route.params.id
        ? parseInt(this.$route.params.id)
        : null
    },
  },

  methods: {
    isSelected( productGroup ) {
      return this.productGroupId && productGroup
        ? parseInt(productGroup.id) === this.productGroupId
        : false
    },
    getRoute( productGroup ) {
      return {
        name: 'product-group',
        params: {
          id: productGroup.id,
        },
      }
    },
  },

  props: {
    widthInPx: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="sass">
.q-tab__content.self-stretch.flex-center
  width: 100%
  align-items: initial

.q-tab__label
  text-align: left

.q-tab.active
  color: white
</style>
