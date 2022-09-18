<template>
  <div v-if="workingCopyProductGroup" class="q-pa-md q-pr-lg">
    <div class="row">
      <div class="col-2 q-pr-sm">
        <name
          :name="workingCopyProductGroup.name"
          @set="setName"
        />
      </div>

      <div class="col-10 q-pl-sm">
        <description
          :description="workingCopyProductGroup.description"
          @set="setDescription"
        />
      </div>
    </div>

    <attributes-and-groups
      v-if="workingCopyProductGroup.id"
      :attribute-groups="workingCopyAttributeGroups"
      :product-group="workingCopyProductGroup"
      class="q-pb-lg"
    />

    <div class="q-mb-lg q-pb-lg">
      <q-btn
        :color="hasChanged ? 'primary' : 'grey'"
        :disable="!hasChanged"
        :label="workingCopyProductGroup.id ? 'Save' : 'Add'"
        icon-right="save"
        @click="save"
      />
    </div>

    <!--    <div class="row">-->
    <!--      <div class="col">-->
    <!--        <pre>{{ workingCopyProductGroup }}</pre>-->
    <!--      </div>-->
    <!--      <div class="col">-->
    <!--        <pre>{{ workingCopyAttributeGroups }}</pre>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import isEqual from 'lodash.isequal'
import { sortByPosition } from '@/sorters'

import AttributesAndGroups from './attributes-and-groups'
import Description from './description'
import Name from './name'

export default {
  components: {
    AttributesAndGroups,
    Description,
    Name,
  },

  computed: {
    ...mapGetters({
      getProductGroupsById: 'productGroups/getById',
      getProductAttributeGroupsOfProductGroupByProductGroupId: 'productAttributeGroupsOfProductGroups/getByProductGroupId',

    }),
    item() {
      return this.getProductGroupsById(this.$route.params.id)
    },
    productAttributeGroups() {
      return this.getProductAttributeGroupsOfProductGroupByProductGroupId(this.$route.params.id)
    },
    hasChanged() {
      return !isEqual(this.item, this.workingCopyProductGroup) || !isEqual(this.productAttributeGroups, this.workingCopyAttributeGroups)
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    workingCopyProductGroup: null,
    workingCopyAttributeGroups: null,
  }),

  methods: {
    ...mapActions({
      saveProductGroup: 'productGroups/save',
      saveAttributeGroupsOfProductGroup: 'productAttributeGroupsOfProductGroups/save',
      add: 'productGroups/add',
    }),
    init() {
      if ( this.item ) {
        const attributes = [ ...this.item.attributes ].sort(sortByPosition)
        this.workingCopyProductGroup = JSON.parse(JSON.stringify({
          ...this.item,
          attributes,
        }))
      } else if ( this.$route.params.id === 'new' ) {
        this.workingCopyProductGroup = {
          name: null,
          description: null,
          attributes: [],
        }
      }

      this.workingCopyAttributeGroups = JSON.parse(JSON.stringify(this.productAttributeGroups))
    },
    setName( name ) {
      this.$set(this.workingCopyProductGroup, 'name', name)
    },
    setDescription( description ) {
      this.$set(this.workingCopyProductGroup, 'description', description)
    },
    async save() {
      if ( this.hasChanged ) {
        if ( this.workingCopyProductGroup.id ) {
          if ( !isEqual(this.item, this.workingCopyProductGroup) ) {
            this.saveProductGroup(this.workingCopyProductGroup)
          }

          if ( !isEqual(this.productAttributeGroups, this.workingCopyAttributeGroups) ) {
            this.saveAttributeGroupsOfProductGroup({
              productGroupId: this.workingCopyProductGroup.id,
              items: this.workingCopyAttributeGroups,
            })
          }
        } else {
          const item = await this.add(this.workingCopyProductGroup)

          await this.$router.push({ params: { id: item.id } })
        }
      }
    },
  },

  watch: {
    '$route.params.id'() {
      this.init()
    },
    item() {
      this.init()
    },
    productAttributeGroups() {
      this.init()
    },
  },
}
</script>
