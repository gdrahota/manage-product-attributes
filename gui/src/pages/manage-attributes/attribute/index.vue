<template>
  <div v-if="workingCopy" class="q-pa-md">
    <div class="row">
      <div class="col-2 q-pr-sm">
        <name
          :name="workingCopy.name"
          @set="setName"
        />
      </div>
      <div class="col-1 q-pr-sm">
        <unit
          :unit="workingCopy.unit"
          @set="setUnit"
        />
      </div>
      <div class="col-1 q-pr-sm">
        <type
          :attr-type="workingCopy.type"
          @set="setType"
        />
      </div>
      <div class="col-2 q-pr-sm">
        <fractional-digits
          :value="workingCopy.fractionalDigits"
          @set="setFractionalDigits"
        />
      </div>
      <div class="col-6 q-pr-sm">
        <description
          :description="workingCopy.description"
          @set="setDescription"
        />
      </div>
    </div>

    <q-separator />

    <div class="row q-mt-lg">
      <div class="col-12">
        <q-btn
          :color="hasChanged ? 'primary' : 'grey'"
          :disable="!hasChanged"
          :label="workingCopy.id ? 'Save' : 'Add'"
          icon-right="save"
          @click="save"
        />
      </div>
    </div>
    <pre>{{ workingCopy }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import isEqual from 'lodash.isequal'

import Description from './description'
import FractionalDigits from './fractional-digits'
import Name from './name'
import Type from './type'
import Unit from './unit'

export default {
  components: {
    Description,
    FractionalDigits,
    Name,
    Type,
    Unit,
  },

  computed: {
    ...mapGetters({
      getById: 'productAttributes/getById',
    }),
    attribute() {
      return this.getById(this.$route.params.id)
    },
    hasChanged() {
      return !isEqual(this.attribute, this.workingCopy)
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
      saveChanges: 'productAttributes/save',
      add: 'productAttributes/add',
    }),
    init() {
      if ( this.attribute ) {
        this.workingCopy = JSON.parse(JSON.stringify(this.attribute))
      } else if ( this.$route.params.id === 'new' ) {
        this.workingCopy = {
          id: null,
          name: null,
          unit: null,
          type: null,
          description: null,
          fractionalDigits: 0,
        }
      }
    },
    setName( name ) {
      this.$set(this.workingCopy, 'name', name)
    },
    setUnit( unit ) {
      this.$set(this.workingCopy, 'unit', unit)
    },
    setType( type ) {
      this.$set(this.workingCopy, 'type', type)
    },
    setFractionalDigits( value ) {
      this.$set(this.workingCopy, 'fractionalDigits', value)
    },
    setDescription( description ) {
      this.$set(this.workingCopy, 'description', description)
    },
    save() {
      if ( this.hasChanged ) {
        if ( this.workingCopy.id ) {
          this.saveChanges({
            id: this.workingCopy.id,
            name: this.workingCopy.name,
            unit: this.workingCopy.unit,
            type: this.workingCopy.type,
            description: this.workingCopy.description,
            fractionalDigits: this.workingCopy.fractionalDigits,
          })
        } else {
          this.add({
            name: this.workingCopy.name,
            unit: this.workingCopy.unit,
            type: this.workingCopy.type,
            description: this.workingCopy.description,
            fractionalDigits: this.workingCopy.fractionalDigits,
          })
        }
      }
    },
  },

  watch: {
    '$route.params.id'() {
      this.init()
    },
    attribute() {
      this.init()
    },
  },
}
</script>
