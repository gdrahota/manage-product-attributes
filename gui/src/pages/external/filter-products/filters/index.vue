<template>
  <q-btn-dropdown
    v-model="dropDownState"
    :label="dropDownLabel"
    align="left"
    class="full-width text-black q-py-sm text-body1 bg-deep-orange-1"
    content-class="bg-white"
    outline
    icon="mdi-filter"
    no-caps
  >
    <div class="row">
      <q-card
        v-for="(group, key) of productAttrGroups"
        :key="key"
        class="col-6 q-pt-md"
        flat
      >
        <q-card-section class="q-py-none">
          <div class="text-h6">{{ group.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
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

    <q-separator />

    <div class="flex">
      <q-btn
        :color="filters.length === 0 ? 'grey' : 'brown'"
        :disable="filters.length === 0"
        class="q-ma-md flex-block"
        label="Apply Filter"
        style="margin-top: 13px"
        @click="filter"
      />

      <div class="flex-block">
        <q-checkbox
          v-model="closeFilterDialog"
          class="q-py-md"
          color="grey"
          label="Close after filtering"
        />
      </div>
    </div>
  </q-btn-dropdown>
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
      'getAttrGroupsByProductGroupId': 'productAttributeGroupsOfProductGroups/getByProductGroupId',
      'getAttributeById': 'productAttributes/getById',
      'getProductGroupById': 'productGroups/getById',
      'getFilters': 'productSearch/getFilters',
    }),
    filters() {
      return this.getFilters
    },
    dropDownLabel() {
      return this.filters.length > 0
        ? `${ this.filters.length } product filters set`
        : 'Select ...'
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
            'unit': representationUnit,
          }
        })

        return {
          ...attrGroup,
          attributes,
        }
      })
    },
  },

  data: () => ({
    dropDownState: false,
    closeFilterDialog: true,
  }),

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
    filter() {
      this.$emit('filter')

      if ( this.closeFilterDialog ) {
        this.dropDownState = false
      }
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
