<template>
  <div>
    <div
      class="row"
      v-for="(attributeGroup, pos) in attributeGroups"
      :key="attributeGroup.id"
      :class="{'bg-grey-2': (parseInt(pos))%2 === 0}"
    >
      <div class="col">
        {{attributeGroup.name}}
      </div>
      <div class="col">
        <div
          class="col"
          v-for="attribute in attributeGroup.attributes"
          :key="attribute.id"
        >
          <div class="" v-for="att in attributes" :key="att.id">
            <div class="row" v-if="att.attrId === attribute.attrId">
              <div class="col">{{getById(att.attrId).name}}</div>
              <attribute-group
                class="col"
                :product-group="productGroup"
                :attribute="att"
                :product="product"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { sortByPosition } from '@/sorters'

import DecimalValue from './decimal-value'
import TextValue from './text-value'
import AttributeGroup from './attribute-groups'

export default {
  components: {
    AttributeGroup
  },

  computed: {
    ...mapGetters({
      getById: 'productAttributes/getById',
      getAttributeGroups: 'productAttributeGroupsOfProductGroups/getByProductGroupId',

    }),
    attributeGroups(){
      const FIRST_PRODUCT_GROUP = 0
      return this.getAttributeGroups(this.product.productGroups[ FIRST_PRODUCT_GROUP ].id)
    },
    attributes() {
      return Object.values(this.productGroup.attributes).sort(sortByPosition)
    },
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
