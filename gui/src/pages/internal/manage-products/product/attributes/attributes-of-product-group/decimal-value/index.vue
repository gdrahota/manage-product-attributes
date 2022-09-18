<template>
  <q-select
    v-if="attributeAndValues"
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
      return this.getById(this.attribute.attrId)
    },
    options() {
      let mapFn = v => ({
        ...v,
        value: `${ this.$root.$options.filters.number(v.value, this.getById(this.attribute.attrId).fractionalDigits || 0) } ${ this.unit }`,
      })

      return this.attributeAndValues.values.map(mapFn)
    },
  },

  methods: {
    select( value ) {
      if ( value ) {
        this.$emit('select', this.attributeAndValues.values.find(( { id } ) => id === value.id))
      } else {
        this.$emit('remove', this.attribute.attrId)
      }
    },
    addNewValue( newValue, done ) {
      const foundValue = this.options.find(( { value } ) => value.trim() === newValue.trim())

      if ( !foundValue ) {
        this.$emit('createAndAddValue', {
          decimalValue: parseFloat(newValue),
          attrId: this.attribute.attrId,
        })
      } else {
        done(foundValue)
      }
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
    unit: {
      type: String,
      default: '',
    },
  },
}
</script>
