<template>
	<div class="root flex justify-center pt-[10px]">
		<!-- <header-tab /> -->
		<div class="main-content container mx-auto">

			<div class="w-full bg-white px-5 pt-3 max-md:p-0 max-w-[1140px]">
				<slide-banner />
				<div class="w-full max-md:px-5 flex gap-8 mb-10 mt-10 flex-wrap justify-center">
					<div class="flex flex-col items-center" v-for="(item, index) in listMiniCategory" :key="index">
						<img :src="item.img" alt="" class="w-[50px] h-[50px] object-cover">
						<p class=" max-md:hidden text-center block max-w-[101px] text-[14px] break-words">{{item.name}}</p>
					</div>
				</div>
				<p class=" font-medium mb-4 max-md:pl-5">Danh mục hot <i class="fi fi-ss-flame"></i></p>
				<top-category class="max-md:pl-5"/>
			</div>
			<section class="product-container bg-white pt-2 pb-5">
				<div class="product-header mb-2">
					<!-- <div class="product-header-text">
						<h2>Trải nghiệm mua sắm không giới hạn cùng PBL</h2>
						<p>Have good day with my website :)</p>
					</div> -->
					<p class=" font-medium max-md:pl-5 pl-5 text-lg">Khám phá sản phẩm</p>
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
			listMiniCategory: [
				{
					name: 'Hàng của superBAD.store',
					img: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FlRml-H3PO0o270WLS26nv9eNs5TDVVfiuSVsHXENpIc%2Fpreset%3Araw%2Fplain%2F425fc9c8bdb4d028d8cc52628fbd047d-2804905330699599227.jpg&w=256&q=95'
				},
				{
					name: 'Hàng 9k',
					img: 'https://media3.scdn.vn/img4/2023/05_26/aDMO1nuiJEfGoWUNtwDm.png'
				},
				{
					name: 'Thời trang 99k',
					img: 'https://media3.scdn.vn/img4/2023/05_26/oKNglURsWogSjczyWDqM.png'
				},
				{
					name: 'Đồ công nghệ hot',
					img: 'https://media3.scdn.vn/img4/2023/05_26/uFZsmXEGfRxe9gO5g7EX.png'
				},
				{
					name: 'Đồ gia dụng 199k',
					img: 'https://media3.scdn.vn/img4/2023/05_26/rCjqf4wrNBwzYR7pIcyK.png'
				},
				{
					name: 'Mỹ phẩm free ship',
					img: 'https://media3.scdn.vn/img4/2023/05_26/F4dvtzlfQbNyFLytd5Xb.png'
				},
				{
					name: 'Tin đăng yêu thích',
					img: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FPeH_Zz-8hDT7yZ8F2Mm-BI4p7HWGasDhgq8I_7xdXyk%2Fpreset%3Araw%2Fplain%2Fe16cec7ca2ff9d7649268427ea9c1e4e-2741458979427623023.jpg&w=256&q=95'
				}
			],
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
	margin-top: 10px;
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
