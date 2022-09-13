<template>
  <q-page-container class="full-height window-height">
    <q-splitter
      v-model="splitter"
      style="height: calc(100vh - 98px)"
      unit="px"
    >
      <template v-slot:before>
        <q-scroll-area class="fit bg-teal-1">
          <div class="q-pl-md q-pr-md q-pb-md">
            <q-btn
              color="secondary"
              icon="add"
              label="new"
              rounded
              size="14px"
              style="margin: 10px 5px"
              @click="routeTo('new')"
            />

            <q-list
              v-if="manufacturers.length > 0"
              bordered
              class="q-pa-none"
              dense
              padding
              separator
            >
              <q-separator />
              <template v-for="(item, pos) in manufacturers">
                <q-item
                  :key="pos"
                  v-ripple
                  :class="{ 'bg-teal-6': isSelected(item), 'text-white': isSelected(item), 'text-bold': isSelected(item) }"
                  class="bg-white"
                  clickable
                >
                  <q-item-section @click="routeTo(item.id)">
                    <q-item-label>
                      <div :style="{ width: `${splitter-60}px` }" class="truncate">
                        {{ item.name }}
                      </div>
                      <q-tooltip :delay="500" :offset="[20,0]" anchor="center end" self="center start">
                        <div class="text-body1 text-no-wrap">{{ item.name }}</div>
                      </q-tooltip>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator :key="pos + '-sep'" />
              </template>
            </q-list>
          </div>
        </q-scroll-area>
      </template>

      <template v-slot:separator>
        <q-avatar color="grey-5" icon="drag_indicator" size="30px" text-color="white" />
      </template>

      <template v-slot:after>
        <router-view />
      </template>
    </q-splitter>
  </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      manufacturers: 'manufacturers/getAll',
    }),
  },

  data: () => ({
    splitter: 300,
  }),

  methods: {
    isSelected( product ) {
      return this.$route.params.id && product
        ? parseInt(product.id) === parseInt(this.$route.params.id)
        : false
    },
    routeTo( id ) {
      this.$router.push({
        name: 'manage-manufacturer',
        params: { id },
      })
    },
  },
}
</script>
