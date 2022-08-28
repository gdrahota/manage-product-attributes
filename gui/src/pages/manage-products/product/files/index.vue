<template>
  <div>
    <div class="row q-pa-none">
      <div
        v-for="file of files"
        :key="file.id"
        class="col-3 q-pr-md q-pb-md"
      >
        <q-card>
          <q-card-section class="bg-grey-4" style="height: 50px">
            <div class="row">
              <div class="col-3 text-left text-caption">
                {{ getFilesize(file.size) }}
              </div>
              <div class="text-caption text-left ellipsis col-8">
                {{ file.name }}
              </div>
              <div class="col-1">
                <q-btn
                  color="red"
                  flat
                  icon="mdi-delete-forever"
                  round
                  size="12px"
                  style="top: -8px; margin-left: 4px"
                  @click="remove(file.id)"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <pdf-viewer v-if="file.mimeType === 'application/pdf'" :file="file" />

            <q-img
              v-else-if="file.mimeType === 'image/jpeg'"
              :src="file.link"
            />

            <div v-else>
              {{ file }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-separator />

    <q-uploader
      ref="uploader"
      :factory="upload"
      :max-files="10"
      bordered
      color="teal"
      flat
      label="Product Files"
      multiple
      square
      @uploaded="uploaded"
    >
    </q-uploader>
  </div>
</template>

<script>
import axios from 'axios'
import filesize from 'filesize'
import PdfViewer from './pdf-viewer'

export default {
  components: {
    PdfViewer,
  },

  computed: {
    url() {
      return `/api/files/product/${ this.$route.params.id }`
    },
  },

  methods: {
    async upload( files ) {
      if ( files ) {

        const formData = new FormData()
        formData.append('file', files[ 0 ])

        try {
          const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
          }

          const { data } = await axios.post(`/api/files/product/${ this.$route.params.id }`, formData, config)
          this.files.push(data)
          this.$refs[ 'uploader' ].reset()
        } catch ( err ) {
          this.$emit('uploaded', err)
          throw err
        }
      } else {
        // no file to upload...
        throw new Error('No file to upload')
      }
    },
    uploaded( info ) {
      console.log('info', info)
    },
    getFilesize( value ) {
      const size = filesize.partial({ base: 2, standard: 'jedec', locale: 'de' })
      return size(value)
    },
    remove( fileId ) {
      const idx = this.files.findIndex(i => i.id === fileId)

      if ( idx !== -1 ) {
        this.files.splice(idx, 1)
      }
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
