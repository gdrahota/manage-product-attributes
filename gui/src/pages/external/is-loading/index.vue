<template>
  <q-dialog
    :value="show"
    persistent
  >
    <q-spinner-cube
      color="teal"
      size="15em"
    />
  </q-dialog>
</template>

<script>

import { debounce } from 'lodash'

export default {
  created() {
    this.init( this.isSearchInProgress )
  },

  data: () => ( {
    show: false,
    debouncedFn: null,
  } ),

  methods: {
    init( newValue ) {
      if ( newValue ) {
        this.debouncedFn = debounce( ( value ) => {
          this.show = value
        }, 300 )

        this.debouncedFn( newValue )
      } else if ( this.debouncedFn ) {
        this.debouncedFn.cancel()
        this.show = newValue
      }
    },
  },

  props: {
    isSearchInProgress: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isSearchInProgress( newValue ) {
      this.init( newValue )
    },
  },
}
</script>
