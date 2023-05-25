<template>
	<div class="root flex justify-center pt-[10px]">
		<!-- <header-tab /> -->
		<div class="main-content container mx-auto">

			<div class="w-full bg-white px-5 pt-3 max-md:p-0 max-w-[1140px]">
				<slide-banner />
				<top-category />
			</div>
			<section class="product-container bg-white pt-2 pb-5">
				<div class="product-header mb-2">
					<!-- <div class="product-header-text">
						<h2>Trải nghiệm mua sắm không giới hạn cùng PBL</h2>
						<p>Have good day with my website :)</p>
					</div> -->
					<p class="text-base font-medium">Khám phá sản phẩm</p>
				</div>
				<list-product :listProduct="listProduct" />
			</section>
			<div class="w-fit mt-5 mb-5">
				<vs-pagination v-model="page" :length="meta.totalPages ? meta.totalPages : 2" />   
			</div>
		</div>
	</div>
</template>

<script>
import headerTab from '../components/layout/header/header.vue'
import topCategory from '~/components/layout/mainHome/topCategory.vue';
import listProduct from '~/components/layout/mainHome/listProduct.vue';
import SlideBanner from '~/components/layout/mainHome/SlideBanner.vue';
export default {
	layout: 'default',
	auth: false,
	name: 'IndexPage',
	components: {
		headerTab,
		topCategory,
		listProduct,
		SlideBanner
	},
	data() {
		return {
			listProduct: [],
			meta: {},
			totalPage: 2,
			page: 1,
		}
	},
	computed: {
		pageParams() {
			return this.$route.query.page
		}
	},
	watch: {
		page: function () {
			this.$router.push(`?page=${this.page}`)
			console.log('page', this.page);
		},
		pageParams: function () {
			this.fetchProduct();
		},
		immediate: true
	},
	mounted() {
		console.log(this.$auth.user);
		console.log('fetchProduct', this.$route.query.page);
		this.fetchProduct();
		// this.page = this.$route.query.page || 1;
	},
	methods: {
		fetchProduct() {
			console.log('fetchProduct', this.pageParams);
			this.$api.products.getAllProduct(this.pageParams)
				.then(res =>{
					console.log('res', res);
					this.listProduct = res.data.data;
					this.meta = res.data.meta;
					this.totalPage = this.meta.totalPage;
					this.page = this.meta.currentPage;
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
	max-width: 1140px;
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
