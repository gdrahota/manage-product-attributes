<template>
  <div>
    <div
      class="col-12"
      v-for="(attributeGroup, pos) in attributeGroups"
      :key="attributeGroup.id"
      :class="{'bg-grey-2': (parseInt(pos))%2 === 0}"
    >
      <attribute-group
        :product="product"
        :attribute-group="attributeGroup"
        :product-group-id="productGroup.id"
      />
    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import {sortByPosition} from '@/sorters'
import DecimalValue from './attribute-group/product-attribute/decimal-value'
import TextValue from './attribute-group/product-attribute/text-value'
import AttributeGroup from './attribute-group'

export default {
  components: {
    AttributeGroup
  },

  computed: {
    ...mapGetters({
      getAttributeGroups: 'productAttributeGroupsOfProductGroups/getByProductGroupId',
    }),
    attributeGroups() {
      return this.getAttributeGroups(this.productGroup.id)
    },
    attributes() {
      return Object.values(this.productGroup.attributes).sort(sortByPosition)
    },
  },

  methods: {
    getProductAttributeValue(attr) {
      const attrValue = this.product.attributeValues.find(({attrId}) => attrId === attr.attrId)
      return attrValue || {id: null, values: []}
    },
    getComponent(type) {
      switch (type) {
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
