<template>
  <div>
    <search-field />
    <product-list />
  </div>
</template>

<script>
import ProductList from './product-list'
import SearchField from './search-field'

export default {
  components: {
    ProductList,
    SearchField,
  },
}
</script>
