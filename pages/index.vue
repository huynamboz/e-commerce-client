<template>
    <div class="container">
      <header-tab />
    </div>
</template>

<script>
import headerTab from '../components/layout/header/header.vue'
export default {
  name: 'IndexPage',
  components: {
    headerTab
  }
}
</script>
<style lang="scss" scoped>
body{
    margin: 0;
    padding: 0;
}
</style>
