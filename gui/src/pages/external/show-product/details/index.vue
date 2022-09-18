<template>
  <q-card flat>
    <q-card-section>
      <div class="row">
        <div class="col">
          <attributes
              v-for="productGroup of productGroups"
              :key="productGroup.id"
              :product="product"
              :product-group="productGroup"
              class="q-mb-md"
          />
        </div>

        <div class="col">
          <files :files="product.files" />
        </div>
      </div>

      <q-field
          label="Description"
          outlined
          stack-label
      >
        <template v-slot:control>
          <div v-html="product.description" />
        </template>
      </q-field>
    </q-card-section>
  </q-card>
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
