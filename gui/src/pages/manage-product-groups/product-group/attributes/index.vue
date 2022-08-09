<template>
  <div>
    <table>
      <thead>
        <tr>
          <th rowspan="2" scope="col"></th>
          <th rowspan="2" scope="col">Attribute</th>
          <th colspan="2" scope="col">
            Conversion
          </th>
          <th rowspan="2" scope="col">Description</th>
        </tr>
        <tr>
          <th scope="col">of (entry)</th>
          <th scope="col">into (display)</th>
        </tr>
      </thead>

      <draggable
        :disabled="!enabled"
        :list="attributes"
        class="list-group"
        ghost-class="ghost"
        handle=".handle"
        tag="tbody"
        @end="onDragEnd"
        @start="dragging = true"
      >
        <tr
          v-for="element in items"
          :key="element.name"
          class="list-group-item"
        >
          <td class="q-pa-none">
            <q-btn class="handle" flat icon="menu" />
          </td>
          <td>
            {{ element.name }}
          </td>
          <td>
            1 {{ getAttrById(element.id).unit }}
          </td>
          <td class="row" style="padding: 0 10px">
            <div class="col q-pr-xs q-pt-md">
              <representation-unit-factor
                :value="element.representationUnitFactor"
                @set="data => element.representationUnitFactor = data"
              />
            </div>
            <div class="col q-pl-xs q-mt-md">
              <representation-unit
                :value="element.representationUnit"
                @set="data => element.representationUnit = data"
              />
            </div>
          </td>
          <td>
            {{ element.description }}
          </td>
        </tr>
      </draggable>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Draggable from 'vuedraggable'
import RepresentationUnitFactor from './representation-unit-factor'
import RepresentationUnit from './representation-unit'
import { sortByPosition } from '@/sorters'

export default {
  components: {
    Draggable,
    RepresentationUnit,
    RepresentationUnitFactor,
  },

  computed: {
    ...mapGetters({
      getAttrById: 'productAttributes/getById',
    }),
    items() {
      return [ ...this.attributes ].sort(sortByPosition)
    },
  },

  data() {
    return {
      enabled: true,
      list: [
        { name: 'AAA', id: 0 },
        { name: 'BBBBB', id: 1 },
        { name: 'CCCCCCC', id: 2 },
      ],
      dragging: false,
    }
  },

  methods: {
    add: function() {
      this.list.push({ name: 'Juan ' + id, id: id++ })
    },
    onDragEnd() {
      this.dragging = false
      this.attributes.forEach(( a, pos ) => a.position = pos)
    },
  },

  props: {
    attributes: {
      type: Array,
      default: () => ([]),
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

.ghost
  opacity: 0.5
  background: #c8ebfb

</style>
