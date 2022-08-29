<template>
  <q-field
    v-if="attributeAndValues"
    class="full-width"
    dense
    filled
    square
  >
    <template v-slot:control>
      <div class="full-width text-right">{{ formattedValue }} {{ attribute.representationUnit }}</div>
    </template>
  </q-field>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getById: 'productAttributes/getById',
    }),
    attributeAndValues() {
      return this.getById(this.attribute.attrId)
    },
    formattedValue() {
      const { fractionalDigits, representationUnitFactor } = this.attribute
      return this.$root.$options.filters.number(this.attributeValue.value * representationUnitFactor, fractionalDigits || 0)
    },
  },

  props: {
    attribute: {
      type: Object,
      required: true,
    },
    productGroup: {
      type: Object,
      required: true,
    },
    attributeValue: {
      default: null,
    },
  },
}
</script>
