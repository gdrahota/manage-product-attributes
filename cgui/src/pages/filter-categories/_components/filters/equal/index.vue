<template>
  <q-select
    v-model="value"
    :options="options"
    clearable
    dense
    hide-bottom-space
    option-label="formatted"
    options-dense
    outlined
  />
</template>

<script>
import { mapGetters } from 'vuex'

import { sortByValue } from '@/sorters'

export default {
  computed: {
    ...mapGetters({
      getAttrValuesByAttrId: 'productSearch/getAttrValuesByAttrId',
    }),
    options() {
      const { representationUnitFactor, unit, fractionalDigits, type, id } = this.attributeDef

      const options = this.getAttrValuesByAttrId(id).map(v => {
        let formatted

        if ( type === 'decimal' ) {
          formatted = `= ${ this.$root.$options.filters.number(v.value * representationUnitFactor, fractionalDigits) } ${ unit }`
        } else {
          formatted = `${ v.value }`
        }

        return {
          ...v,
          value: v.value,
          formatted,
          unit,
        }
      })

      return options.sort(sortByValue)
    },
    value: {
      get() {
        return this.filter.value || null
      },
      set( value ) {
        this.$emit('set', {
          ...this.filter,
          value,
        })
      },
    },
  },

  props: {
    attributeDef: {
      type: Object,
      required: true,
    },
    values: {
      type: Array,
      default: () => ([]),
    },
    filter: {
      type: Object,
      required: true,
    },
  },
}
</script>
