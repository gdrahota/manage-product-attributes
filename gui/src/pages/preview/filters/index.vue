<template>
  <div>
    <q-card
      v-for="(group, groupId) of productAttrGroups"
      :key="groupId"
      bordered
      class="col-6 q-mb-sm"
      flat
    >
      <q-card-section>
        <div class="text-h6">{{ group.name }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-none">
        <div class="row">
          <div
            v-for="(attribute, attrId) of group.attributes"
            :key="attrId"
            class="col-4"
          >
            <div class="row q-pt-md">
              <div class="col-4">
                <q-field
                  borderless
                  dense
                >
                  <template v-slot:control>
                    <div style="text-align: right; width: 100%">
                      <span class="text-body1">{{ attribute.name }}:</span>&nbsp;&nbsp;<span class="text-caption"></span>
                    </div>
                  </template>
                </q-field>
              </div>
              <div class="col-8">
                <component
                  :is="getComponent(attribute.searchStrategy)"
                  :attributeDef="attribute"
                  :filter="filters[attribute.id] || {}"
                  :values="attribute.values"
                  @set="data => setFilter(attribute, data)"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pt-md">
      <q-btn
        :color="Object.keys(filters).length === 0 ? 'grey' : 'primary'"
        :disable="Object.keys(filters).length === 0"
        label="Filter"
        @click="search"
      />
    </div>
<!--    <pre>{{ filters }}</pre>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    }),
    productAttrGroups() {
      const productGroup = this.getProductGroupById(this.productGroupId)

      if ( !productGroup ) {
        return []
      }

      return this.getAttrGroupsByProductGroupId(this.productGroupId).map(attrGroup => {
        const attributes = attrGroup.attributes.map(( { position, attrId } ) => {
          const baseAttr = this.getAttributeById(attrId)
          const { fractionalDigits, productGroupId, representationUnit, representationUnitFactor, searchStrategy, unit } =
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

  data: () => ({
    filters: {},
  }),

  methods: {
    init() {
      this.filters = {}
    },
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
    setFilter( attribute, data ) {
      this.$set(this.filters, attribute.id, {
        type: attribute.type,
        searchStrategy: attribute.searchStrategy,
        attrId: attribute.id,
        ...data,
      })
    },
    isNullOrUndefined( val ) {
      return val === undefined || val === null
    },
    search() {
      const filters = Object.values(this.filters).map(obj => {
        const response = {
          attrId: obj.attrId,
          productValueType: obj.type,
          searchStrategy: obj.searchStrategy,
        }

        switch ( obj.searchStrategy ) {
          case 'BETWEEN':
            if ( this.isNullOrUndefined(obj.valueFrom) && this.isNullOrUndefined(obj.valueTill) ) {
              return
            }

            if ( !this.isNullOrUndefined(obj.valueFrom) ) {
              response.valueIdFrom = obj.valueFrom.id
            }

            if ( !this.isNullOrUndefined(obj.valueTill) ) {
              response.valueIdTill = obj.valueTill.id
            }
            break

          case 'EQ':
          case 'LT':
          case 'LTE':
          case 'GT':
          case 'GTE':
            if ( this.isNullOrUndefined(obj.value) ) {
              return
            }

            response.valueId = obj.value.id
            break
        }

        return response
      }).filter(i => !!i)

      this.$emit('searchProducts', { productGroupId: this.productGroupId, filters })
    },
  },

  props: {
    productGroupId: {
      type: Number,
      required: true,
    },
  },

  watch: {
    productGroupId() {
      this.init()
    },
  },
}
</script>
