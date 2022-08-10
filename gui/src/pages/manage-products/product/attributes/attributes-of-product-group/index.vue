<template>
  <table>
    <thead>
      <tr>
        <th>Product Property</th>
        <th>Value</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(attr, pos) of attributes"
        :key="pos"
      >
        <td>
          {{ getById(attr.attrId).name }} ({{ getById(attr.attrId).unit }})
        </td>
        <td style="padding: 0">
          <component
            :is="getComponent(getById(attr.attrId).type)"
            :attribute="attr"
            :attribute-value="getProductAttributeValue(attr)"
            :unit="getById(attr.attrId).unit"
            @createAndAddValue="createAndAddValue"
            @remove="removeProductAttributeValue"
            @select="selectProductAttributeValue"
          />
        </td>
        <td>
          {{ getById(attr.attrId).description }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import DecimalValue from './decimal-value'
import TextValue from './text-value'
import { sortByPosition } from '@/sorters'

export default {
  components: {
    DecimalValue,
  },

  computed: {
    ...mapGetters({
      getById: 'productAttributes/getById',
    }),
    attributes() {
      return Object.values(this.productGroup.attributes).sort(sortByPosition)
    },
  },

  methods: {
    getProductAttributeValue( attr ) {
      const attrValue = this.product.attributeValue.find(( { attrId } ) => attrId === attr.attrId)
      return attrValue || { id: null, values: [] }
    },
    selectProductAttributeValue( value ) {
      this.$emit('selectProductAttributeValue', value)
    },
    removeProductAttributeValue( value ) {
      this.$emit('removeProductAttributeValue', value)
    },
    createAndAddValue( attrValueId ) {
      this.$emit('createAndAddValue', attrValueId)
    },
    getComponent( type ) {
      switch ( type ) {
        case 'decimal':
          return DecimalValue
        case 'text':
        default:
          return TextValue
      }
    },
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    productGroup: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
table
  border-spacing: 0

  th
    color: teal
    background-color: #fff

  td
    color: #444

  td, th
    border-top: 1px solid #ccc
    border-right: 1px solid #ccc
    padding: 5px 10px

  td:first-child, th:first-child
    border-left: 1px solid #ccc

  tr:last-child
    td
      border-bottom: 1px solid #ccc
</style>
