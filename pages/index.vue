<template>
    <div class="container">
      <!-- <header-tab /> -->
      <div class="main-content">
		
        <top-category />

      </div>
    </div>
</template>

<script>
import headerTab from '../components/layout/header/header.vue'
import topCategory from '~/components/layout/mainHome/topCategory.vue';
export default {
	layout: 'default',
  name: 'IndexPage',
  components: {
    headerTab,
    topCategory
  },
  mounted() {
	console.log(this.$auth.user);
  }
}
</script>
<style lang="scss" scoped>
body{
    margin: 0;
    padding: 0;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main-content{
    width: 90vw;
}
</style>
