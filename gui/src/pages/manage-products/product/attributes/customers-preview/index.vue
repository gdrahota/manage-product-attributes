<template>
  <table>
    <thead>
      <tr>
        <th>Product Property</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(attr, pos) of attributes"
        :key="pos"
      >
        <td>
          {{ getById(attr.attrId).name }}
        </td>
        <td style="padding: 0">
          <component
            :is="getComponent(getById(attr.attrId).type)"
            :attribute="attr"
            :attribute-value="getProductAttributeValue(attr)"
            :product-group="productGroup"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortByPosition } from '@/sorters'

import DecimalValue from './decimal-value'
import TextValue from './text-value'

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
