<template>
	<div class="container-top">
		<div class="search-container p-5 max-md:p-2 max-md:flex-col w-full">
			<tab-left @chooseCate="chooseCate" @chooseCity="chooseCity"/>
			<div class="tab-right-container w-full">
				<div class="flex items-center gap-5">
					<p>Tìm kiếm cho từ khóa: <span class=" text-[#ee2624]">{{ pageParams.keyword }}</span></p>
					<p>Danh mục: <span class=" text-lg font-medium">{{ getNameCategory }}</span></p>
				</div>
				<div class="tab-right-header mt-2">
					<div class="list-filter-header">
						<p>Sắp xếp tin đăng</p>
						<button class="fil-btn" :class="{'is-active': isNewest}" @click="handleFilterBtn('isNewest')">Mới nhất</button>
						<button class="fil-btn" :class="{'is-active': isSearchMore}"  @click="handleFilterBtn('isSearchMore')">Tìm kiếm nhiều</button>
					</div>
				</div>
				<div v-if="listProduct.length" class="tab-right-list-item gap-5 max-md:gap-2 flex-wrap mt-4">
					<div v-for="item in listProduct" :key="item.id">
						<product-card :product="item"/>
					</div>
				</div>
				<div v-else class="flex flex-col items-center">
					<img src="~/assets/icon/empty.png" class="w-[200px]" alt="">
					<p>Không có kết quả cho tìm kiếm này</p>
				</div>
				<div class="w-fit mt-5 mb-5">
					<vs-pagination v-model="page" :length="meta.totalPage ? meta.totalPage : 1" />   
				</div>
			</div>
		</div>
		<loading v-show="isLoading"/>
	</div>
</template>
<script>
import tabLeft from '~/components/filter/tabLeft.vue';
import loading from '~/components/loading/main.vue';
import productCard from '~/components/products/productCard.vue';
export default{
	layout:'default',
	auth:false,
	components:{
		tabLeft,
		loading,
		productCard
	},
	data(){
		return{
			isLoading: false,
			isNewest: true,
			isSearchMore: false,
			page: 1,
			meta: {},
			listProduct:[],
			baseUrl: process.env.baseUrl,
			fallbackImageUrl: 'https://via.placeholder.com/300x300',
			category: 'ALL',
			city: 'ALL'
		}
	},
	computed:{
		pageParams(){
			return this.$route.query
		},
		getNameCategory(){
			if (this.category == 'ALL')
				return 'Tất cả danh mục';
			else {
				let cate = this.$store.getters['getListCategory'].find(item => item.id == this.category);
				return cate?.name;
			}
		},
	},
	watch:{
		pageParams:function(){
			this.keyword = this.pageParams.keyword;
			this.fetchData();
			console.log("watch", this.pageParams);
		},
		immediate: true
	},
	mounted(){
		this.keyword = this.pageParams.keyword;
		this.city = this.$route.query.city ? this.$route.query.city : 'ALL';
		this.category = this.$route.query.category ? this.$route.query.category : 'ALL';
		this.fetchData();
	},
	methods:{
		chooseCate(category){
			console.log('choose cate', category);
			this.category = category;
			if (category == 'ALL'){
				if (this.city == 'ALL')
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword}});
				else
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword, city: this.city}});
			} else {
				if (this.city == 'ALL')
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword, category: category}});
				else
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword, category: category, city: this.city}});
			}
		},
		chooseCity(city){
			this.city = city;
			console.log('choose city', city);
			if (city == 'ALL'){
				if (this.category == 'ALL')
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword}});
				else
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword, category: this.category}});
			} else {
				if (this.category == 'ALL')
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword, city: city}});
				else
					this.$router.push({path: '/search', query: {keyword: this.pageParams.keyword, category: this.category, city: city}});
			}
		},
		handleFilterBtn(key){
			switch(key){
				case 'isNewest':
					this.isNewest = true;
					this.isSearchMore = false;
					break;
				case 'isSearchMore':
					this.isNewest = false;
					this.isSearchMore = true;
					break;
			}
		},
		formatPrice(price){
			let formatter = new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
				minimumFractionDigits: 0
				});
			let formatted = formatter.format(price);
			return formatted;
		},
		handleError(event) {
			event.target.src = this.fallbackImageUrl
		},
		async fetchData(){
			console.log('fetch data', this.keyword);
			if (!this.keyword || this.keyword == ''){
				if (this.category != 'ALL'){
					await this.$axios.get(`products/categories/${this.category}/products?page=${this.page}`)
					.then(resp => {
						this.listProduct = resp["data"]["data"]["product"];
						this.meta = resp["data"]["data"]["meta"];
						console.log("resp.data", resp["data"]["data"],this.listProduct);
						this.isLoading = false;
					})
					.catch(err => {
						this.isLoading = false;
						console.log(err);
					})
				}
			} else {
				this.isLoading = true;
				console.log('fetch data', this.$route);
				await this.$api.products.searchProduct(
					this.$route.query.keyword,
					this.city != 'ALL' ? this.city : 'ALL', 
					this.category != 'ALL' ? this.category : 'ALL', 
					this.page)
				.then(resp => {
					console.log(resp);
					this.listProduct = resp["data"]["data"];
					this.meta = resp["data"]["meta"];
					this.isLoading = false;
				})
				.catch(err => {
					this.isLoading = false;
					console.log(err);
				})
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.container-top{
	display: flex;
	justify-content: center;
}
.search-container{
	display: flex;
	padding-top: 40px;
	justify-content: center;
	max-width: 1240px;
}
.list-filter-header{
	display: flex;
	gap: 10px;
	align-items: center;
	padding: 10px;
	background-color: #ffffff;
	align-items: center;
	margin-bottom: 10px;
	border-radius: 10px;
}

.fil-btn{
	border: none;
	background-color: #dcdcdc;
	color: #000000;
	font-weight: 400;
	padding: 10px;
	border-radius: 6px;
	font-size: 16px;
	cursor: pointer;
}
.is-active{
	color: #ffffff;
	background-color: #3d8bfd;
}
.tab-right-list-item{
	display: flex;
	flex-wrap: wrap;
}


</style>