<template>
  <table>
    <thead>
      <tr>
        <th
          scope="col"
          class="text-left"
        >
          Product Attribute
        </th>
        <th
          scope="col"
          class="text-right"
        >
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(attr, pos) of attributes"
        :key="pos"
        :class="{'bg-grey-2': (parseInt(pos))%2 === 0}"
      >
        <td class="text-weight-bold">
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
    dimensions() {
      let dims = []
      let others = []
      for (const attr in this.attributes) {

      }
      return dims
    }
  },

  methods: {
    getProductAttributeValue( attr ) {
      const attrValue = this.product.attributeValues.find(( { attrId } ) => attrId === attr.attrId)
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
  border-radius: 15px

  th
    color: lightslategrey
    background-color: #fff

  td
    color: #444

  td, th
    border-top: 1px solid #ededed
    border-right: 1px solid #ededed
    padding: 5px 10px

  td:first-child, th:first-child
    border-left: 1px solid #ededed

  tr:last-child
    td
      border-bottom: 1px solid #ededed
</style>
