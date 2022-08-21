<template>
  <div v-if="productGroupId && productId && workingCopy" class="q-pa-md">
    <div class="row">
      <div class="col-2 q-pr-sm">
        <manufacturer
          :manufacturer="workingCopy.manufacturer"
          @set="setManufacturer"
        />
      </div>
      <div class="col-10">
        <product-name
          :name="workingCopy.name"
          @set="setName"
        />
      </div>
    </div>

    <div class="row q-mb-lg">
      <div class="col-2 q-pr-sm">
        <manufacturer-product-id
          :manufacturer-product-id="workingCopy.manufacturerProductId"
          @set="setManufacturerProductId"
        />
      </div>
      <div class="col-2 q-pr-sm">
        <ean-code
          :ean-code="workingCopy.eanCode"
          @set="setEanCode"
        />
      </div>
    </div>

    <template v-if="workingCopy.productGroups">
      <product-to-product-groups
        :product-group-ids="productGroupIds"
        @add="addProductGroup"
        @remove="removeProductGroup"
      />

      <div class="col-12 q-py-lg">
        <attributes
          :product="workingCopy"
          :product-groups="productGroups"
          @createAndAddValue="createAndAddValue"
          @removeProductAttributeValue="removeProductAttributeValue"
          @selectProductAttributeValue="selectProductAttributeValue"
        />
      </div>
    </template>

    <description
      :value="workingCopy.description"
      @set="setDescription"
    />

    <q-separator />

    <div class="row q-mt-lg">
      <div class="col-12">
        <q-btn
          :color="allowedBtn ? 'primary' : 'grey'"
          :disable="!allowedBtn"
          @click="save"
        >
          <q-icon
            :name="isWaitingForResponse ? 'hourglass_bottom' :  'save'"
            left
          />
          Save
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import isEqual from 'lodash.isequal'

import Attributes from './attributes'
import Description from './description'
import EanCode from './ean-code'
import Manufacturer from './manufacturer'
import ManufacturerProductId from './manucaturer-product-id'
import ProductName from './name'
import ProductToProductGroups from './product-to-product-groups'

export default {
  components: {
    Attributes,
    Description,
    EanCode,
    Manufacturer,
    ManufacturerProductId,
    ProductName,
    ProductToProductGroups,
  },

  computed: {
    ...mapGetters({
      getById: 'products/getById',
      products: 'products/getAll',
      getByProductId: 'productToProductGroups/getByProductId',
      getProductGroupById: 'productGroups/getById',
      getProductAttributeById: 'productAttributes/getById',
      isWaitingForResponse: 'products/isWaitingForResponse',
    }),
    productId() {
      return this.$route.params.id
    },
    product() {
      return this.productId
        ? this.getById(this.productId)
        : null
    },
    productGroups() {
      return this.workingCopy.productGroups.map(productGroup => this.getProductGroupById(productGroup.id))
    },
    productGroupId() {
      return this.$route.params.productGroupId
    },
    productGroupIds() {
      return this.workingCopy.productGroups.map(( { id } ) => id) || null
    },
    hasChanged() {
      return !isEqual(this.product, this.workingCopy)
    },
    allowedBtn() {
      return this.hasChanged && !this.isWaitingForResponse
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    workingCopy: null,
  }),

  methods: {
    ...mapActions({
      saveChanges: 'products/save',
      add: 'products/add',
      addProductAttributeValue: 'productAttributes/addValue',
      pullProductAttributeById: 'productAttributes/getById',
    }),
    setManufacturer( value ) {
      this.$set(this.workingCopy, 'manufacturer', value)
    },
    setName( value ) {
      this.$set(this.workingCopy, 'name', value)
    },
    setDescription( value ) {
      this.$set(this.workingCopy, 'description', value)
    },
    setManufacturerProductId( value ) {
      this.$set(this.workingCopy, 'manufacturerProductId', value)
    },
    setEanCode( value ) {
      this.$set(this.workingCopy, 'eanCode', value)
    },
    removeProductGroup( id ) {
      const idx = this.workingCopy.productGroups.findIndex(pg => pg.id === id)
      if ( idx !== -1 ) {
        this.$delete(this.workingCopy.productGroups, idx)
      }
    },
    addProductGroup( productGroupId ) {
      const pg = this.getProductGroupById(productGroupId)
      this.workingCopy.productGroups.push(pg)
    },
    selectProductAttributeValue( value ) {
      if ( value === null ) {
        return
      }

      const idx = this.workingCopy.attributeValues.findIndex(( { attrId } ) => attrId === value.attrId)

      if ( idx !== -1 ) {
        this.$set(this.workingCopy.attributeValues, idx, value)
      } else {
        this.workingCopy.attributeValues.push(value)
      }
    },
    removeProductAttributeValue( attrId ) {
      const idx = this.workingCopy.attributeValues.findIndex(attributeValue => attributeValue.attrId === attrId)
      this.$delete(this.workingCopy.attributeValues, idx)
    },
    async createAndAddValue( { attrValue } ) {
      const newProductAttributeValue = await this.addProductAttributeValue(attrValue)
      this.pullProductAttributeById(attrValue.attrId)
      this.selectProductAttributeValue(newProductAttributeValue)
    },
    async save() {
      if ( this.hasChanged ) {
        if ( this.workingCopy.id ) {
          this.saveChanges(this.workingCopy)
        } else {
          const newProductId = await this.add({
            product: this.workingCopy,
            productGroupId: this.productGroupId,
          })
          await this.$router.push({ params: { id: newProductId } })
        }
      }
    },
    init() {
      if ( this.product ) {
        this.workingCopy = JSON.parse(JSON.stringify(this.product))
      } else if ( this.$route.params.id === 'new' ) {
        this.workingCopy = {
          name: null,
          manufacturer: null,
          manufacturerProductId: null,
          eanCode: null,
        }
      }
    },
  },

  watch: {
    '$route.params.id'() {
      this.init()
    },
    products() {
      this.init()
    },
  },
}
</script>
