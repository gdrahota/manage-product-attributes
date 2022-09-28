<template>
  <div class="row q-px-sm">
    <div class="col q-pr-xs">
      <q-select
        v-model="valueFrom"
        :options="optionsFrom"
        clearable
        dense
        hide-bottom-space
        label="from"
        option-label="formatted"
        options-dense
        outlined
      />
    </div>
    <div class="col q-pl-xs">
      <q-select
        v-model="valueTill"
        :options="optionsTill"
        clearable
        dense
        hide-bottom-space
        label="to"
        option-label="formatted"
        options-dense
        outlined
      />
    </div>
  </div>
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
      const { representationUnitFactor, unit, id, fractionalDigits } = this.attributeDef

      const options = this.getAttrValuesByAttrId(id).map(v => ({
          ...v,
          value: v.value * representationUnitFactor,
          formatted: `${ this.$root.$options.filters.number(v.value * representationUnitFactor, fractionalDigits) } ${ unit }`,
          unit,
        }),
      )

      return options.sort(sortByValue)
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
