<template>
  <div v-if="workingCopy" class="q-pa-md">
    <div class="row">
      <div class="col-2 q-pr-sm">
        <name
          :name="workingCopy.name"
          @set="setName"
        />
      </div>
      <div class="col-10 q-pr-sm">
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
          @click="save"
        >
          <q-icon left name="save" />
          Save
        </q-btn>
      </div>
    </div>

    <pre>{{ workingCopy }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import isEqual from 'lodash.isequal'

import Description from './description'
import Name from './name'

export default {
  components: {
    Description,
    Name,
  },

  computed: {
    ...mapGetters({
      getById: 'productGroups/getById',
    }),
    item() {
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
      saveChanges: 'productGroups/save',
    }),
    init() {
      if ( this.item ) {
        this.workingCopy = JSON.parse(JSON.stringify(this.item))
      }
    },
    setName( name ) {
      this.$set(this.workingCopy, 'name', name)
    },
    setDescription( description ) {
      this.$set(this.workingCopy, 'description', description)
    },
    save() {
      if ( this.hasChanged ) {
        this.saveChanges(this.workingCopy)
      }
    },
  },

  watch: {
    '$route.params.id'() {
      this.init()
    },
    item() {
      this.init()
    },
  },
}
</script>
