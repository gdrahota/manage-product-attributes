<template>
  <div class="row">
    <div class="col-2 q-pr-sm">
      <manufacturer
        :manufacturer="workingCopy.manufacturer"
        @set="data => $emit('setManufacturer', data)"
      />
    </div>
    <div class="col-9">
      <product-name
        :name="workingCopy.name"
        @set="data => $emit('setName', data)"
      />
    </div>
    <div class="col-1">
      <q-chip
        :color="workingCopy.show ? 'green' : 'grey'"
        :text-color="workingCopy.show ? 'white' : 'black'"
        class="q-mx-lg"
        round
      >
        <span v-if="workingCopy.show">Online</span>
        <span v-else>Offline</span>
      </q-chip>
    </div>
  </div>
</template>

<script>
import ProductName from './name'
import Manufacturer from './manufacturer'

export default {
  components: {
    Manufacturer,
    ProductName,
  },

  methods: {},

  props: {
    workingCopy: {
      type: Object,
      required: true,
    },
  },
}
</script>
