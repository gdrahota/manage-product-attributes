<template>
  <q-field
    filled
    label="Product Group(s)"
    stack-label
  >
    <template v-slot:control>
      <q-chip
        v-for="(productGroupId, pos) of productGroupIds"
        :key="pos"
        color="primary"
        outline
        removable
        square
        text-color="white"
        @remove="remove(productGroupId)"
      >
        {{ getName(productGroupId) }}
      </q-chip>


      <q-btn
        v-if="options.length > 0"
        :color="options.length > 0 ? 'secondary' : 'grey'"
        class="q-ml-md"
        dense
        fab-mini
        icon="add"
      >
        <q-menu>
          <q-list>
            <q-item
              v-for="group of options"
              :key="group.id"
              v-close-popup
              clickable
              @click="addValue(group)"
            >
              <q-item-section>
                <q-item-label>{{ group.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </q-field>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getProductGroupsById: 'productGroups/getById',
      productGroups: 'productGroups/getAll',
    }),
    options() {
      return this.productGroups.filter(pg => !this.productGroupIds.includes(pg.id))
    },
  },

  methods: {
    getName( pgId ) {
      const pg = this.getProductGroupsById(pgId)
      return !!pg
        ? pg.name
        : null
    },
    addValue( value ) {
      this.$emit('add', value.id)
    },
    remove( id ) {
      this.$emit('remove', id)
    },
  },

  props: {
    productGroupIds: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>
