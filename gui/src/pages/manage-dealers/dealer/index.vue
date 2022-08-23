<template>
  <div v-if="workingCopy" class="q-pa-md">
    <div class="row">
      <div class="col-4 q-pr-sm">
        <name
          :name="workingCopy.name"
          @set="setName"
        />
      </div>
      <div class="col-2 q-pr-sm">
        <status
          :value="workingCopy.status"
          @set="setStatus"
        />
      </div>
      <div class="col-6 q-pr-sm">
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

import Name from './name'
import Status from './status'

export default {
  components: {
    Name,
    Status,
  },

  computed: {
    ...mapGetters({
      getById: 'dealers/getById',
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
      saveChanges: 'dealers/save',
      add: 'dealers/add',
    }),
    init() {
      if ( this.attribute ) {
        this.workingCopy = JSON.parse(JSON.stringify(this.attribute))
      } else if ( this.$route.params.id === 'new' ) {
        this.workingCopy = {
          id: null,
          name: null,
          status: null,
        }
      }
    },
    setName( name ) {
      this.$set(this.workingCopy, 'name', name)
    },
    setStatus( status ) {
      this.$set(this.workingCopy, 'status', status)
    },
    async save() {
      if ( this.hasChanged ) {
        if ( this.workingCopy.id ) {
          await this.saveChanges({
            id: this.workingCopy.id,
            name: this.workingCopy.name,
            status: this.workingCopy.status,
          })
        } else {
          const item = await this.add({
            name: this.workingCopy.name,
            status: this.workingCopy.status,
          })

          await this.$router.push({ params: { id: item.id } })
        }
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
