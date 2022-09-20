<template>
  <q-list
    class="bg-grey-3 text-black"
    style="height: calc(100vh -  50px)"
  >
    <q-item>
      <q-item-section>
        <div class="text-grey-7 text-body2">Product Groups:</div>
      </q-item-section>
    </q-item>
    <q-item
      v-for="(productGroup, pos) of productGroups"
      :key="pos"
      :class="{ 'bg-grey-5': isSelected(productGroup) }"
      :to="getRoute( productGroup )"
    >
      <q-item-section class="text-body1 text-black">
        <div :style="{ 'width': (widthInPx - 70)+'px' }" class="ellipsis">
          {{ productGroup.name }}
        </div>
      </q-item-section>

      <q-item-section
        v-if="isSelected( productGroup )"
        class="text-white"
        side
        top
      >
        <q-icon class="q-mt-xs" name="mdi-arrow-right" />
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
</style>
