<template>
	<section class="product-container">
		<div class="page-product">
			<section class="overview-product flex gap-11">
				<div class="list-thumbnail">
					<div class="main-thumbnail">
						<img @click="isOpenZoom = true" v-if="currentThumbnail" :src="currentThumbnail" alt="" class="product-thumbnail cursor-zoom-in rounded-lg">
						<img v-else src="~/assets/img/img-none.png" alt="" class="product-thumbnail">
					</div>
					<div v-show="isOpenZoom" class="fixed transition-opacity z-[99999] top-0 left-0 w-[100vw] h-[100vh]">
						<div class="relative w-full h-full p-5 flex justify-center items-center">
							<p @click="isOpenZoom = false" class="text-white absolute top-2 right-5 cursor-pointer z-20">Đóng x</p>
							<!-- <div class="absolute top-[50%] left-5 z-20 text-white text-[30px]">
								<i class="fi fi-rr-arrow-left"></i>
							</div> -->
							<div class="relative z-20 flex justify-center items-center flex-col h-fit w-fit">
								<img :src="currentThumbnail" alt="" class="product-thumbnail cursor-zoom-in rounded-lg">
								<div class="list-item-thumbnail">
									<div v-if="products.thumbnails.length > 0" class="item-thumbnail" v-for="(item, index) in products?.thumbnails" :key="index">
										<img :src="products.thumbnails[index]" alt="" class="thumbnail-list-item-img" @click="changeThumbnail(index,$event)">
									</div>
								</div>
							</div>
							<!-- <div class="absolute top-[50%] right-5 z-20 text-white text-[30px]">
								<i class="fi fi-rr-arrow-right"></i>
							</div> -->
						<div @click="isOpenZoom = false" class="absolute top-0 left-0 z-10 bg-black opacity-85 w-full h-full"></div>
						</div>

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
							<div>{{ products.category }}</div>
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
									<p class="cursor-pointer" @click="openPopupShip()">:Xem chi tiết cước phí</p>
								</div>
							</div>
							<div class="text-gray-500">
								Được gửi từ
							</div>
							<div>
								: {{ products?.user?.location }}
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
								<button class="view-profile-btn" @click="$router.push(`/user/${products?.user.id}`)"><i class="fi fi-rr-shop"></i> Xem trang</button>
							</div>
						</div>
					</div>
					<div class="supplier-action-contact mt-5	">
						<div class="contact-call hover:shadow-md transition hover:duration-500 cursor-pointer w-full bg-blue-400 py-2 px-3 rounded-lg text-white flex justify-center" @click="makeCall()">
							<span class="contact-left-text">{{ products?.user?.phone_number }}</span>
							<span class="contact-right-text">Gọi cho người bán</span></div>
						<div class="hidden contact-message items-center gap-2 justify-center mt-5"><i class="fi fi-rr-comment-alt"></i>Chat với người bán</div>
					</div>
				</div>
				<div class="mt-8 flex gap-8">
					<div class=" cursor-pointer flex gap-1" >
						<div  v-if="!isInFavorite" class="flex gap-1" :class="{'text-black font-medium':isInFavorite}"  @click="addToFavourite()">
							<p>Thêm vào yêu thích </p>
							<i class="fi fi-rr-heart"></i>
						</div>
						<div v-else class="flex gap-1" :class="{'text-rose-500 font-medium':isInFavorite}"  @click="unFavorite()">
							<p>Đã thêm vào yêu thích</p>
							<i class="fi fi-sr-heart"></i>
						</div>
					</div>
					<div class="cursor-pointer" @click="isOpenReport = true" v-if="products?.user?.id != $auth.user?.id">
						Báo cáo sản phẩm <i class="fi fi-rr-flag"></i>
					</div>
					<div class="flex items-center px-5 justify-center fixed top-0 left-0 h-[100vh] w-[100vw] z-[1000]" v-if="isOpenReport">
							<div class="flex z-[1002] relative flex-col items-center px-5 pb-5 justify-center pt-5 bg-white h-[300px] rounded-2xl w-[300px] max-md:w-full">
								<h1 class="font-lg">Nội dung báo cáo</h1>
								<div class=" absolute top-2 right-2 cursor-pointer" @click="isOpenReport = !isOpenReport">
									<i class="fi fi-rr-cross-circle"></i>
								</div>
								<textarea v-model="contentReport" placeholder="Noi dung bao cao" name="" id="" cols="30" rows="10" class="w-full h-full border-[1px] rounded-2xl outline-none p-5">

								</textarea>
								<button class="w-full py-1 
								bg-blue-200 
								text-blue-800 
								rounded-lg mt-3 
								cursor-pointer 
								transition duration-500
								hover:bg-blue-500  
								hover:text-white" @click=report()>Báo cáo</button>
						</div>
						<div class="h-full w-full bg-gray-400 absolute top-0 left-0 z-[1001] opacity-50" @click="isOpenReport = !isOpenReport">

						</div>
					</div>
				</div>
				<div class="mt-8 flex gap-5 items-center">
					<vs-button
						flat
						@click="popupShare=!popupShare"
						>
						Chia sẻ liên kết
					</vs-button>
					<vs-dialog width="550px" not-center v-model="popupShare">
						<div class="con-content">
						<div>
							<p>Sao chép liên kết</p>
							<div class="flex items-center">
								<input type="text" :value="`https://superbad.store/product/${products?.id}`" disabled class=" bg-slate-200 rounded-md p-1 w-full h-fit">
								<vs-button margin="0" @click="saveToClipboard(`https://superbad.store/product/${products?.id}`)">
									<i class="fi fi-rr-copy-alt"></i>
								</vs-button>
							</div>
						</div>
						</div>
					</vs-dialog>
					<div>
						<a href="https://www.facebook.com/sharer/sharer.php?u=http://superbad.store/product/4" target="_blank">
							<img src="~/assets/icon/fb.svg" alt="" class="h-8 w-8">
						</a></div>
					<div><img src="~/assets/icon/mess.svg" alt="" class="h-8 w-8"></div>
					<div><img src="~/assets/icon/zalo.svg" alt="" class="h-8 w-8"></div>
					<div><img src="~/assets/icon/ig.svg" alt="" class="h-8 w-8"></div>
					
				</div>
				</div>
			</section>
			<!-- <section class="compare-container">
				<div class="compare-container-main">
					<div class="cmp-header">
						<h1 class="compare-title">Xem giá ở những nơi khác</h1>
						<button class="request-new-cmp" @click="fetchCompare()">generate dữ liệu so sánh mới</button>
						<mini-loading v-if="isCrawling"/>
					</div>
					<div class="compare-list">
						
					</div>
				</div>
			</section> -->
			<section class="product-description">
					<div class="flex flex-col w-full">
						<div class="product-description-content w-full">
							<div class="product-description-header flex gap-5 cursor-pointer">
								<h2 class="product-description-header-text max-md:text-[18px]" :class="{'border-b-[2px] w-fit border-red-500': detailType== 'DESCRIPTION'}" @click="detailType='DESCRIPTION'">Mô tả sản phẩm</h2>
								<div class="h-[30px] w-[2px] bg-slate-300"></div>
								<h2 class="product-description-header-text max-md:text-[18px]" :class="{'border-b-[2px] w-fit border-red-500': detailType== 'COMPARE'}" @click="detailType='COMPARE'">So sánh giá <i class=" translate-y-1 fi fi-rr-tags"></i></h2>
								<div class="h-[30px] w-[2px] bg-slate-300"></div>
								<h2 class="product-description-header-text max-md:text-[18px]" @click="scrollToReview()">Đánh giá <i class="fi fi-rr-comment-alt"></i></h2>
							</div>
							<div class="product-description-content">
								<pre class="product-description-content-text" v-if="detailType=='DESCRIPTION'">
									{{ products?.description }}
									<!-- <textarea name="" :value="product?.description" id="" readonly cols="30" rows="10"></textarea> -->
								</pre>
								<div v-else class="">
									<div class="compare-item" v-for="(item,index) in listCompare" :key="index">
										<div class="compare-item-thumbnail">
											<img :src="handleImgCrawl(item?.img_url)" alt="" class="compare-item-thumbnail-img object-cover">
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
						</div>
						<review-content :product="products" id="review" :listReview="listReview" @fetch-reviews="fetchReviews"/>
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
		<div :class="{'close-popup': !isOpenPopupShip,'show-popup': isOpenPopupShip}" class=" z-[99999]  py-6 w-[100vw] h-[100vh] flex items-center justify-center fixed top-0 left-0 max-md:p-5">
				<div class="p-5 max-md:p-2 border-2 border-gray-300 rounded-lg bg-white h-full shadow-2xl relative z-[99999] max-md:h-[70vh] max-md:overflow-y-scroll">
					<div class="absolute top-3 right-3">
						<i class="fi fi-rr-cross-circle text-black text-xl absolute top-2 right-2 cursor-pointer" @click="closePopupShip()"></i>
					</div>
					<div class="text-rose-500 font-semibold text-lg" v-if="costShipping.length > 0">Cước phí dự tính</div>
					<div class="text-rose-500 font-semibold text-lg px-6" v-else>Vui lòng chọn địa điểm</div>
					<div class="overflow-y-scroll h-[88%]">
						<div  v-for="item in costShipping" :key="item.id"  class="flex gap-5 items-center justify-between p-4 border-b-2">
						<div class="flex gap-5 items-center max-md:flex-col max-md:items-center max-md:gap-0">
							<img :src="item.carrier_logo" alt="" class="h-16 w-16 max-md:w-12 max-md:h-12">
							<p class="text-center">{{ item.carrier_name }}</p>
						</div>
						<div>
							{{item.expected}}
						</div>
						<div>
							Cước phí: <span class="text-rose-500 text-lg font-medium">{{ formatPrice(item.total_fee) }}</span>
						</div>
					</div>
					</div>
				</div>
				<!-- <div class="w-full h-full bg-slate-50 absolute top-0 left-0 z-0 opacity-80"></div> -->
			</div>
		<!-- <textarea type="text" name="" v-model="t" id=""> </textarea><button @click="test()">acscascascas</button> -->
	</section>
