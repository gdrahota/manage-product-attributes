<template>
  <div class="row">
    <div 
      class="col-4 text-weight-bolder"
      style="padding-top: 3px"
    >
      {{ attributeGroup.name }}
    </div>
    <div
      v-for="attribute of attributeGroup.attributes"
      :key="attribute.id"
      class="row"
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
