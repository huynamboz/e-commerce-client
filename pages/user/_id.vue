<template>
	<div class="root">
		<div class="mx-auto flex items-start mt-[20px] gap-[10px] max-md:flex-col bg-white w-[1140px]">
			<header class=" rounded-lg shadow-lg flex gap-[20px] items-center flex-col p-[20px] bg-[#ffffff] max-md:w-full max-md:items-center h-fit">
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
							<div @click="$router.push('/user/settings')" v-if="pageParams == $auth.user?.id" class="transition-colors duration-300  hover:bg-[#06a8f5] p-2 w-full rounded-lg bg-[#06a8f5] text-[#ffffff] text-[14px]
							cursor-pointer
							">Chỉnh sửa trang cá nhân</div>
							<div>
								<div class="flex gap-3">
									<img src="~/assets/icon/fb.svg" alt="" class="h-8 w-8">
									<div><img src="~/assets/icon/mess.svg" alt="" class="h-8 w-8"></div>
									<div><img src="~/assets/icon/zalo.svg" alt="" class="h-8 w-8"></div>
									<div><img src="~/assets/icon/ig.svg" alt="" class="h-8 w-8"></div>
								</div>
							</div>
							<div v-if="userData?.id != $auth.user?.id" class="mt-2 bg-[#06a8f5] p-2 w-full rounded-lg text-white">
								Gọi cho shop <i class="fi fi-rr-angle-small-right"></i>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div class="main bg-[#ffffff] p-[20px] min-w-[50%] pt-0 min-h-full max-md:pl-0 max-md:pr-0 flex flex-col items-center max-md:w-full">
				<p class="py-[20px] text-lg">Danh sách sản phẩm</p>
				<div v-if="listProduct.length ==0" class="flex flex-col items-center">
					<img src="~/assets/icon/empty.png" alt="">
					<p>Chưa có sản phẩm</p>
				</div>
				<div class="flex justify-center max-w-[800px] flex-wrap gap-[20px] max-md:gap-3 mb-5">
					<div v-for="item in listProduct" :key="item.id" class="product-item">
						<div class="relative group">
							<productCard :product="item"/>
							<div v-if="pageParams == $auth.user?.id" 
							class="absolute hidden transition-all duration-500 group-hover:block edit-prod top-[50%] left-3 bg-white rounded-xl text-xs py-1 px-2 cursor-pointer" 
							alt="Chỉnh sửa" 
							@click="$router.push(`/product/modify/${item.id}`)">
							Chỉnh sửa <i class="fi fi-rr-pencil"></i>
						</div>
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
					this.userData = res.data.data;
				})
		}
	},
}
</script>