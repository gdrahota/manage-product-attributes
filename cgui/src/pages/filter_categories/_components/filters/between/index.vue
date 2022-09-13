<template>
  <div class="row q-px-none">
    <div class="col-md-5 col-sm-12">
      <q-select
        :input-style="{fontSize: '8px'}"
        v-model="valueFrom"
        :options="optionsFrom"
        clearable
        dense
        style="border-radius: 5px; background-color: #f2f9fd"
        class="q-pl-sm"
        hide-bottom-space
        label="from"
        option-label="formatted"
        options-dense
        borderless
      />
    </div>
    <q-space />
    <div class="col-md-5 col-sm-12">
      <q-select
        v-model="valueTill"
        :options="optionsTill"
        clearable
        dense
        style="border-radius: 5px; background-color: #f2f9fd"
        hide-bottom-space
        class="q-pl-sm"
        label="to"
        option-label="formatted"
        options-dense
        borderless
      />
    </div>
  </div>
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
      const { representationUnitFactor, unit, id, fractionalDigits } = this.attributeDef
      const options = this.getAttrValuesByAttrId(id).map(v => ({
          ...v,
          value: v.value * representationUnitFactor,
          formatted: `${ this.$root.$options.filters.number(v.value * representationUnitFactor, fractionalDigits) } ${ unit }`,
          unit,
        }),
      )

      return uniqueByKey(options, 'value').sort(sortByValue)
    },
    optionsFrom() {
      if ( !this.valueTill ) {
        return this.options
      }

      return this.options.filter(o => o.value <= this.valueTill.value)
    },
    optionsTill() {
      if ( !this.valueFrom ) {
        return this.options
      }

      return this.options.filter(o => o.value >= this.valueFrom.value)
    },
    valueFrom: {
      get() {
        return this.filter.valueFrom || null
      },
      set( valueFrom ) {
        this.$emit('set', {
          ...this.filter,
          valueFrom,
        })
      },
    },
    valueTill: {
      get() {
        return this.filter.valueTill || null
      },
      set( valueTill ) {
        this.$emit('set', {
          ...this.filter,
          valueTill,
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
