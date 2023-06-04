<template>
	<div class="container-top">
		<div class="search-container p-5 max-md:p-2 max-md:flex-col w-full">
			<tab-left @chooseCate="chooseCate" @chooseCity="chooseCity"/>
			<div class="tab-right-container w-full">
				<p>Tìm kiếm cho từ khóa: <span class=" text-[#ee2624]">{{ pageParams.keyword }}</span></p>
				<div class="tab-right-header mt-2">
					<div class="list-filter-header">
						<p>Sắp xếp tin đăng</p>
						<button class="fil-btn" :class="{'is-active': isNewest}" @click="handleFilterBtn('isNewest')">Mới nhất</button>
						<button class="fil-btn" :class="{'is-active': isSearchMore}"  @click="handleFilterBtn('isSearchMore')">Tìm kiếm nhiều</button>
					</div>
				</div>
				<div class="tab-right-list-item gap-5 max-md:gap-2 flex-wrap mt-4">
					<div v-for="item in listProduct" :key="item.id">
						<product-card :product="item"/>
					</div>
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
		}
	},
	watch:{
		pageParams:function(){
			this.fetchData();
		},
		immediate: true
	},
	mounted(){
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
			this.isLoading = true;
			console.log('fetch data', this.$route);
			await this.$api.products.searchProduct(this.$route.query.keyword, this.page)
			.then(resp => {
				this.listProduct = resp["data"]["data"];
				this.meta = resp["data"]["meta"];
				console.log(resp.data);
				this.isLoading = false;
			})
			.catch(err => {
				this.isLoading = false;
				console.log(err);
			})
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