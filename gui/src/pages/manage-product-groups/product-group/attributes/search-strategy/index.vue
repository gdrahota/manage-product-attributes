<template>
  <q-select
    :options="options"
    :value="value"
    dense
    emit-value
    filled
    map-options
    options-dense
    stack-label
    @input="setValue"
  />
</template>

<script>
export default {
  computed: {
    options() {
      return Object.freeze([
          { label: 'Exact Match (=)', value: 'EQ', forTypes: [ 'decimal', 'text', 'boolean' ] },
          { label: 'Between', value: 'BETWEEN', forTypes: [ 'decimal' ] },
          { label: '>', value: 'GT', forTypes: [ 'decimal' ] },
          { label: '>=', value: 'GTE', forTypes: [ 'decimal' ] },
          { label: '<', value: 'LT', forTypes: [ 'decimal' ] },
          { label: '<=', value: 'LTE', forTypes: [ 'decimal' ] },
          { label: 'Starts with', value: 'STARTS_WITH', forTypes: [ 'text' ] },
          { label: 'Contains', value: 'CONTAINS', forTypes: [ 'text' ] },
        ].filter(( { forTypes } ) => forTypes.includes(this.type)),
      )
    },
  },

  methods: {
    setValue( value ) {
      this.$emit('set', value)
    },
  },

  props: {
    value: {
      type: String,
      default: 0,
    },
    type: {
      type: String,
      default: 'anything',
    },
  },
}
</script>
