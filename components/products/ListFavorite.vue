<template>
	<section>
		<div class="overlay fixed top-0 left-0 h-[100vh] w-[100vw] z-10" @click="closeFavorite"></div>
		<div class="p-3 text-sm font-medium border-b-[1px] border-slate-300">Đã yêu thích</div>
		<div class="relative pb-9 pt-3 z-20">
			<div v-if="listFavoriteProduct.length > 0" class="flex flex-col">
				<div v-for="item in listFavoriteProduct" class="px-2 hover:bg-slate-100">
					<div class="flex items-center gap-2 py-1">
						<img :src="item.thumbnails[0]" alt="" class="w-14 h-14 object-cover rounded-[4px]"
							@click="toProduct(item.id)">
						<div class=" flex flex-col w-[240px]" @click="toProduct(item.id)">
							<p class=" whitespace-nowrap overflow-ellipsis overflow-hidden text-xs">{{ item.name }}</p>
							<p class=" text-rose-500 text-base">{{ $product.formatPrice(item.price) }}</p>
						</div>
						<div class="text-sm text-rose-400">
							<i class="fi fi-rr-trash" @click="unFavorite(item.id)"></i>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="flex flex-col justify-center items-center">
				<img src="~/assets/icon/empty.png" alt="">
				<p>Danh sách yêu thích trống</p>
			</div>
			<div class="absolute bottom-0 border-t-[1px] w-full flex justify-center text-xs py-2">Xem tất cả</div>
		</div>
	</section>
</template>
<script>
// props is listFavoriteProduct openFavorite
export default {
	props: {
		listFavoriteProduct: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			baseUrl: process.env.baseUrl,
			fallbackImageUrl: 'https://via.placeholder.com/300x300'
		}
	},
	computed: {
		pageParams() {
			return this.$route.name;
		}
	},
	mounted() {
		console.log("page", this.pageParams);
	},
	watch: {
		pageParams() {
			console.log(this.pageParams);
		}
	},
	methods: {
		toProduct(id) {
			this.$router.push(`/product/${id}`);
			this.closeFavorite();
		},
		async fetchFavoriteProduct(){
			console.log(this.$auth.user.id);
			this.$api.users.getFavoriteProduct()
			.then((response) => {
				console.log(response.data.data, "favorite");
				this.$store.dispatch('addFavoriteStore', response.data.data);
				console.log(this.$store.getters['getListFavoriteProduct'],"store");
			})
		},
		async unFavorite(val){
			console.log(val,"desktop");
			await this.$axios.delete(`/users/me/favorite-products/${val}`).then(res =>{
				this.$toast.success("Đã bỏ yêu thích");
				this.fetchFavoriteProduct();
			}).catch(err =>{
				console.log(err.response)
				this.$toast.error("Có lỗi xảy ra")
			})
		},
		closeFavorite() {
			this.$emit('open-favorite');
		}
	}
}
</script>