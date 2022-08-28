<template>
  <tr>
    <td class="q-pr-xs q-pl-sm text-body2">
      {{ productAttribute.name }}:
    </td>
    <td>
      {{ formattedValue }}
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    formattedValue() {
      switch ( this.productAttribute.type ) {
        case 'decimal': {
          const { fractionalDigits, representationUnitFactor } = this.productGroupAttribute
          const numValue = this.$root.$options.filters.number(this.valueObj.value * representationUnitFactor, fractionalDigits)
          return `${ numValue } ${ this.productGroupAttribute.representationUnit }`
        }

        case 'text':
        default:
          return this.valueObj.value
      }
    },
  },

  props: {
    productAttribute: {
      type: Object,
      required: true,
    },
    productGroupAttribute: {
      type: Object,
      required: true,
    },
    valueObj: {
      default: null,
    },
  },
}
</script>
