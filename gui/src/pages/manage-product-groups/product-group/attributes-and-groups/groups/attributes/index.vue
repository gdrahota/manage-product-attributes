<template>
  <div>
    <q-list v-if="attributes.length > 0" bordered class="q-mb-md" separator>
      <draggable
        :list="attributes"
        class="list-group"
        ghost-class="ghost"
        handle=".handleGroupAttributes"
        @end="onDragEnd"
      >
        <attribute
          v-for="(record, pos) of attributes.filter(i => i)"
          :key="pos"
          :record="record"
          @remove="removeAttributeFromGroup(record)"
        />
      </draggable>
    </q-list>

    <q-btn
      color="secondary"
      fab-mini
      icon="add"
    >
      <q-menu
        color="secondary"
        filled
        icon="add"
        label="Attribute"
        map-options
        multiple
      >
        <q-list bordered separator>
          <q-item
            v-for="(attribute, pos) of options"
            :key="pos"
            v-close-popup
            clickable
            @click="add(attribute)"
          >
            <q-item-section>
              <q-item-label>
                {{ attribute.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section v-if="attribute.unit" side>
              {{ attribute.unit }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Attribute from './attribute'
import Draggable from 'vuedraggable'

export default {
  components: {
    Attribute,
    Draggable,
  },

  computed: {
    ...mapGetters({
      getAll: 'productAttributes/getAll',
    }),
    options() {
      const usedAttrIds = this.group.attributes.filter(i => i).map(( { attrId } ) => attrId.toString())
      return this.getAll.filter(( { id } ) => !usedAttrIds.includes(id.toString()))
    },
  },

  created() {
    this.attributes = this.group.attributes
  },

  data: () => ({
    attributes: [],
  }),

  methods: {
    add( attribute ) {
      const attributes = [
        ...this.group.attributes,
        {
          attrId: attribute.id,
          position: this.group.attributes.length,
        },
      ]

      this.$emit('set', attributes)
    },
    removeAttributeFromGroup( record ) {
      const idx = this.group.attributes.findIndex(a => a === record)
      if ( idx !== -1 ) {
        this.$delete(this.group.attributes, idx)
        this.$emit('set', this.group.attributes)
      }
    },
    onDragEnd() {
      this.group.attributes.filter(i => i).forEach(( a, pos ) => a.position = pos)
      this.$emit('set', this.group.attributes.filter(i => i))
    },
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  watch: {
    group() {
      this.attributes = this.group.attributes
    },
  },
}
</script>

<style lang="sass" scoped>
.q-item.q-item-type.row.no-wrap
  border-bottom: 1px solid #ddd
</style>
