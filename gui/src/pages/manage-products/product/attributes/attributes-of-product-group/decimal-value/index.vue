<template>
  <q-select
    :options="options"
    :value="attributeValue.id"
    clearable
    dense
    filled
    input-debounce="0"
    map-options
    new-value-mode="add-unique"
    option-label="value"
    option-value="id"
    square
    use-input
    @input="select"
    @new-value="addNewValue"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getById: 'productAttributes/getById',
    }),
    attributeAndValues() {
      return this.getById(this.attribute.id)
    },
    options() {
      let mapFn = v => ({
        ...v,
        value: `${ this.$root.$options.filters.number(v.value) } ${ this.attribute.unit }`,
      })

      switch ( this.attribute.type ) {
        case 'decimal':
          return this.attributeAndValues.values.map(mapFn)
        default:
          return this.attributeAndValues.values
      }
    },
  },

  methods: {
    select( value ) {
      if ( value ) {
        this.$emit('select', this.attributeAndValues.values.find(( { id } ) => id === value.id))
      } else {
        this.$emit('remove', this.attribute.id)
      }
    },
    addNewValue( value ) {
      this.$emit('createAndAddValue', {
        decimalValue: value,
        attrId: this.attribute.id,
      })
    },
  },

  props: {
    attribute: {
      type: Object,
      required: true,
    },
    attributeValue: {
      default: null,
    },
  },
}
</script>
