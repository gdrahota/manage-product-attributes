<template>
  <q-select
    v-model="value"
    :options="options"
    clearable
    class="q-pl-sm q-ma-none"
    style="border-radius: 5px; background-color: #f2f9fd"
    dense
    :popup-content-style="{backgroundColor: '#ffffff'}"
    onmouseover="this.style.color='#f2f9fd'"
    hide-bottom-space
    option-label="formatted"
    options-dense
    borderless
  />
</template>

<script>
import { mapGetters } from 'vuex'

import { sortByValue } from '@/sorters'

const uniqueByKey = ( arr, prop ) => {
  const values = []
  return arr.reduce(( a, d ) => {
    if ( !values.includes(d[ prop ]) ) {
      values.push(d[ prop ])
      a.push(d)
    }
    return a
  }, [])
}

export default {
  computed: {
    ...mapGetters({
      getAttrValuesByAttrId: 'productSearch/getAttrValuesByAttrId',
    }),
    options() {
      const { representationUnitFactor, unit, fractionalDigits, type, id } = this.attributeDef

      const options = this.getAttrValuesByAttrId(id).map(v => {
        //let formatted = `${ this.$root.$options.filters.number(v.value * representationUnitFactor, fractionalDigits) } ${ unit }`

        return {
          ...v,
          //value: v.value * representationUnitFactor,
          value: v.value,
          formatted: v.value,
          unit,
        }
      })

      return uniqueByKey(options, 'value').sort(sortByValue)
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

  mounted(){

  }
}
</script>