</template>
<script>
import miniLoading from '~/components/loading/mini-loading.vue';
import ReviewContent from '~/components/common/ReviewContent.vue';
import { filterReviewByProductId } from '~/services/reviews';
export default {
	data() {
		return {
			// data
			detailType: 'DESCRIPTION',
			cities: [],
			districts: [],
			currentCity:'',
			currentDistrict:'',
			isOpenReport:false,
			popupShare: false,
			t: "test",
			products: {
				thumbnails: [],
			},
			user: null,
			thumbnail: null,
			currentThumbnail: "",
			listCompare: [],
			isCrawling: false,
			costShipping: [],
			isOpenPopupShip: false,
			listFavorite:[],
			isInFavorite:false,
			contentReport:"",
			listReview:[],
			listCategory:[],
			productStatus: '',
			isOpenZoom: false,
		}
	},
	async asyncData({ query, store }) {
        const { make, model, cardID } = query;
        // Validate query params

        // fetch data from API
        try {
            await this.$api.products.getProductById(this.$route.params.id)
			.then((response) => {
					this.products = response['data']
					console.log("ré",this.products.thumbnails[0])
					this.currentThumbnail = this.products.thumbnails[0]
					this.products.description = JSON.parse(this.products.description)
					console.log(this.products.description)
				})
        } catch (error) {
            // Redirect to error page or 404 depending on server response
        }
    },
	components: {
		miniLoading,
		ReviewContent,
	},
	auth:false,
	layout: 'default',
	
	watch: {
		currentDistrict: function (val) {
			this.getShipping();
		},
		isOpenReport: function (val) {
			if (val) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
		},
		isOpenPopupShip: function (val) {
			if (val) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
		},
		listFavoriteStore: function (val) {
			console.log("favourite change",this.listFavoriteStore)
			this.listFavorite = val;
			this.checkIsInListFavorite();
		}
	},
	computed: {
		listFavoriteStore(){
			return this.$store.getters['getListFavoriteProduct'];
		}
	},
	async mounted() {
		await this.fetchData();
		this.getCities();
		this.fetchCompare();
		this.fetchFavorite()
		this.fetchReviews();
	},
	head() {
		return {
		title: this.products?.name,
		meta: [
			{ hid: 'description', name: 'description', content: 'Chợ tốt, chợ vip chợ mua bán cực nhanh' },
			{ hid: 'keywords', name: 'keywords', content: this.products.name },
			{ hid: 'og:title', property: 'og:title', content: this.products?.name },
			{ hid: 'og:description', property: 'og:description', content: 'Nơi giao lưu mua bán sản phẩm không giới hạn' },
			{ hid: 'og:image', property: 'og:image', content: this.products.thumbnails[0] },
			{ hid: 'og:url', property: 'og:url', content: `https://superbad.store/product/${this.products.id}` },
			{ hid: 'og:site_name', property: 'og:site_name', content: 'Chợ siêu tốt' },
			{ hid: 'og:type', property: 'og:type', content: 'Loại nội dung Open Graph' }
		],
		link: [
			{ rel: 'canonical', href: 'URL-canonical-của-trang' },
			{ rel: 'stylesheet', href: 'URL-của-file-CSS' }
		]
		}
	},
	methods: {
		scrollToReview(){
			let ele = document.getElementById("review");
			ele.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
		},
		async fetchReviews(){
			try {
				console.log("fetch reviews")
				const res = await this.$api.users.getReviewsOfUser(this.products.user.id)
				console.log("comments",res)
				this.listReview = filterReviewByProductId(this.products.id,res.data.data)
				console.log("comments",this.listReview)
			} catch (error) {
				console.log("review",error)
			}
		},
		saveToClipboard(val){
			navigator.clipboard.writeText(val).then(() => {
				this.$toast.success("Đã copy")
			}).catch(() => {
				this.$toast.error("Có lỗi xảy ra")
			})
		},
		handleImgCrawl(val){
			if(val.startsWith("data:")){
				return "https://logovina.com/wp-content/uploads/2020/07/logo-shopee.jpg"
			}
			return val;
		},
		async report(){
			if(!this.$auth.loggedIn){
				this.$toast.error("Bạn cần đăng nhập để báo cáo")
				return;
			}
			if(this.contentReport == ""){
				this.$toast.error("Bạn cần nhập nội dung báo cáo")
				return;
			}
			await this.$axios.post(`/products/${this.products.id}/reports`,{
				description: this.contentReport
			}).then(res => {
				this.$toast.success("Đã báo cáo")
				this.isOpenReport = false;
			}).catch(err => {
				this.$toast.error("Có lỗi xảy ra")
			})
		},
		async unFavorite(){
			await this.$axios.delete(`/users/me/favorite-products/${this.products.id}`).then(res =>{
				this.$toast.success("Đã bỏ yêu thích")
			}).catch(err =>{
				console.log(err.response)
				this.$toast.error("Có lỗi xảy ra")
			})
			await this.fetchFavorite();
		},
		checkIsInListFavorite(){
			this.isInFavorite = this.listFavorite.filter(item => item.id == this.products.id).length > 0 ? true : false;
		},
		async fetchFavorite(){
			if(this.$auth.loggedIn){
				await this.$axios.get(`/users/me/favorite-products?page=1`).then(res =>{
				this.listFavorite = res.data.data;
				this.checkIsInListFavorite();
				this.$store.dispatch('addFavoriteStore', res.data.data);
				}).catch(err =>{
					console.log(err.response)
				})
			}
		},
		async addToFavourite(){
			if(!this.$auth.loggedIn){
				this.$toast.error("Vui lòng đăng nhập trước")
				return;
			}
			await this.$axios.post(`/users/me/favorite-products`,{
				product_id: this.products.id
			}).then(res =>{
				this.$toast.success("Đã thêm sản phẩm vào danh sách yêu thích")
			}).catch(err =>{
				console.log(err.response)
				if(err.response.data.message == "Product is already in your favorite")
				this.$toast.error("Đã có trong iu thít gòyyyy")
			})
			await this.fetchFavorite();
		},
		async getShipping() {
			if (!this.currentCity || !this.currentDistrict) {
				this.$toast.error('Vui lòng chọn địa điểm');
				this.costShipping = [];
				return;
			}
			await this.$axios.post(`https://api.goship.io/api/ext_v1/rates`,
				{
					"shipment": {
						"address_from": {
							"city": 700000,
							"district": 701000
						},
						"address_to": {
							"city": this.currentCity,
							"district": this.currentDistrict
						},
						"parcel": {
							"cod": 0,
							"weight": 500,
							"length": 0,
							"width": 0,
							"height": 0
						}
					}
				}).then(res => {
					console.log(res.data.data);
					this.costShipping = res.data.data;
				}).catch(err => {
					console.log(err);
					this.costShipping = [];
				})
		},
		openPopupShip(){
			if(this.currentCity == "" || this.currentDistrict == ""){
				this.$toast.error("Vui lòng chọn địa điểm")
				return
			}
			this.isOpenPopupShip = true;
		},
		closePopupShip(){
			this.isOpenPopupShip = false;
		},
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
				this.cities = res.data.data;
				console.log(this.cities,"cityyyy",res);
			})
			.catch(err => {
				console.log(err);
			})
		},
		async fetchCompare(){
			this.isCrawling = true;
			await this.$axios.get(`/products/${this.products.id}/prices-comparison`,
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
			await this.$api.products.getProductById(this.$route.params.id)
			.then((response) => {
					this.products = response['data']
					console.log("ré",this.products.thumbnails[0])
					this.currentThumbnail = this.products.thumbnails[0]
					this.products.description = JSON.parse(this.products.description)
					console.log(this.products.description)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}
}
</script>
<style lang="scss" scoped>
.product-container {
	margin-top: 20px;
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
	min-width: 100px;
	min-height: 100px;
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
	min-width: fit-content;
}
.product-description-content-text{
	word-wrap: break-word;
	white-space: pre-line;
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
	margin: 0;
	padding: 0;
}
.img-item-recommend-right{
	width: 100%;
	height: 100%;
	object-fit: cover;
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
.show-popup{
	animation: open 0.2s forwards;
	display: flex;
}
@keyframes open {
	0% {
		opacity: 0;
		transform: scale(0.5);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
.close-popup{
	animation: close 0.5s forwards;
	display: none;
}
@keyframes close {
	0% {
		opacity: 1;
		transform: scale(1);
	}
	100% {
		opacity: 0;
		transform: scale(0.5);
		display: none;
	}
}
</style>