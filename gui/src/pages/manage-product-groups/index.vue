<template>
  <q-page-container class="full-height window-height">
    <q-drawer :width="200" show-if-above side="left">
      <q-scroll-area class="fit bg-teal-1">
        <q-btn
          color="secondary"
          icon="add"
          label="new"
          size="14px"
          style="margin: 10px 5px"
          @click="routeTo('new')"
        />

        <q-list dense padding>
          <q-separator />
          <template v-for="(item, pos) of items">
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
import { sortByName } from '@/sorters'

export default {
  computed: {
    ...mapGetters({
      getAll: 'productGroups/getAll',
    }),
    items() {
      return [ ...this.getAll ].sort(sortByName)
    },
  },

  methods: {
    isSelected( attribute ) {
      return this.$route.params.id && attribute
        ? parseInt(attribute.id) === parseInt(this.$route.params.id)
        : false
    },
    routeTo( id ) {
      this.$router.push({
        name: 'manage-product-group',
        params: { id },
      })
    },
  },
}
</script>
