<template>
	<div class="container-filter min-w-[230px]">
		<div class="tabLeft-main bg-white rounded-lg pt-3">
			<h1 class="filter-title pt-3">
				<i class="fi fi-rr-filter"></i> Bộ lọc tìm kiếm
			</h1>
			<div class="filter-category">
				<h2 class="filter-cate-title">Theo danh mục</h2>
				<div class="flex gap-2">
					<label class=" order-2 cursor-pointer font-normal" for="ALL_CATE">Tất cả</label>
					<input class=" order-1" type="radio" name="category" id="ALL_CATE" v-model="currentCate" value="ALL" @change="chooseCate()">
				</div>
				<div class="list-cate">
					<div class="item-cate flex gap-2" v-for="n in viewMoreCate" :key="n">
							<label class=" order-2 cursor-pointer font-normal" :for="n-1">{{listCate[n-1]?.name}}</label>
							<input class=" order-1" type="radio" name="category" :id="n-1" v-model="currentCate" :value="listCate[n-1]?.id" @change="chooseCate()">
					</div>
					<p v-if="viewMoreCate < listCate.length" class="flex items-center cursor-pointer" @click="viewMoreCate = listCate.length">Xem thêm <i class="fi fi-rr-caret-down"></i></p>
					<p v-else class="flex items-center cursor-pointer" @click="viewMoreCate = 6">Thu gọn <i class="fi fi-rr-caret-up"></i></p>
				</div>
			</div>
			<div class="line"></div>
			<div class="filter-city">
				<h2 class="filter-cate-title">Theo địa điểm</h2>
				<div class="flex gap-2">
					<label class=" order-2 cursor-pointer font-normal" for="ALL_CITY">Tất cả</label>
					<input class=" order-1" type="radio" name="city" id="ALL_CITY" v-model="currentCity" value="ALL" @change="chooseCity()">
				</div>
				<div class="list-cate">
					<div class="item-cate" v-for="item in viewMoreCity" :key="item">
						<div class="item-cate-name cursor-pointer flex">
							<label class=" order-2 cursor-pointer font-normal" :for="`city${item-1}`">{{listCity[item-1]?.name}}</label>
							<input class=" order-1" name="city" type="radio" :id="`city${item-1}`" v-model="currentCity" :value="listCity[item-1]?.id" @change="chooseCity()">
						</div>
					</div>
					<p v-if="viewMoreCity < listCate.length" class="flex items-center cursor-pointer" @click="viewMoreCity = listCity.length">Xem thêm <i class="fi fi-rr-caret-down"></i></p>
					<p v-else class="flex items-center cursor-pointer" @click="viewMoreCity = 6">Thu gọn <i class="fi fi-rr-caret-up"></i></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
			return {
			listCate:[],
			viewMoreCate: 6,
			listCity:[],
			viewMoreCity: 6,
			currentCate: 'ALL',
			currentCity: 'ALL',
		}
	},
	computed:{
		pageParams(){
			return this.$route.query;
		}
	},
mounted(){
	this.fetchFilter();
	this.getListCity();
	this.currentCate = this.pageParams.category || 'ALL';
	this.currentCity = this.pageParams.city || 'ALL';
},
methods:{
	chooseCate(){
		console.log(this.currentCate);
		this.$emit('chooseCate', this.currentCate);
	},
	chooseCity(){
		this.$emit('chooseCity', this.currentCity);
	},
	async fetchFilter(){
		await this.$axios.get('/products/categories')
		.then((response) => {
			this.listCate = response.data.data;
			this.$store.dispatch('addCategoryStore', this.listCate);
		})
		.catch((error) => {
			console.log(error);
		})
	},
	getListCity(){
		this.$axios.get('/location/cities')
		.then((response) => {
			this.listCity = response.data.data;
		})
		.catch((error) => {
			console.log(error);
		})
	}

}
}
</script>
<style lang="scss" scoped>
.container{
	min-width: 250px;
}
.tabLeft-main{
	padding: 20px;
	padding-top: 0;
}
.filter-title{
	font-size: 20px;
	font-weight: 600;
	color: #333;
}
.filter-category{
	margin-top: 20px;
}
.item-cate-name{
	display: flex;
	gap: 12px;
}
.filter-cate-title{
	font-size: 16px;
	font-weight: 400;
	color: #333;
	margin-bottom: 10px;
}
.filter-city{
	margin-top: 12px;
}
.line{
	border-bottom: 1px solid #e5e5e5;
	margin-top: 20px;
}
</style>