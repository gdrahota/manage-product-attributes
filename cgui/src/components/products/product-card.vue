<template>
  <transition v-if="show" name="bounce">
    <div
      :class="{'p_card row bg-white outline full-width' : viewStyle === ListLayoutType.LIST, 'p_card bg-white': viewStyle === ListLayoutType.GRID}"
      :style="{height: viewStyle === ListLayoutType.LIST? '220px' : '380px', width: '100%'}"
      @click="moveToDetailPage(product.id)"
      @mouseover="showCol = true"
      @mouseleave="showCol = false"
    >
      <div class="col-3">
        <img
          class="q-pa-sm"
          src="../../assets/1.jpg"
          :style="{height: viewStyle === ListLayoutType.LIST? '220px' : '240px'}"
          alt=""
        />
      </div>

      <div
        :class="{'column q-pa-sm justify-center': viewStyle === ListLayoutType.GRID, 'col-9 column justify-center items-start': viewStyle === ListLayoutType.LIST}">
        <div class="card_title text-center">{{ product.manufacturer.name }} {{ product.name }}</div>
        <div
          v-if="viewStyle === ListLayoutType.LIST"
          :class="{'card_sub_title q-pt-sm text-center ellipsis-2-lines': viewStyle === ListLayoutType.GRID, 'card_sub_title q-pt-sm text-start ellipsis-2-lines': viewStyle === ListLayoutType.LIST}"
          style="width: 90%"
          v-html="product.description"
        >
        </div>
        <div :style="viewStyle === ListLayoutType.GRID? {width: '100%'} : {width: '90%'}">
          <div :class="{'row justify-center': viewStyle === ListLayoutType.GRID, 'row justify-start': viewStyle === ListLayoutType.LIST}">
            <div class="text-grey-8 overflow-hidden text-weight-bold text-h6">{{ product.bestPrice }}€</div>
            <q-icon
              name="verified"
              color="amber-8"
              size="xs"
            />
          </div>
          <div :class="{'row justify-center': viewStyle === ListLayoutType.GRID, 'row': viewStyle === ListLayoutType.LIST}">
            <div
              class="text-grey-10 ellipsis"
              :style="{width: '90%'}"
            >
              {{ product.bestPriceDealer.name }}
            </div>
            <q-icon
              name="star"
              color="amber-8"
              size="xs"
            />
          </div>
        </div>
        <div
          style="padding-bottom: 0"
          class="row justify-center h-100 q-mt-sm"
        >
          <q-btn
            dense
            padding="0 10px"
            unelevated
            class="s_btn"
            :color="showCol ? 'light-blue-10' : 'grey-3'"
            :text-color="showCol ? 'white' : 'grey-8'"
            style="text-transform: none; font-weight: 600; border-radius: 3px;"
          >
            More details
          </q-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ListLayoutType } from '@/store/enums/list-layout-type'

export default {
  name: 'ProductCard',

  computed: {
    ListLayoutType() {
      return ListLayoutType
    },
  },

  data() {
    return {
      showCol: false,
      show: false,
    }
  },

  methods: {
    moveToDetailPage( productId ) {
      this.$router.push( {
        name: 'product-details',
        params: {
          id: productId,
        },
      } )
    },
  },

  props: {
    product: Object,
    viewStyle: String,
  },

  watch: {
    viewStyle( newVal, oldVal ) {
      this.show = true
    },
  },

  mounted() {
    this.show = true
  },
}
</script>

<style lang="sass">
.s_btn
  transition: background-color 1.0s ease-in-out

.p_card
  border-radius: 6px
  box-shadow: 1px 1px 30px 4px #edf7fc77

  img
    width: 100%
    object-fit: cover
    border-radius: 6px

  &:hover
    cursor: pointer
    animation: zoom-in-zoom-out 1.0s

    @keyframes zoom-in-zoom-out
      0%
        transform: scale(1, 1)

      50%
        transform: scale(1.05, 1.05)

      100%
        transform: scale(1, 1)

.bounce-enter-active
  animation: bounce-in .5s


.bounce-leave-active
  animation: bounce-in .5s reverse


  @keyframes bounce-in
    0%
      transform: scale(0)

    50%
      transform: scale(1.5)

    100%
      transform: scale(1)

.card_title
  font-size: 17px
  font-weight: 700
  color: #516573

.card_sub_title
  font-size: 12px
  font-weight: 500
  color: #697888
</style>
