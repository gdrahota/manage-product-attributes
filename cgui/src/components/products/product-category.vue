<template>
  <div class="main q-mb-md">
    <div
      class="container cursor-pointer row q-pa-sm bg-white"
      @click="moveToFilterPage(category.id)"
    >
      <div class="col-4">
        <img
          class="q-pa-sm"
          style="height: 100px"
          src="../../assets/1.jpg"
        />
      </div>
      <div class="col-8 q-py-lg">
        <div
          class="text-grey-6 text-weight-medium ellipsis"
          style="font-size: 16px"
        >
          {{category.name}}
        </div>
        <div>Show Number of Products</div>
      </div>
    </div>
    <div
      style="height: 3px;"
      class="belt bg-light-blue-10"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "product-category",
  props: {
    category:{
      type: Object,
      required: true
    }
  },
  methods: {
    moveToFilterPage(id){
      this.$router.push({
        params:{
          id: id
        },
        name: 'main_filter'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    box-shadow: 1px 1px 30px 4px #edf7fc77
    height: 100px

  .main
    .belt
      animation: regression 1.0s
      width: 0%

    &:hover
      .belt
        animation: progress 1.0s
        width: 100%

      @keyframes progress
        0%
          width: 0
        10%
          width: 10%
        20%
          width: 20%
        30%
          width: 30%
        40%
          width: 40%
        50%
          width: 50%
        60%
          width: 60%
        70%
          width: 70%
        80%
          width: 80%
        90%
          width: 90%
        100%
          width: 100%


  @keyframes regression
    0%
      width: 100%
    10%
      width: 90%
    20%
      width: 80%
    30%
      width: 70%
    40%
      width: 60%
    50%
      width: 50%
    60%
      width: 40%
    70%
      width: 30%
    80%
      width: 20%
    90%
      width: 10%
    100%
      width: 0


</style>
