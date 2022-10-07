<template>
  <div class="q-px-none">
    <div>
      <div class="column full-width">
        <div class="row">
          <attributes
            style="width: 100%"
              v-for="productGroup of productGroups"
              :key="productGroup.id"
              :product="product"
              :product-group="productGroup"
              class="q-mb-md q-pl-none"
          />
        </div>

        <div class="row">
          <files :files="product.files" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Attributes from './attributes'
import Files from './files'

export default {
  components: {
    Attributes,
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
