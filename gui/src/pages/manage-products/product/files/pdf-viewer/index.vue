<template>
  <div>
    <div>
      <pdf
        :page="page"
        :src="file.link"
        class="border"
        @loadeddata="page = 1"
        @num-pages="numPages = $event"
      />
    </div>

    <div class="q-pa-sm flex flex-center">
      <q-pagination
        v-model="page"
        :max="numPages || 1"
        :max-pages="7"
        boundary-links
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import Pdf from 'vue-pdf'

export default {
  components: {
    Pdf,
  },

  data: () => ({
    numPages: 1,
    page: 1,
  }),

  props: {
    file: {
      type: Object,
      required: true,
    },
  },
}
</script>
