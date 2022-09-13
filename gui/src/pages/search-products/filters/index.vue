<template>
  <div id="product-filter">
    <q-card
      v-for="(group, key) of productAttrGroups"
      :key="key"
      :class="{ 'border-top': key > 0, 'q-pt-md': key > 0 }"
      class="col-6"
      flat
    >
      <q-card-section class="q-py-none">
        <div class="text-h6">{{ group.name }}</div>
      </q-card-section>

      <q-card-section
        class="q-pt-none"
      >
        <div
          v-for="(attribute, attrId) of group.attributes"
          :key="attrId"
        >
          <div class="row q-py-md">
            <div class="col-4">
              <q-field
                borderless
                dense
              >
                <template v-slot:control>
                  <div class="q-px-sm" style="text-align: right; width: 100%">
                    <span class="text-body2">{{ attribute.name }}:</span>
                  </div>
                </template>
              </q-field>
            </div>
            <div class="col-8">
              <component
                :is="getComponent(attribute.searchStrategy)"
                :attributeDef="attribute"
                :filter="filters.find(filter => attribute.id === filter.attrId) || {}"
                :values="attribute.values"
                @set="data => setFilter(attribute, data)"
              />
            </div>
          </div>
        </div>

      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import { EnumSearchStrategy } from '@/store/enums/search-strategy'
import Between from './between'
import Equal from './equal'
import LessThanEqual from './less-than-equal'

export default {
  computed: {
    ...mapGetters({
      getAttrGroupsByProductGroupId: 'productAttributeGroupsOfProductGroups/getByProductGroupId',
      getAttributeById: 'productAttributes/getById',
      getProductGroupById: 'productGroups/getById',
      getFilters: 'productSearch/getFilters',
    }),
    filters() {
      return this.getFilters
    },
    productAttrGroups() {
      const productGroup = this.getProductGroupById(this.productGroupId)

      if ( !productGroup ) {
        return []
      }

      return this.getAttrGroupsByProductGroupId(this.productGroupId).map(attrGroup => {
        const attributes = attrGroup.attributes.map(( { position, attrId } ) => {
          const baseAttr = this.getAttributeById(attrId)

          const { fractionalDigits, productGroupId, representationUnit, representationUnitFactor, searchStrategy } =
            productGroup.attributes.find(a => a.attrId === attrId)

          return {
            ...baseAttr,
            position,
            fractionalDigits,
            productGroupId,
            representationUnitFactor,
            searchStrategy,
            unit: representationUnit,
          }
        })

        return {
          ...attrGroup,
          attributes,
        }
      })
    },
  },

  methods: {
    ...mapMutations({
      SET_FILTER: 'productSearch/SET_FILTER',
    }),
    getComponent( searchStrategy ) {
      switch ( searchStrategy ) {
        case EnumSearchStrategy.BETWEEN:
          return Between
        case EnumSearchStrategy.EQUAL:
          return Equal
        case EnumSearchStrategy.LTE:
          return LessThanEqual
        default:
          console.error(`Unknown search strategy: "${ searchStrategy }"`)

          return null
      }
    },
    setFilter( attr, data ) {
      this.SET_FILTER({
        attrId: attr.id,
        searchStrategy: attr.searchStrategy,
        productValueType: attr.type,
        ...data,
      })
    },
  },

  props: {
    productGroupId: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="sass">
#product-filter
  .border-top
    border-top: 1px dotted #ddd
</style>
