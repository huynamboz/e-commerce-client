<template>
	<section class="product-container">
		<div class="page-product">
			<section class="overview-product flex gap-11">
				<div class="list-thumbnail">
					<div class="main-thumbnail">
						<img v-if="currentThumbnail" :src="currentThumbnail" alt="" class="product-thumbnail rounded-lg">
						<img v-else src="~/assets/img/img-none.png" alt="" class="product-thumbnail">
					</div>
					<div class="list-item-thumbnail">
						<div v-if="products.thumbnails.length > 0" class="item-thumbnail" v-for="(item, index) in products?.thumbnails" :key="index">
							<img :src="products.thumbnails[index]" alt="" class="thumbnail-list-item-img" @click="changeThumbnail(index,$event)">
						</div>
					</div>
				</div>

				<div class="info-product-section-2 ">
					<div class="product-info">
					<div class="product-info-content">
						<h1 class="name-product">
							{{ products?.name }}
						</h1>
						<div class="product-cost">
							<div class="product-label-cost flex
							max-md:flex-wrap 
							gap-5 
							items-center 
							max-md:gap-1
							max-md:mb-4">
								Giá :
								<span class="main-cost">{{ formatPrice(products?.price - (products?.price * products?.discount /100)) }}</span>
								<span class="discount-cost" v-if="products?.discount > 0"><del>{{ formatPrice(products?.price) }}</del></span>
								<div class="bg-rose-500 text-white p-1 rounded-md w-fit">
									{{ products?.discount }}% giảm giá
								</div>
							</div>
						</div>
						<div class="grid grid-cols-[auto_auto]  gap-4">
							<div class="w-50">
								<p class="text-gray-500">Loại </p>
							</div>
							<div>Điện tử</div>
							<div>
								<p class="text-gray-500">Trạng thái </p>
							</div>
							<div>Chưa qua sử dụng</div>
							<div class="text-gray-500">
								Vận chuyển
							</div>
							<div>
								<div class="flex gap-1 flex-col">
									<p>Vận chuyển tới <i class="fi fi-rr-truck-side"></i></p>
									<div class="flex gap-3 flex-wrap mt-3">
										<div class="choose-city bg-sky-300 p-1 rounded-lg h-[fit-content] w-fit" >
											<select class="list-select bg-transparent text-sky-700" v-model="currentCity" @change="getDistrict">
											<option value="">Chọn thành phố</option>
											<option v-for="city in cities" :value="city.id" @click="getDistrict(city)">{{ city.name }}</option>
											</select>
										</div>
										<div class="choose-city bg-sky-300 p-1 rounded-lg h-[fit-content] w-fit" >
											<select class="list-select bg-transparent text-sky-700" v-model="currentDistrict">
											<option value="">Chọn quận huyện</option>
											<option  v-for="district in districts" :value="district.id">{{ district.name }}</option>
											</select>
										</div>
									</div>
								</div>
								<div class="flex gap-3 mt-3">
									<p>Cước phí :</p>
									<p>500.000đ</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="supplier-info shadow-lg p-3 rounded-lg w-[400px] mt-5 max-md:w-full">
					<div class="supplier-header flex justify-between">
						<div class="supplier-header-left flex items-center gap-5">
							<div class="supplier-avatar">
								<img src="https://st.chotot.com/storage/images/tips/1_mobile.png" alt="" class="avatar-img">
							</div>
							<div class="supplier-name">
								<p class="font-medium text-base">{{ products?.user?.name }}</p>
								<p class="text-sm">{{ products?.user?.location }}</p>
							</div>
						</div>
						<div class="supplier-header-right">
							<div class="supplier-view-btn">
								<button class="view-profile-btn"><i class="fi fi-rr-shop"></i> Xem trang</button>
							</div>
						</div>
					</div>
					<div class="supplier-action-contact mt-5	">
						<div class="contact-call hover:shadow-md transition hover:duration-500 cursor-pointer w-full bg-blue-400 py-2 px-3 rounded-lg text-white flex justify-center" @click="makeCall()">
							<span class="contact-left-text">{{ products?.user?.phone_number }}</span>
							<span class="contact-right-text">Gọi cho người bán</span></div>
						<div class="contact-message flex items-center gap-2 justify-center mt-5"><i class="fi fi-rr-comment-alt"></i>Chat với người bán</div>
					</div>
				</div>
				<div class="mt-8 flex gap-8">
					<div class="text-rose-500 font-medium cursor-pointer">
						Thêm vào yêu thích <i class="fi fi-rr-heart"></i>
					</div>
					<div class="cursor-pointer">
						Báo cáo sản phẩm <i class="fi fi-rr-flag"></i>
					</div>
				</div>
				<div class="mt-8 flex gap-5 items-center">
					<p>Chia sẻ</p>
					<div><img src="~/assets/icon/fb.svg" alt="" class="h-8 w-8"></div>
					<div><img src="~/assets/icon/mess.svg" alt="" class="h-8 w-8"></div>
					<div><img src="~/assets/icon/zalo.svg" alt="" class="h-8 w-8"></div>
					<div><img src="~/assets/icon/ig.svg" alt="" class="h-8 w-8"></div>
					<a href="https://www.facebook.com/sharer/sharer.php?u=http://103.116.53.105:3000/product/4" target="_blank">
  Share on Facebook
