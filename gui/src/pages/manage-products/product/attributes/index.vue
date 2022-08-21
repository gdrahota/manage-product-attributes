<template>
  <div>
    <q-tabs
      v-model="tab"
      align="left"
      class="bg-teal text-white"
      indicator-color="orange"
    >
      <q-tab
        v-for="(pg, pos) of productGroups"
        :key="pg.id"
        :label="pg.name"
        :name="pos"
      />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      class="bg-grey-2"
      swipeable
      transition-next="jump-up"
      transition-prev="jump-up"
      vertical
    >
      <q-tab-panel
        v-for="(pg, pos) of productGroups"
        :key="pg.id"
        :name="pos"
      >
        <div class="row">
          <div class="col q-pr-xs">
            <attributes-of-product-group
              :product="product"
              :product-group="pg"
              @createAndAddValue="obj => createAndAddValue(pg.id, obj)"
              @removeProductAttributeValue="removeProductAttributeValue"
              @selectProductAttributeValue="selectProductAttributeValue"
            />
          </div>
          <div class="col q-pl-xs">
            <customers-preview
              :product="product"
              :product-group="pg"
              @createAndAddValue="obj => createAndAddValue(pg.id, obj)"
              @removeProductAttributeValue="removeProductAttributeValue"
              @selectProductAttributeValue="selectProductAttributeValue"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import AttributesOfProductGroup from './attributes-of-product-group'
import CustomersPreview from './customers-preview'

export default {
  components: {
    AttributesOfProductGroup,
    CustomersPreview,
  },

  computed: {
    attributes() {
      return Object.values(this.product.attributes)
    },
  },

  data: () => ({
    tab: 0,
  }),

  methods: {
    selectProductAttributeValue( value ) {
      this.$emit('selectProductAttributeValue', value)
    },
    removeProductAttributeValue( value ) {
      this.$emit('removeProductAttributeValue', value)
    },
    createAndAddValue( productGroupId, attrValue ) {
      this.$emit('createAndAddValue', {
        productGroupId,
        attrValue,
      })
    },
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    productGroups: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>
