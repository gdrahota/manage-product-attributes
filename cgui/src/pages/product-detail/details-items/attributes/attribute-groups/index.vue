<template>
  <component
    :is="getComponent(getById(attribute.attrId).type)"
    :attribute="attribute"
    :attribute-value="getProductAttributeValue(attribute)"
    :product-group="productGroup"
  />
</template>

<script>
import DecimalValue from './../decimal-value'
import TextValue from './../text-value'
import {mapGetters} from "vuex";

export default {
  name: "index",

  components: {
    DecimalValue,
    TextValue
  },

  computed:{
    ...mapGetters({
      getById: 'productAttributes/getById',
    })
  },

  props:{
    attribute: {
      type: Object,
      required: true
    },

    product: {
      type: Object,
      required: true
    },

    productGroup: {
      type: Object,
      required: true
    }
  },

  methods: {
    getProductAttributeValue( attr ) {
      const attrValue = this.product.attributeValues.find(( { attrId } ) => attrId === attr.attrId)
      return attrValue || { id: null, values: [] }
    },
    getComponent( type ) {
      switch ( type ) {
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