</a>
				</div>
				</div>
			</section>
			<section class="compare-container">
				<div class="compare-container-main">
					<div class="cmp-header">
						<h1 class="compare-title">Xem giá ở những nơi khác</h1>
						<button class="request-new-cmp" @click="fetchCompare()">generate dữ liệu so sánh mới</button>
						<mini-loading v-if="isCrawling"/>
					</div>
					<div class="compare-list">
						<div class="compare-item" v-for="(item,index) in listCompare" :key="index">
							<div class="compare-item-thumbnail">
								<img :src="item?.url_img" alt="" class="compare-item-thumbnail-img">
							</div>
							<div class="compare-item-content">
								<div class="cmp-item-name">
									{{ item?.name }}
								</div>
								<div class="cmp-item-cost">
									{{ item?.cost }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="product-description">
					<div class="product-description-content">
							<div class="product-description-header">
							<h2 class="product-description-header-text">Mô tả sản phẩm</h2>
						</div>
						<div class="product-description-content">
							<pre class="product-description-content-text">
								{{ products?.description }}
								<!-- <textarea name="" :value="product?.description" id="" readonly cols="30" rows="10"></textarea> -->
							</pre>
						</div>
					</div>

					<div class="product-description-recommend">
						<div class="product-description-header-recommend">
							<h2 class="product-description-header-text header-recommend-text">Sản phẩm liên quan</h2>
						</div>
						<div class="product-description-content-recommend">
							<div class="product-description-content-text-recommend">
								<div class="product-item-recommend">
									<div class="product-item-recommend-thumbnail">
										<img :src="currentThumbnail" alt="" class="product-item-thumbnail-img img-item-recommend-right">
									</div>
									<div class="product-item-recommend-info">
										<div class="product-item-recommend-info-name">
											dsvdvsdv
										</div>
										<div class="product-item-recommend-info-cost">
											120.222
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			</section>
		</div>
		
		<!-- <textarea type="text" name="" v-model="t" id=""> </textarea><button @click="test()">acscascascas</button> -->
	</section>
</template>
<script>
import miniLoading from '~/components/loading/mini-loading.vue'
export default {
	components: {
		miniLoading
	},
	auth:false,
	layout: 'default',
	head() {
		return {
		title: this.products.name,
		meta: [
			{ hid: 'description', name: 'description', content: 'Chợ tốt, chợ vip' },
			{ hid: 'keywords', name: 'keywords', content: this.products.name },
			{ hid: 'og:title', property: 'og:title', content: this.products.name },
			{ hid: 'og:description', property: 'og:description', content: 'Mô tả Open Graph' },
			{ hid: 'og:image', property: 'og:image', content: this.products.thumbnails[0] },
			{ hid: 'og:url', property: 'og:url', content: `http://103.116.53.105:3000/product/${this.products.id}` },
			{ hid: 'og:site_name', property: 'og:site_name', content: 'Tên trang web' },
			{ hid: 'og:type', property: 'og:type', content: 'Loại nội dung Open Graph' }
		],
		link: [
			{ rel: 'canonical', href: 'URL-canonical-của-trang' },
			{ rel: 'stylesheet', href: 'URL-của-file-CSS' }
		]
		}
	},
	data() {
		return {
			// data
			cities: [],
			districts: [],
			currentCity:'',
			currentDistrict:'',
			t: "test",
			products: {
				thumbnails: [],
			},
			user: null,
			thumbnail: null,
			currentThumbnail: "",
			listCompare: [],
			isCrawling: false,
		}
	},
	async mounted() {
		await this.fetchData();
		console.log(this.$auth.$storage.getUniversal('user'))
		this.getCities();
		//wait 3s to fetch compare
		setTimeout(() => {
			this.fetchCompare();
		}, 3000);
		// await this.fetchCompare();
	},
	methods: {
		async getDistrict(){
			console.log("ok",this.currentCity)
			await this.$axios.get(`https://api.goship.io/api/ext_v1/cities/${this.currentCity}/districts`)
			.then(res => {
				this.districts = res.data.data;
				console.log(this.districts,"district");
			})
			.catch(err => {
				console.log(err);
			})
		},
		async getCities(){
			// this.$axios.get('https://api.goship.io/api/ext_v1/cities')
			await this.$axios.get('location/cities')
			.then(res => {
				this.cities = res.data;
				console.log(this.cities,"cityyyy");
			})
			.catch(err => {
				console.log(err);
			})
		},
		async fetchCompare(){
			this.isCrawling = true;
			await this.$axios.get(`/products/${this.products.id}/comparisons`,
			//add header
			)
			.then(res=>{
				//search items same name in array
				this.listCompare = res["data"];
				console.log(this.listCompare);
				this.isCrawling = false;
			})
			.catch(err=>{
				console.log(err);
				this.isCrawling = false;
			})
		// 	await this.$axios.post(`https://api.goship.io/api/ext_v1/rates`,
		// 	{"shipment":{"address_from":{"city":"220000","district":"230400"},"address_to":{"city":"230000","district":"231000"},"parcel":{"cod":0,"weight":500,"length":0,"width":0,"height":0}}}).then(res=>{
		// 		console.log(res);
		// 	})
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
		makeCall(){
			window.location.href = `tel:${this.products?.user.phone_number}`
		},
		changeThumbnail(index,ele){
			console.log(ele.target)
			ele.target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
			this.currentThumbnail = this.products.thumbnails[index]
			let listEle = document.querySelectorAll(".thumbnail-list-item-img")
			listEle.forEach((ele) => {
				if (ele.classList.contains("active")) {
					ele.classList.remove("active")
				}
			})
			ele.target.classList.add("active")
			console.log(ele.target)
		},
		async fetchData() {
			// await this.$axios.get(process.env.BASE_URL_API +`${this.$route.params.id}`)
			await this.$api.products.getProductById(this.$route.params.id)
			.then((response) => {
					this.products = response['data']
					// this.products.thumbnails.forEach((ele,index) => {
					// 	this.products.thumbnails[index] = process.env.BASE_URL_IMG + ele
					// })
					console.log("ré",this.products.thumbnails[0])
					this.currentThumbnail = this.products.thumbnails[0]
					this.products.description = JSON.parse(this.products.description)
				})
				.catch((error) => {
					console.log(error)
				})
			console.log(this.products)
			// await this.$axios.get(`https://640b058281d8a32198d72c54.mockapi.io/images/${this.products.id}`)
			// 	.then((response) => {
			// 		this.thumbnail = response.data
			// 		this.currentThumbnail = this.thumbnail.thumbnails[0]
			// 	})
		}
	}
}
</script>
<style lang="scss" scoped>
.product-container {
	margin-top: 60px;
	display: flex;
	justify-content: center;
	@media screen and (max-width:768px) {
		padding: 0 12px;
	}
}
.page-product{
	width: 1180px;
	@media screen and (max-width:768px) {
		width: 100%;
	}
}
.overview-product {
	background-color: #ffffff;
	padding: 40px;
	border-radius: 5px;
	@media screen and (max-width:768px) {
		flex-direction: column;
		padding: 20px;
	}
}
.main-thumbnail{
	display: flex;
	justify-content: center;
	background-color: #e5e5e5;
	border-radius: 5px;
	@media screen and (max-width:768px) {
		width: 100%;
	}
}
.list-item-thumbnail {
	display: flex;
	gap: 12px;
	margin-top: 20px;
	cursor: pointer;
	max-width: 500px;
	overflow-y: auto;
	@media screen and (max-width:768px) {
		width: calc(100vw - 40px);
		max-width: 100%;
	}
}
.product-thumbnail{
	width: 500px;
	height: 500px;
	display: block;
	object-fit: cover;
	@media screen and (max-width:768px) {
		width: 100%;
		
	}
}
.thumbnail-list-item-img {
	width: 100px;
	height: 100px;
	object-fit: contain;
}
.active{
	border: 2px solid #3d8bfd;
	border-radius: 5px;
}
.name-product{
	font-size: 24px;
	font-weight: 500;
	margin-bottom: 20px;
}
.product-cost{
	border-radius: 5px;
}
.product-label{
	display: flex;
	align-items: center;
	gap: 10px;
}

.main-cost{
	font-size: 30px;
	font-weight: 500;
	color: #fa3434;
	margin-right: 0px;
}
.discount-cost{
	font-size: 18px;
	font-weight: 400;
	color: #9b9b9b;
}
.product-type{
	display: flex;
	margin-top: 20px;
	margin-bottom: 12px;
}
.product-label{
	width: 150px;
	color: #909090;
}
.status{
	display: flex;
}

.avatar-img{
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 50%;
	border: 1px solid #e5e5e5;
}


.product-description-header{
	margin-bottom: 20px;
}
.product-description{
	width: 1180px;
	margin-top: 40px;
	display: flex;
	gap: 14px;
	@media screen and (max-width:768px) {
		flex-direction: column;
		width: 100%;
		
	}
}
.product-description-content{
	border: 1px solid #e5e5e5;
	padding: 20px;
	background-color: #ffffff;
}
.product-description-recommend{
	border: 1px solid #e5e5e5;
	padding: 20px;
	background-color: #ffffff;
}
.product-description-content-text{
	word-wrap: break-word;
	white-space: pre-line;
}
.img-item-recommend-right{
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.product-description-header-text{
	font-size: 20px;
	font-weight: 500;
}
.img-item-recommend-right{
	width: 200px;
	height: 200px;
	object-fit: cover;
	border-radius: 5px;
}
.header-recommend-text{
	font-size: 14px;
	font-weight: 400;
}
.product-description-header-recommend{
	background-color: #3d8bfd;
	padding: 10px;
	color: #ffffff;
	margin-bottom: 20px;
	border-radius: 5px;
	box-shadow: 1px 7px 20px 1px #5698fc63;

}
.compare-container-main{
	padding-top: 20px;
}
.compare-title{
	font-size: 24px;
	font-weight: 500;
	padding-bottom: 5px;
	border-bottom: 2px solid #fa3434;
}
.compare-list{
	border: 1px solid #fa3434;
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-radius: 10px;
	background-color: #ffffff;
	padding: 10px;
}
.cmp-header{
	display: flex;
	margin-bottom: 20px;
	gap: 50px;
	align-items: center;
	@media screen and (max-width:768px) {
		flex-direction: column;
	}
}
.request-new-cmp{
	border: none;
	padding: 10px;
	background-color: #ff4131;
	color: #ffffff;
	font-size: 18px;
	border-radius: 6px;
	cursor: pointer;
}
.compare-item{
	padding: 20px;
	display: flex;
	gap: 30px;
	border-radius: 10px;
	//make box shadow slightly
	&:hover{
		box-shadow: 1px 7px 20px 0px rgba(189, 189, 189, 0.75);
	}
}
.cmp-item-name{
	font-size: 18px;
	font-weight: 500;
}
.compare-item-thumbnail-img{
	width: 120px;
	height: 120px;
}
.compare-item-content{
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.cmp-item-cost{
	font-size: 24px;
	color: #fa3434;
	font-weight: 500;
}
</style>