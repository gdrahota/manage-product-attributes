<template>
  <div v-if="workingCopy" class="q-pa-md">
    <div class="row">
      <div class="col-6">
        <name
          :name="workingCopy.name"
          @set="setName"
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
    <!--    <pre>{{ workingCopy }}</pre>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import isEqual from 'lodash.isequal'

import Name from './name'

export default {
  components: {
    Name,
  },

  computed: {
    ...mapGetters({
      getById: 'manufacturers/getById',
    }),
    item() {
      return this.getById(this.$route.params.id)
    },
    hasChanged() {
      return !isEqual(this.item, this.workingCopy)
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
      saveChanges: 'manufacturers/loadAll',
      add: 'manufacturers/add',
    }),
    setName( value ) {
      this.$set(this.workingCopy, 'name', value)
    },
    async save() {
      if ( this.hasChanged ) {
        if ( this.workingCopy.id ) {
          this.saveChanges(this.workingCopy)
        } else {
          const newManufacturerId = await this.add(this.workingCopy)
          await this.$router.push({ params: { id: newManufacturerId } })
        }
      }
    },
    init() {
      if ( this.item ) {
        this.workingCopy = JSON.parse(JSON.stringify(this.item))
      } else if ( this.$route.params.id === 'new' ) {
        this.workingCopy = {
          name: null,
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
