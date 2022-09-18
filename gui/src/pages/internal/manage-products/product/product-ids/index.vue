<template>
  <div class="row q-mb-lg">
    <div class="col-2 q-pr-sm">
      <manufacturer-product-id
        :manufacturer-product-id="workingCopy.manufacturerProductId"
        @set="setManufacturerProductId"
      />
    </div>
    <div class="col-2 q-pr-sm">
      <ean-code
        :ean-code="workingCopy.eanCode"
        @set="setEanCode"
      />
    </div>
  </div>
</template>

<script>
import EanCode from './ean-code'
import ManufacturerProductId from './manucaturer-product-id'

export default {
  components: {
    EanCode,
    ManufacturerProductId,
  },

  methods: {
    setManufacturerProductId( data ) {
      this.workingCopy.manufacturerProductId = data
    },
    setEanCode( data ) {
      this.workingCopy.eanCode = data
    },
  },

  props: {
    workingCopy: {
      type: Object,
      required: true,
    },
  },
}
</script>
