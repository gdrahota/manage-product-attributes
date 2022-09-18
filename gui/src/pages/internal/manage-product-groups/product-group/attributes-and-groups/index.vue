<template>
  <div>
    <q-tabs
      v-model="tab"
      :breakpoint="0"
      align="left"
      class="bg-teal text-white"
      indicator-color="yellow"
    >
      <q-tab name="attributes">Attributes</q-tab>
      <q-tab name="attributeGroups">Attribute Groups</q-tab>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="border-all">
      <q-tab-panel name="attributes">
        <attributes
          :attributes="productGroup.attributes"
          :product-group-id="productGroup.id"
          class="q-pb-lg"
        />
      </q-tab-panel>

      <q-tab-panel name="attributeGroups">
        <groups
          :attribute-groups="attributeGroups"
          :product-group-id="productGroup.id"
          class="q-pb-lg"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import Attributes from './attributes'
import Groups from './groups'

export default {
  components: {
    Attributes,
    Groups,
  },

  data: () => ({
    tab: 'attributes',
  }),

  props: {
    productGroup: {
      type: Object,
      required: true,
    },
    attributeGroups: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
.border-all
  border: 1px solid #ddd
</style>
