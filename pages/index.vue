<template>
	<div class="container">
		<!-- <header-tab /> -->
		<div class="main-content">

			<top-category />
			<section class="product-container">
				<div class="product-header">
					<div class="product-header-text">
						<h2>Trải nghiệm mua sắm không giới hạn cùng PBL</h2>
						<p>Have good day with my website :)</p>
					</div>
				</div>
				<list-product :listProduct="listProduct" />
			</section>
			<button @click="$router.push(`?page=${++page}`)">nexxt</button>
		</div>
	</div>
</template>

<script>
import headerTab from '../components/layout/header/header.vue'
import topCategory from '~/components/layout/mainHome/topCategory.vue';
import listProduct from '~/components/layout/mainHome/listProduct.vue';
export default {
	layout: 'default',
	auth: false,
	name: 'IndexPage',
	components: {
		headerTab,
		topCategory,
		listProduct
	},
	data() {
		return {
			listProduct: [],
			page: 1,
		}
	},
	computed: {
		pageParams() {
			return this.$route.query.page
		}
	},
	watch: {
		pageParams: function () {
			this.fetchProduct();
		},
		immediate: true
	},
	mounted() {
		console.log(this.$auth.user);
		console.log('fetchProduct', this.$route.query.page);
		this.fetchProduct();
	},
	methods: {
		fetchProduct() {
			console.log('fetchProduct', this.pageParams);
			this.$api.products.getAllProduct(this.pageParams)
				.then(res =>{
					console.log('res', res);
					this.listProduct = res.data.data;
				})
		}
	}
}
</script>
<style lang="scss" scoped>
body {
	margin: 0;
	padding: 0;
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.main-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1240px;
}
.product-container{
	margin-top: 40px;
}
.product-header-text{
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	margin: 40px 0;
	& > h2{
		font-size: 24px;
		font-weight: 500;
		@media screen and (max-width:768px) {
			text-align: center;
			font-size: 18px;
		}
	}
	& > p{
		padding-bottom: 5px;
		border-bottom: 2px solid #8cb7f5;
		font-size: 16px;
	}
}
</style>
