<template>
  <div class="q-px-none">
    <div>
      <div class="row full-width">
        <div class="col-12">
          <product-group
            :product="product"
            :product-group="productGroups[0]"
            class="q-mb-md q-pl-none"
            style="width: 100%"
          />
        </div>

        <div class="row">
          <files :files="product.files"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGroup from './product-group'
import Files from './files'

export default {
  components: {
    ProductGroup,
    Files,
  },

  props: {
    productGroups: {
      type: Array,
      default: () => ([]),
    },
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>
