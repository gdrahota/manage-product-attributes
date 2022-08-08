<template>
  <table>
    <thead>
      <tr>
        <th>Item Property</th>
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
          {{ attr.name }}
        </td>
        <td style="padding: 0">
          <decimal-value
            :attribute="attr"
            :attribute-value="getProductAttributeValue(attr)"
            @createAndAddValue="createAndAddValue"
            @remove="removeProductAttributeValue"
            @select="selectProductAttributeValue"
          />
        </td>
        <td>
          {{ attr.description }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import DecimalValue from './decimal-value'
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
      const attrValue = this.product.attributeValue.find(( { attrId } ) => attrId === attr.id)
      return attrValue || { id: null, value: { id: null } }
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
