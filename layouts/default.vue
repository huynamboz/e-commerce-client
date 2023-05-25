<template>
	<div class="position-relative">
		<header-top />
		<!-- <list-cate /> -->
		<nuxt id="body"  class="pb-[60px]"/>
		<bottom-footer />
	</div>
</template>
<script>
import headerTop from '~/components/layout/header/header.vue';
import listCate from '~/components/layout/header/listCate.vue';
import BottomFooter from '~/components/layout/footer/BottomFooter.vue';
export default {
	auth: false,
	components: {
		headerTop,
		listCate,
		BottomFooter,
	},
}
</script>