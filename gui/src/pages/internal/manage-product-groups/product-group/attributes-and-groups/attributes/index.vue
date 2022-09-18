<template>
  <div v-if="getAll.length > 0">
    <table>
      <thead>
        <tr>
          <th rowspan="2" scope="col"></th>
          <th rowspan="2" scope="col">Attribute</th>

          <th colspan="3" scope="col">
            Conversion
          </th>
          <th rowspan="2" scope="col">Search Strategy</th>
          <th rowspan="2" scope="col">Description</th>
          <th rowspan="2" scope="col"></th>
        </tr>
        <tr>
          <th scope="col">of (entry)</th>
          <th scope="col">into (display)</th>
          <th scope="col">Result</th>
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
          v-for="(element, key) of items"
          :key="key"
          class="list-group-item"
        >
          <td class="q-pa-none">
            <q-btn class="handle" dense flat icon="menu" />
          </td>
          <td v-if="getAttrById(element.attrId)">
            {{ getAttrById(element.attrId).name }}
          </td>
          <template v-if="getAttrById(element.attrId).type === 'decimal'">
            <td>
              {{ getAttrById(element.attrId).unit }}
            </td>
            <td>
              <div class="row" style="padding: 0 10px">
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
              </div>
            </td>
            <td>
              <template v-if="element.representationUnitFactor">
                {{ element.representationUnitFactor.toLocaleString('de-DE') }} {{ element.representationUnit }} = 1
                {{ getAttrById(element.attrId).unit }}
              </template>
            </td>
          </template>
          <td v-else class="bg-grey-1" colspan="3"></td>
          <td>
            <search-strategy
              :search-strategy="element.searchStrategy"
              :type="getAttrById(element.attrId).type"
              @set="data => setValue(key,'searchStrategy', data)"
            />
          </td>
          <td>
            {{ getAttrById(element.attrId).description }}
          </td>
          <td>
            <q-btn
              dense
              flat
              @click="deleteAttribute(element)"
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
import SearchStrategy from './search-strategy'

export default {
  components: {
    Draggable,
    FractionalDigits,
    RepresentationUnit,
    RepresentationUnitFactor,
    SearchStrategy,
  },

  computed: {
    ...mapGetters({
      getAttrById: 'productAttributes/getById',
      getAll: 'productAttributes/getAll',
    }),
    items() {
      return [ ...this.attributes ].sort(sortByPosition)
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
        fractionalDigits: 0,
      })
    },
    deleteAttribute( attr ) {
      const idx = this.attributes.findIndex(a => a.id === attr.id)

      if ( idx !== -1 ) {
        this.$delete(this.attributes, idx)
      }
    },
    setValue( pos, attrName, value ) {
      this.$set(this.items[ pos ], attrName, value)
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

  tbody
    tr
      td:first-child
        padding: 0 10px

.ghost
  opacity: 0.5
  background: #c8ebfb

</style>
