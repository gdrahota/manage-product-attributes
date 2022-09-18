<template>
  <q-field
    v-if="attributeAndValues"
    class="full-width"
    dense
    filled
    square
  >
    <template v-slot:control>
      <div class="full-width text-right">{{ formattedValue }}</div>
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
      if ( this.attributeValue.value === undefined ) {
        return ''
      }

      const { fractionalDigits, representationUnitFactor, representationUnit } = this.attribute
      const formattedValue = this.$root.$options.filters.number(this.attributeValue.value * representationUnitFactor, fractionalDigits || 0)
      return `${ formattedValue } ${ representationUnit }`
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
