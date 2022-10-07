<template>
  <q-btn
    :label="dropDownLabel"
    :color="dropDownState ? 'grey-4' : 'orange-9'"
    icon="mdi-filter-outline"
    icon-right="mdi-chevron-down"
    no-caps
  >
    <q-menu
      v-model="dropDownState"
    >
      <q-card class="bg-orange-1" style="width: calc(100vw - 350px)">
        <q-card-actions class="bg-orange-2 q-pa-none">
          <q-btn
            :color="haveFiltersBeenChanged ? 'orange-9' : 'grey'"
            :disable="!haveFiltersBeenChanged"
            class="q-ma-md flex-block"
            label="Apply Filter"
            style="margin-top: 13px"
            @click="filter"
          />

          <q-checkbox
            v-model="closeFilterDialog"
            class="q-py-md"
            color="grey"
            label="Close after filtering"
          />
        </q-card-actions>

        <q-separator />

        <div class="row">
          <q-card
            v-for="(group, key) of productAttrGroups"
            :key="key"
            class="col-6 q-pt-md bg-orange-1"
            flat
          >
            <q-card-section class="q-py-none bg-orange-1">
              <show-description :description="group.description" style="top: -3px" />
              <span class="text-h6 q-pt-sm">{{ group.name }}</span>
            </q-card-section>

            <q-card-section class="q-pt-none bg-orange-1">
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
                          <show-description :description="attribute.description" style="top: -1px" />
                          <span class="text-body2">{{ attribute.name }}</span>
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

      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import { EnumSearchStrategy } from '@/store/enums/search-strategy'
import Between from './between'
import Equal from './equal'
import LessThanEqual from './less-than-equal'
import ShowDescription from './show-description'

export default {
  components: {
    ShowDescription,
  },

  computed: {
    ...mapGetters( {
      getAttrGroupsByProductGroupId: 'productAttributeGroupsOfProductGroups/getByProductGroupId',
      getAttributeById: 'productAttributes/getById',
      getProductGroupById: 'productGroups/getById',

      getFilters: 'productSearch/getFilters',
      haveFiltersBeenChanged: 'productSearch/haveFiltersBeenChanged',
    } ),
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
