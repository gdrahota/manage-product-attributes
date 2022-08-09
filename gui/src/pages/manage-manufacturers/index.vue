<template>
  <q-page-container class="full-height window-height">
    <q-drawer :width="400" show-if-above side="left">
      <q-scroll-area class="fit bg-teal-1">
        <q-btn
          color="secondary"
          icon="add"
          label="neu"
          size="14px"
          style="margin: 10px 5px"
          @click="routeTo('new')"
        />

        <q-list dense padding>
          <q-separator />
          <template v-for="(item, pos) in manufacturers">
            <q-item
              :key="pos"
              v-ripple
              :class="{ 'bg-teal-6': isSelected(item), 'text-white': isSelected(item), 'text-bold': isSelected(item) }"
              clickable
            >
              <q-item-section @click="routeTo(item.id)">
                <q-item-label>
                  {{ item.name }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator :key="pos + '-sep'" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <router-view />
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
