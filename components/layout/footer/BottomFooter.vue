<template>
	<div class="fixed hidden bottom-0 w-full h-[60px] bg-white z-[1000] max-md:block">
		<div class="w-full h-full flex items-center justify-between px-3">
			<div class="flex flex-col items-center" :class="{'text-[#ee2624]': pageParams == 'index'}" @click="$router.push('/')">
				<i class="fi fi-sr-house-chimney"></i>
				<p class="text-xs">Trang chủ</p>
			</div>
			<div class="flex flex-col items-center" :class="{'text-[#ee2624]': pageParams == 'user-id'}" @click="$router.push(`/user/${$auth.user.id}`)">
				<i class="fi fi-sr-blog-text"></i>
				<p class="text-xs">Quản lý bài</p>
			</div>
			<div class="flex flex-col items-center" :class="{'text-[#ee2624]': pageParams == 'product-modify-modify'}" @click="$router.push(`/product/modify`)">
				<i class="fi fi-sr-edit"></i>
				<p class="text-xs">Đăng bài</p>
			</div>
			<div class="flex flex-col items-center relative">
				<div class=" absolute bottom-[85%] -right-0 h-[25px] w-[25px] rounded-full bg-rose-500 text-white flex justify-center items-center" v-if="listFavoriteProduct.length < 10">{{ listFavoriteProduct.length }}</div>
				<div class=" absolute bottom-[85%] -right-0 h-[25px] w-[25px] rounded-full bg-rose-500 text-white flex justify-center items-center" v-else>9+</div>
				<div class="flex flex-col items-center " @click="openFavorite">
					<i class="fi fi-sr-heart"></i>
					<p class="text-xs">Yêu thích</p>
				</div>
				<div v-if="isOpenFavorite" class="absolute bottom-[calc(100%_+_10px)] -right-20 w-[360px] shadow-2xl rounded-xl bg-white">
					<list-favorite :list-favorite-product="listFavoriteProduct" @open-favorite="openFavorite" />
				</div>
			</div>
			<div class="flex flex-col items-center" :class="{'text-[#ee2624]': pageParams == 'user-settings'}" @click="$router.push(`/user/settings`)">
				<i class="fi fi-sr-circle-user"></i>
				<p class="text-xs">Tài khoản</p>
			</div>
		</div>
	</div>
</template>
<script>
import listFavorite from '~/components/products/ListFavorite.vue';
export default {
	components:{
		listFavorite
	},
	data() {
		return {
			baseUrl: process.env.baseUrl,
			fallbackImageUrl: 'https://via.placeholder.com/300x300',
			isOpenFavorite: false,
			listFavoriteProduct: []
		}
	},
	computed:{
		pageParams(){
			return this.$route.name;
		},
		listFavoriteStore(){
			return this.$store.getters['getListFavoriteProduct'];
		}
	},
	mounted(){
		console.log("page",this.pageParams);
	},
	watch:{
		pageParams(){
			console.log(this.pageParams);
		},
		listFavoriteStore(){
			this.listFavoriteProduct = this.listFavoriteStore;
		}
	},
	methods:{
		openFavorite(){
			console.log("open");
			this.isOpenFavorite = !this.isOpenFavorite;
		}
	}
}
</script>