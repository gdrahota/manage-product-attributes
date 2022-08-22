<template>
  <div style="width:100%">
    <q-card
      v-for="(group, groupId) of productAttrGroups"
      :key="groupId"
      bordered
      class="col-6 q-mb-md q-pa-sm"
      flat
    >
      <div>
        <div class="text-subtitle-1 text-bold">{{ group.name }}</div>
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
                <div class="text-weight-medium">{{attribute.name}}</div>
              </div>
              <div class="col-12">
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
      </div>
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
import Between from './between'
import Equal from './equal'

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

  mounted(){
    console.log('The product group ID is not working ===>')
    console.log(this.productGroupId)
  },

  methods: {
    init() {
      this.filters = {}
    },
    getComponent( searchStrategy ) {
      switch ( searchStrategy ) {
        case 'BETWEEN':
          return Between
        case 'EQ':
          return Equal
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
    search() {
      const filters = Object.values(this.filters).map(obj => {
        const response = {
          attrId: obj.attrId,
          productValueType: obj.type,
          searchStrategy: obj.searchStrategy,
        }

        switch ( obj.searchStrategy ) {
          case 'BETWEEN': {
            if ( obj.valueFrom ) {
              response.valueIdFrom = obj.valueFrom.id
            }

            if ( obj.valueTill ) {
              response.valueIdTill = obj.valueTill.id
            }
          }
            break

          case 'EQ': {
            if ( obj.value ) {
              response.valueId = obj.value.id
            }
          }
        }

        return response
      })

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
