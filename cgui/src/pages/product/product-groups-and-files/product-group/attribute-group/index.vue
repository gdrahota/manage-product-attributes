<template>
  <div>
    <div>{{ attributeGroup.name }}</div>
    <div
      v-for="attribute of attributeGroup.attributes"
      :key="attribute.id"
    >
      <product-attribute
        :product="product"
        :attribute-id="attribute.attrId"
        :product-group-id="productGroupId"
      />
    </div>
  </div>
</template>

<script>
import ProductAttribute from './product-attribute'

export default {
  components: {
    ProductAttribute
  },

  props: {
    attributeGroup: {
      type: Object,
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
  }
}
</script>

<style scoped>

</style>
