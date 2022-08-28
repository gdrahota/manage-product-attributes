<template>
  <q-select
    :options="manufacturers"
    :rules="rules"
    :value="manufacturer"
    dense
    filled
    label="Manufacturer"
    map-options-
    option-label="name"
    option-value="id"
    @input="setValue"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      manufacturers: 'manufacturers/getAll',
    }),
    rules() {
      return [
        v => !!v || 'Der Hersteller wird benötigt!',
      ]
    },
  },

  methods: {
    setValue( value ) {
      this.$emit('set', value)
    },
  },

  props: {
    manufacturer: {
      type: Object,
      default: null,
    },
  },
}
</script>
