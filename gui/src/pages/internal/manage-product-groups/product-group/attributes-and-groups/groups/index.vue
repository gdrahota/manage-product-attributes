<template>
  <div>
    <table v-if="items.length > 0" class="full-width">
      <thead>
        <tr>
          <th scope="col" style="width: 30px"></th>
          <th scope="col">Name</th>
          <th scope="col">Attributes</th>
          <th scope="col">Description</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <draggable
        :list="items"
        class="list-group"
        ghost-class="ghost"
        handle=".handleGroups"
        tag="tbody"
        @end="onDragEnd(items)"
      >
        <tr
          v-for="(group, pos) of items"
          :key="pos"
          class="list-group-item"
        >
          <td class="q-pa-none q-pt-md">
            <q-btn class="handleGroups" dense flat icon="menu" />
          </td>
          <td>
            <name
              :value="group.name"
              @set="data => group.name = data"
            />
          </td>
          <td>
            <attributes
              :group="group"
              class="q-mb-sm"
              @set="data => setAttributes(group, data)"
            />
          </td>
          <td>
            <description
              :value="group.description"
              @set="data => group.description = data"
            />
          </td>
          <td>
            <q-btn
              flat
              @click="deleteAttributeGroup(group)"
            >
              <q-icon
                color="red-6"
                name="delete_forever"
              />
            </q-btn>
          </td>
        </tr>
      </draggable>
    </table>

    <q-btn
      class="q-mt-md"
      color="secondary"
      icon="add"
      label="group"
      rounded
      @click="add"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { sortByPosition } from '@/sorters'
import Attributes from './attributes'
import Description from './description'
import Draggable from 'vuedraggable'
import Name from './name'

export default {
  components: {
    Attributes,
    Description,
    Draggable,
    Name,
  },

  computed: {
    ...mapGetters({
      getAttrById: 'productAttributes/getById',
      getAll: 'productAttributes/getAll',
    }),
    items() {
      return [ ...this.attributeGroups ].sort(sortByPosition)
    },
  },

  methods: {
    add() {
      this.attributeGroups.push({
        productGroupId: this.productGroupId,
        name: null,
        position: this.attributeGroups.length,
        attributes: [],
      })
    },
    onDragEnd( items ) {
      items.forEach(( a, pos ) => a.position = pos)
    },
    sortByPosition() {
      return sortByPosition
    },
    addAttribute( attr ) {
      this.attributes.push({
        productGroupId: this.productGroupId,
        attrId: attr.id,
        position: this.attributes.length,
      })
    },
    deleteAttributeGroup( group ) {
      const pos = this.attributeGroups.findIndex(ag => ag === group)

      if ( pos !== -1 ) {
        this.$delete(this.attributeGroups, pos)
      }
    },
    setAttributes( group, data ) {
      const idx = this.attributeGroups.findIndex(ag => ag === group)

      if ( idx !== -1 ) {
        this.$set(this.attributeGroups[ idx ], 'attributes', data)
      }
    },
  },

  props: {
    attributeGroups: {
      type: Array,
      default: () => ([]),
    },
    productGroupId: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
table
  border-spacing: 0

  th
    color: teal
    background-color: #fff
    vertical-align: top

  td
    color: #444

  td, th
    border-top: 1px solid #ccc
    border-right: 1px solid #ccc
    padding: 5px 10px

  td:first-child, th:first-child
    border-left: 1px solid #ccc

  tr:last-child
    td
      border-bottom: 1px solid #ccc

  tbody
    tr
      td:first-child
        padding: 0 10px

table
  td
    vertical-align: top

.ghost
  opacity: 0.5
  background: #c8ebfb

</style>
