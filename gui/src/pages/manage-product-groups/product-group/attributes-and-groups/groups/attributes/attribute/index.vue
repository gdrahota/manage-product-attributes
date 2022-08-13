<template>
  <q-item>
    <q-item-section side>
      <q-btn
        dense
        flat
      >
        <q-icon class="handleGroupAttributes" name="menu" />
      </q-btn>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ attribute.name }}
        <template v-if="attribute.unit">
          ({{ attribute.unit }})
        </template>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn
        dense
        flat
        @click="$emit('remove', attribute.id)"
      >
        <q-icon
          color="red-6"
          name="delete_forever"
        />
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getById: 'productAttributes/getById',
    }),
    attribute() {
      return this.getById(this.record.attrId)
    },
  },

  props: {
    record: {
      type: Object,
      required: true,
    },
  },
}
</script>
