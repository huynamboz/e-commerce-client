<template>
	<div class="root">
		<div class="mx-auto flex justify-center items-start mt-[20px] gap-[10px] max-md:flex-col">
			<header class="flex gap-[20px] items-center flex-col p-[20px] bg-[#ffffff] max-md:w-full max-md:items-center">
				<div class="container flex max-md:justify-center">
					<img :src="userData?.avatar" alt="" 
				class="object-cover w-[257px] h-[200px] rounded-[10px]">
				</div>
				<div class="flex flex-col w-[fit-content] min-w-[fit-content] gap-[10px]">
					<div class="info flex flex-col gap-2">
						<h1 class="font-[500] text-[20px] leading-4">{{userData?.name}}</h1>
						<span class="text-[16px] text-gray-600">{{userData?.location}}</span>
					</div>
					<div class="flex gap-[50px]">
						<div class="flex gap-[10px] items-start flex-col">
							<div class="font-[400] text-[15px] flex gap-[10px]">
								<i class="fi fi-rr-box-open"></i> 
								Số sản phẩm: <span class="text-[#3d8bfd]">{{ listProduct?.length }}</span>
							</div>
							<div class="font-[400] text-[15px] flex gap-[10px]">
								<i class="fi fi-rr-calendar-day"></i>
								Ngày tham gia: <span class="text-[#3d8bfd]">{{ userData?.created_at?.split("T")[0] }}</span>
							</div>
							<div @click="$router.push('/user/settings')" v-if="pageParams == $auth.user?.id" class="transition-colors duration-300  hover:bg-[#06a8f5] p-2 px-12 rounded-lg bg-[#06a8f5] text-[#ffffff] text-[14px]
							cursor-pointer
							">Chỉnh sửa trang cá nhân</div>
						</div>
					</div>
				</div>
			</header>
			<div class="main bg-[#ffffff] p-[20px] max-md:pl-0 max-md:pr-0 flex flex-col items-center max-md:w-full">
				<div class="flex justify-center max-w-[800px] flex-wrap gap-[20px] max-md:gap-3 mb-5">
					<div v-for="item in listProduct" :key="item.id" class="product-item">
						<div class="relative">
							<productCard :product="item"/>
							<img v-if="pageParams == $auth.user?.id" src="~/assets/icon/edit-2.png" class="absolute top-[50%] right-0 h-7 w-7 cursor-pointer" alt="Chỉnh sửa" @click="$router.push(`/product/modify/${item.id}`)">
						</div>
					</div>
				</div>
				<div class="w-fit">
					<vs-pagination v-model="page" :length="meta.totalPages ? meta.totalPages : 2"/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import productCard from '~/components/products/productCard.vue'
export default {
	auth:false,
	name: 'Detail',
	components: {
		productCard
	},
	data() {
		return {
			page: 1,
			listProduct: [],
			userData: {},
			meta: {}
		}
	},
	computed: {
		pageParams() {
			return this.$route.params.id
		}
	},
	watch: {
		// watch
		pageParams:function() {
				this.fetchProduct()
			},
			immediate: true,
		}
	,
	created() {
		this.fetchProduct();
		this.fetchUserData();
	},
	methods: {
		fetchProduct() {
			if(this.$auth.loggedIn){
				console.log('fetchProduct', this.pageParams);
				this.$api.products.getListProductOfUser(this.pageParams)
					.then(res =>{
						console.log('res', res);
						this.listProduct = res.data.data;
						this.meta = res.data.meta;
						this.page = res.data.meta.currentPage;
					})
					.catch(err => {
						console.log('err', err);
					})
			}
		},
		fetchUserData() {
			this.$api.users.getUserById(this.pageParams)
				.then(res => {
					console.log('res', res);
					this.userData = res.data;
				})
		}
	},
}
</script>