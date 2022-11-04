<template>
  <div class="column full-width">
    <div class="text-weight-bold full-width">
      {{ productAttribute.name }}
    </div>
    <component
      :is="getComponent(productAttribute.type)"
      :attribute="representationProperties"
      :attribute-value="getProductAttributeValue(representationProperties)"
    />
  </div>
</template>

<script>
import DecimalValue from './decimal-value'
import TextValue from './text-value'
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      getById: 'productAttributes/getById',
      getProductGroupById: 'productGroups/getById'
    }),
    productAttribute() {
      return this.getById(this.attributeId)
    },
    representationProperties() {
      return this.getProductGroupById(this.productGroupId).attributes.find(attribute => attribute.attrId === this.attributeId)
    }
  },

  props: {
    attributeId: {
      type: Number,
      required: true
    },
    product: {
      type: Object,
      required: true
    },
    productGroupId: {
      type: Number,
      required: true
    }
  },

  methods: {
    getProductAttributeValue(attr) {
      const attrValue = this.product.attributeValues.find(({attrId}) => attrId === attr.attrId)
      return attrValue || {id: null, values: []}
    },
    getComponent(type) {
      switch (type) {
        case 'decimal':
          return DecimalValue
        case 'text':
        default:
          return TextValue
      }
    },
  },
}
</script>

<style scoped>

</style>
