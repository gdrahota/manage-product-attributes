import Vue from 'vue'

import './styles/quasar.sass'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import langDe from 'quasar/lang/de'

import Quasar, { Dialog, Loading, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: {
      color: 'orange',
      position: 'top',
      progress: true,
      timeout: 5000,
      closeBtn: true,
      progressClass: 'bg-white',
      classes: 'q-pa-md',
    },
  },
  components: {},
  lang: langDe,
  plugins: {
    Dialog,
    Loading,
    Notify,
  },
})

window.document.title = 'Solar Farm'
