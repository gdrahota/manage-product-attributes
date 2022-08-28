<template>
  <div class="row q-pa-none">
    <div
      v-for="file of files"
      :key="file.id"
      class="col-3 q-pr-md q-pb-md"
    >
      <q-card class="border" flat>
        <q-card-section class="q-pa-none">
          <q-img
            v-if="file.mimeType === 'image/jpeg'"
            :src="file.link"
          />

          <q-icon
            v-else
            class="q-ma-lg"
            color="red"
            name="mdi-download"
            size="126px"
          />
        </q-card-section>

        <div class="text-caption text-left ellipsis text-white bg-grey-6 q-pa-sm">
          {{ file.name }}
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import filesize from 'filesize'

export default {
  methods: {
    getFilesize( value ) {
      const size = filesize.partial({ base: 2, standard: 'jedec', locale: 'de' })
      return size(value)
    },
  },

  props: {
    files: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>
