<template>
  <div>
    <table>
      <thead>
        <tr>
          <th rowspan="2" scope="col"></th>
          <th rowspan="2" scope="col">Attribute</th>
          <th colspan="3" scope="col">
            Conversion
          </th>
          <th rowspan="2" scope="col">Description</th>
        </tr>
        <tr>
          <th scope="col">of (entry)</th>
          <th scope="col">into (display)</th>
          <th></th>
        </tr>
      </thead>

      <draggable
        :disabled="!enabled"
        :list="items"
        class="list-group"
        ghost-class="ghost"
        handle=".handle"
        tag="tbody"
        @end="onDragEnd"
      >
        <tr
          v-for="element in [...items].sort(sortByPosition)"
          :key="element.name"
          class="list-group-item"
        >
          <td class="q-pa-none">
            <q-btn class="handle" flat icon="menu" />
          </td>
          <td>
            {{ getAttrById(element.attrId).name }}
          </td>
          <td>
            1 {{ getAttrById(element.attrId).unit }}
          </td>
          <td class="row" style="padding: 0 10px">
            <div class="col q-pr-xs q-pt-md">
              <representation-unit-factor
                :value="element.representationUnitFactor"
                @set="data => element.representationUnitFactor = data"
              />
            </div>
            <div class="col q-px-xs q-mt-md">
              <representation-unit
                :value="element.representationUnit"
                @set="data => element.representationUnit = data"
              />
            </div>
            <div class="col q-pl-sm q-mt-md">
              <fractional-digits
                :value="element.fractionalDigits"
                @set="data => element.fractionalDigits = data"
              />
            </div>
          </td>
          <td>
            {{ element.representationUnitFactor }} {{ element.representationUnit }} = 1 {{ getAttrById(element.attrId).unit }}
          </td>
          <td>
            {{ getAttrById(element.attrId).description }}
          </td>
        </tr>
      </draggable>
    </table>

    <q-btn-dropdown
      :color="unusedAttrs.length > 0 ? 'secondary' : 'grey'"
      :disable="unusedAttrs.length === 0"
      class="q-mt-md"
      label="Add Attribute to List"
    >
      <q-list bordered separator>
        <q-item
          v-for="(attr, pos) of unusedAttrs"
          :key="pos"
          v-close-popup
          clickable dense @click="addAttribute(attr)">
          <q-item-section>
            <q-item-label>{{ attr.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Draggable from 'vuedraggable'
import { sortByPosition } from '@/sorters'

import FractionalDigits from './fractional-digits'
import RepresentationUnitFactor from './representation-unit-factor'
import RepresentationUnit from './representation-unit'

export default {
  components: {
    Draggable,
    FractionalDigits,
    RepresentationUnit,
    RepresentationUnitFactor,
  },

  computed: {
    ...mapGetters({
      getAttrById: 'productAttributes/getById',
      getAll: 'productAttributes/getAll',
    }),
    items() {
      return this.attributes
    },
    unusedAttrs() {
      const usedAttrIds = this.items.map(( { attrId } ) => attrId)
      return this.getAll.filter(( { id } ) => !usedAttrIds.includes(id))
    },
  },

  data() {
    return {
      enabled: true,
    }
  },

  methods: {
    add: function() {
      this.list.push({ name: 'Juan ' + id, id: id++ })
    },
    onDragEnd() {
      this.items.forEach(( a, pos ) => a.position = pos)
    },
    sortByPosition() {
      return sortByPosition
    },
    addAttribute( attr ) {
      this.attributes.push({
        productGroupId: this.productGroupId,
        attrId: attr.id,
        representationUnit: '',
        representationUnitFactor: 1,
        position: this.attributes.length,
      })
    },
  },

  props: {
    attributes: {
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

.ghost
  opacity: 0.5
  background: #c8ebfb

</style>
