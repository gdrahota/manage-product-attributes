<template>
  <div style="width:100%">
    <q-card
      v-for="(group, groupId) of productAttrGroups"
      :key="groupId"
      class="f_card col-6 q-mb-lg q-pa-sm"
    >
      <div>
        <div style="font-size: 18px; font-weight: bolder">{{ group.name }}</div>
      </div>

      <div class="q-pt-none">
        <div class="column">
          <div
            v-for="(attribute, attrId) of group.attributes"
            :key="attrId"
            class=""
          >
            <div class="row q-pt-md">
              <div class="col-12">
                <div style="font-size: 15px; font-weight: bold">{{attribute.name}}</div>
              </div>
              <div class="col-12">
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
        </div>
      </div>
    </q-card>

    <div class="q-pt-md">
      <q-btn
        :color="Object.keys(filters).length === 0 ? 'grey-4' : 'accent'"
        :disable="Object.keys(filters).length === 0"
        :text-color="Object.keys(filters).length === 0 ? 'accent' : 'white'"
        label="Apply Filter"
        @click="filter"
        class="full-width q-pa-sm"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Between from './between'
import Equal from './equal'
import LessThanEqual from './less-than-equal'

export default {
  computed: {
    ...mapGetters({
      getAttrGroupsByProductGroupId: 'productAttributeGroupsOfProductGroups/getByProductGroupId',
      getAttributeById: 'productAttributes/getById',
      getProductGroupById: 'productGroups/getById',
      filters: 'productSearch/getFilters'
    }),
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

  data: () => ({
    // filters: {},
  }),

  methods: {
    ...mapMutations({
      _setFilter: 'productSearch/SET_FILTER'
    }),
    getComponent( searchStrategy ) {
      switch ( searchStrategy ) {
        case 'BETWEEN':
          return Between
        case 'EQ':
          return Equal
        case 'LTE':
          return LessThanEqual
        default:
          console.error(`Unknown search strategy: "${ searchStrategy }"`)

          return null
      }
    },
    setFilter( attribute, data ) {
      this._setFilter({
        attrId: attribute.id,
        searchStrategy: attribute.searchStrategy,
        productValueType: attribute.type,
        ...data
      })
    },

    filter() {
      this.$emit('filter')
    },

  },

  props: {
    productGroupId: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true
    }
  },

  watch: {
    productGroupId() {
      this.init()
    }
  },
}
</script>
<style scoped lang="sass">
  .f_card
    border-radius: 6px
    box-shadow: 1px 1px 30px 4px #cae9f6
    color: #697888
</style>
