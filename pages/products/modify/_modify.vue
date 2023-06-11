<template>
	<section class="page-add">
		<section class="container">
			<h1 class="title" v-if="$route.params.modify">Chỉnh sửa sản phẩm</h1>
			<h1 class="title" v-else>Thêm sản phẩm</h1>
			<div class="line"></div>
			<div class="main flex-row-reverse max-md:flex-col-reverse">
				<div class="main-right grid max-md:flex max-md:flex-col">
						<div class="inp-container">
							<label for="">Tên sản phẩm <span style="color:red">*</span></label>
							<input :class="{'border-[1px] border-rose-500': ProductData.name.length == 50}" type="text" placeholder="Tên sản phẩm" maxlength="50" v-model="ProductData.name">
							<p v-show="ProductData.name.length == 50" class="text-sm text-rose-500">Tên tối đa 50 ký tự</p>
						</div>
						<div class="inp-container">
							<label for="">Giá <span style="color:red">*</span></label>
							<input :class="{'border-[1px] border-rose-500': isNaN(ProductData.price) || ProductData.price < 0 || ProductData.price > 1000000000}" type="text" placeholder="100000" v-model="ProductData.price">
							<p class="pl-5">{{ $product.formatPrice(ProductData.price) }}</p>
							<p v-show="isNaN(ProductData.price) || ProductData.price < 0 || ProductData.price > 1000000000" class="max-w-[350px] text-sm text-rose-500">Giá tiền phải nằm trong khoảng {{ $product.formatPrice(0) }} - {{ $product.formatPrice(1000000000) }}</p>
						</div>
						<div class="inp-container">
							<label for="">Giảm giá(%) <span style="color:red">*</span></label>
							<input :class="{'border-[1px] border-rose-500': isNaN(ProductData.discount) || ProductData.discount < 0 || ProductData.discount > 100}" type="text" placeholder="10" v-model="ProductData.discount">
							<p v-show="isNaN(ProductData.discount) || ProductData.discount < 0 || ProductData.discount > 100" class="max-w-[350px] text-sm text-rose-500">Giảm giá phải nằm trong khoảng {{ $product.formatPrice(0) }} - {{ $product.formatPrice(1000000000) }}</p>
						</div>
						<div class="inp-container">
							<label for="">Tình trạng <span style="color:red">*</span></label>
							<select class="ml-4 mt-2 w-fit p-3 rounded-md bg-[#f1f3f5] cursor-pointer"
							color="success"
							placeholder="Chọn tình trạng"
							v-model="ProductData.status"
							>
							<option value="">Chọn tình trạng</option>
								<option label="Mới" value="1">
								Mới
								</option>
								<option label="Như mới" value="2">
								Như mới
								</option>
								<option label="Đã qua sử dụng" value="3">
								Đã qua sử dụng
								</option>
							</select>
						</div>
						
						<div class="inp-container">
							<label for="">Loại mặt hàng <span style="color:red">*</span></label>
							<select class="ml-4 mt-2 w-fit p-3 rounded-md bg-[#f1f3f5] cursor-pointer"
							placeholder="Chọn loại"
							v-model="ProductData.category"
							>
									<option value="">Chọn loại</option>
									<option v-for="item in listCategory" :value="item?.id">
									{{ item?.name }}
									</option>
							</select>
						</div>
						<div class="inp-container">
							<label for="">Mô tả <span style="color:red">*</span></label>
							<textarea type="text" placeholder="Mô tả về sản phẩm" maxlength="4900" v-model="ProductData.description"></textarea>
						</div>
						
						
						<!-- <div class="inp-container">
							<label for="key">Từ khóa <span style="color:red">*</span></label>
							<input type="text" placeholder="Bàn ghế, ghế gỗ" v-model="ProductData.keyword">
						</div> -->
						
						<button @click="handleUploadProduct()" class="btn-submit ml-20 h-[fit-content]">Đăng</button>
				</div>
				
				<choose-file @updateFile="updateFile" :listIMG="ProductData.thumbnails"/>
				<!-- choose file -->

				<loading v-if="isLoading" />

				<vs-dialog width="550px" not-center v-model="alertActive">
					<template #header>
					<h4 class="not-margin">
						<b>Tài khoản chưa kích hoạt</b>
					</h4>
					</template>


					<div class="con-content">
					<p>
						Bạn phải kích hoạt tài khoản để có thể đăng tin bán <br/>
						Vui lòng cập nhật đầy đủ thông tin tài khoản bằng cách <b><a href="/user/settings">bấm vào đây</a></b>
					</p>
					</div>

					<template #footer>
					<div class="con-footer">
						<vs-button @click="$router.push('/user/settings')" transparent>
						<b>OK</b>
						</vs-button>
					</div>
					</template>
				</vs-dialog>
			</div>
			<!-- <div class="list-product">
				<div class="item-product" v-for="item in dataProduct" :key="item.product_id"
					@click="$router.push(`/product/${item.id}`)">
					<img :src="item.thumbnail_url" alt="" class="item-product-img">
					<div class="item-product-content">
						<div class="item-product-name">{{ item.name }}</div>
						<div class="item-product-price">{{ formatPrice(item.price) }}</div>
					</div>
				</div>
			</div> -->
		</section>
		<div class="listcompare">
			<div v-for="(item,index) in listCompare" :key="index" class="item-cmp">
				<img :src="item?.thumbs[0].image" alt="" class="img-cmp">
				<p>{{ item?.name }}</p>
				<p>{{ item?.priceShow }}</p>
			</div>
		</div>
	</section>
</template>
<script>
import loading from '~/components/loading/main.vue'
import ChooseFile from '~/components/common/ChooseFile.vue';
export default {
	layout: 'default',
	auth: 'login',
	components: {
		loading,
		ChooseFile
	},
	data() {
		return {
			ProductData:{
				name: "",
				price: "",
				description: "",
				thumbnails: [],
				thumbnail: "",
				category: "",
				keyword: "",
				discount: 0,
				status: "",
			},
			
			alertActive: false,
			previewUrl: [],
			listFile: [],
			fileInput: null,
			isLoading: false,
			dataProduct: null,
			listCompare: null,
			listCategory: [{
				id: 1,
				name: "Đồ điện tử",
			}],
		}
	},
	mounted() {
		console.log(this.$auth.user)
		console.log(this.$route.params.modify)
		this.fetchCategory();
		if(this.$route.params.modify){
			this.fetchProduct()
		}
	},
	methods: {
		fetchCategory() {
			this.$axios.$get('/products/categories')
				.then(res => {
					this.listCategory = res.data;
					console.log('res', res.data);
				})
		},
		validateCost(val, min, max, label){
			console.log(isNaN(val))
			if(!isNaN(val) && val >= min && val <= max){
				return false
			}
			return label + " phải là số và nằm trong khoảng từ " + min + " đến " + max
		},
		updateFile(listFile, listImgInit){
			console.log("emit success",listFile)
			this.listFile = listFile;
			this.ProductData.thumbnails = listImgInit
		},
		async fetchProduct(){
			try {
				await this.$api.products.getProductById(this.$route.params.modify)
				.then(res=>{
					console.log(res)
					this.ProductData = res.data.data
					this.ProductData.category = this.ProductData.category_id;
					this.ProductData.status = this.ProductData.status_id;
					console.log("data",this.ProductData)
					this.ProductData.description = JSON.parse(this.ProductData.description)
					this.previewUrl = this.ProductData.thumbnails;
				})
			} catch (error) {
				if(this.$auth.loggedIn){
				console.log('fetchProduct', this.pageParams);
				this.$api.products.getListProductOfUser(this.$auth.user.id, '1')
					.then(res =>{
						console.log('res', res);
						this.listProduct = res.data.data;
						this.listProduct.forEach(item => {
							if(item.id == this.$route.params.modify){
								this.ProductData = item;
								this.ProductData.category = this.ProductData.category_id;
								this.ProductData.status = this.ProductData.status_id;
								console.log("data",this.ProductData)
								this.ProductData.description = JSON.parse(this.ProductData.description)
								this.previewUrl = this.ProductData.thumbnails;
							}
						})
					})
					.catch(err => {
						console.log('err', err);
					})
			}
			}
		},
		formatPrice(price) {
			let formatter = new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
				minimumFractionDigits: 0
			});
			let formatted = formatter.format(price);
			return formatted;
		},
		fetchAllProduct() {
			this.$axios.get(`http://localhost:5000/api/product/user/${this.$auth.user.user_id}`).then(res => {
				this.dataProduct = res.data.data;
				this.dataProduct.forEach(item => {
					item.description = JSON.parse(item.description);
					item.thumbnail_url = "http://localhost:5000" + item.thumbnail_url;
				})
			})
		},
		async handleUploadProduct(){
			if(this.$route.params.modify){
					await this.updateData()
				} else {
					await this.postData()
				}
		},
		async updateData(){
			try{
				if(this.ProductData.name == "" || this.ProductData.price == "" || this.ProductData.description == ""|| this.ProductData.category == "" || this.ProductData.status == "") {
					this.$toast.error("Vui lòng nhập đầy đủ thông tin",{ duration: 3000 });
					return
				};
				this.isLoading = true;
				let listThumbnail = [];
				let isUploadSuccess = true;
				if (this.listFile.length > 0){
					let formData = new FormData();
					this.listFile.forEach(item => {
						formData.append('files', item);
					});
					await this.$api.products.uploadImage(formData).then(res => {
					listThumbnail = res.data.data;
					console.log(listThumbnail);
					this.$toast.success("Tải ảnh thành công");
					}).catch(err => {
						console.log(err);
						this.isLoading = false;
						isUploadSuccess = false;
						return;
					})
				}
				if(!isUploadSuccess){
					this.$toast.error("Tải ảnh thất bại Vui lòng chọn định dạng ảnh hợp lệ");
					this.isLoading = false;
					return;
				}
				if(this.ProductData.name == "" || this.ProductData.price == "" || this.ProductData.description == ""|| this.ProductData.category == "" || this.ProductData.status == "") {
					this.$toast.error("Vui lòng nhập đầy đủ thông tin",{ duration: 3000 });
					return
				};
				this.ProductData.thumbnails = this.ProductData.thumbnails.filter(item => !item.startsWith("data:image/"));
				this.ProductData.thumbnails = this.ProductData.thumbnails.concat(listThumbnail);
				await this.$api.products.updateProduct({
				name: this.ProductData.name,
				price: this.ProductData.price,
				description: JSON.stringify(this.ProductData.description),
				thumbnailUrls: this.ProductData.thumbnails,
				category_id: this.ProductData.category,
				status_id: this.ProductData.status,
				discount: parseInt(this.ProductData.discount),
				},this.$route.params.modify).then(res => {
					console.log(res);
					this.dataProduct = res.data;
					this.$router.push(`/user/${this.$auth.user.id}`);
					this.$toast.success("Cập nhật thành công", { duration: 3000 });
				}).catch(err => {
					console.log(err);
					this.$toast.error(err.response.data.message,{ duration: 3000 });
					this.isLoading = false;
				})
			} catch (error) {
				console.log(error);
				this.$toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
			}
		},
		async postData() {
			try {
				if(this.ProductData.name == "" || this.ProductData.price == "" || this.ProductData.description == ""|| this.ProductData.category == "" || this.ProductData.status == "") {
					this.$toast.error("Vui lòng nhập đầy đủ thông tin",{ duration: 3000 });
					return
				};
				if(this.$auth.user.active_status == false){
					this.alertActive = true;
					return;
				}
				this.isLoading = true;
				let isUploadSuccess = true;
				if(this.listFile.length == 0){
					this.$toast.error("Vui lòng chọn ảnh");
					this.isLoading = false;
					return;
				}
				let listThumbnail = [];
				let formData = new FormData();
				this.listFile.forEach(item => {
					formData.append('files', item);
				})
				await this.$api.products.uploadImage(formData).then(res => {
					listThumbnail = res.data.data;
					this.$toast.success("Tải ảnh thành công");
				}).catch(err => {
					console.log(err);
					this.isLoading = false;
					isUploadSuccess = false;
					return;
				})
				if(!isUploadSuccess){
					this.$toast.error("Tải ảnh thất bại Vui lòng chọn định dạng ảnh hợp lệ");
					this.isLoading = false;
					return;
				}
				await this.$api.products.addNewProduct ({
					name: this.ProductData.name,
					price: this.ProductData.price,
					description: JSON.stringify(this.ProductData.description),
					thumbnailUrls: listThumbnail,
					category_id: this.ProductData.category,
					status_id: this.ProductData.status,
					discount: parseInt(this.ProductData.discount),
				}).then(res => {
					console.log(res);
					this.dataProduct = res.data;
					this.$router.push(`/user/${this.$auth.user.id}`);
					this.$toast.success("Tạo sản phẩm thành công", { duration: 3000 });
				}).catch(err => {
					console.log(err);
					this.$toast.error(err.response.data.message,{ duration: 3000 });
					this.isLoading = false;
				})
			} catch (error) {
				console.log(error);
				this.isLoading = false;
				this.$toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
			}
		}
	}
}

</script>
<style lang="scss" scoped>
.img-cmp{
	width: 200px;
	height: 200px;
}
.page-add{
	display: flex;
	justify-content: center;
}
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 30px;
	width: 100%;
	max-width: 1240px;
	padding: 20px;
}
.line{
	width: 100%;
	height: 0;
	border-bottom: 1px solid #c9c9c9;
}
.title{
	font-size: 24px;
	font-weight: 600;
	color:#113366;
}
label{
	font-weight: 500;
	color:#091A75; 
}
textarea {
	height: 100px;
	border-radius: 10px;
	padding: 10px;
	margin: 5px 20px;
	border:none;
	background-color: #f1f3f5;
}

input {
	margin: 5px 20px;
	border-radius: 6px;
	padding: 10px 10px;
	// border:none;
	background-color: #f1f3f5;
	/* make slightly boxshadow */
}
input[type="text"], input[type="password"], textarea, select { 
    outline: none;
}
#inp-file {
	display: none;
}

.list-img-preview {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.item-img {
	width: 100px;
	height: 100px;
	border-radius: 6px;
}
.btn-submit{
	border: none;
	border-radius: 5px;
	background-color: #113366;
	max-width: 100px;
	cursor: pointer;
	color: #ffffff;
	padding: 10px 20px;
}
.choose-file {
	padding: 10px;
	height: 100%;
	width: 100%;
	border-radius: 10px;
	background-color: transparent;
	cursor: pointer;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	// background-image: url('~/assets/img/upload-preview.jpg');
	// background-size: cover;
	// background-repeat: no-repeat;
	// background-position: center;
}
.choose-icon{
	position: absolute;
	display: flex;
	align-items: center;
	gap: 10px;
	top: 10px;
	right: 10px;
	font-size: 34px;
	& > p{
		font-size: 14px;
	}
}
.main {
	width: 100%;
	display: flex;
	gap: 50px;
	background-color: #ffffff;
	padding: 20px;
	border-radius: 10px;
	justify-content: flex-end;
	align-items: flex-start;
}
.main-left{
	width: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 10px;
}
.inp-container{
	display: flex;
	flex-direction: column;
}
.main-right{
	width: 100%; 
	flex: 2;
	gap: 10px;
	grid-template-columns: auto auto;
	& > .inp-container:nth-child(1){
		grid-column: 1 / span 2;
	}
	& > .inp-container:nth-child(6){
		grid-column: 1 / span 2;
	}
}

.list-product {
	margin-top: 80px;
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
	width: 800px;
}

.item-product {
	width: 200px;
	/* make slightly boxshadow */
	box-shadow: 0px 11px 20px 0px #9a9a9a42;
	padding: 10px;
	border-radius: 10px;
	cursor: pointer;
}

.item-product-img {
	width: 100%;
	border-radius: 10px;

}

/* i want to make div text max 50px and last line of text have ... */
.item-product-description {
	height: 50px;
	overflow: hidden;
	text-overflow: ellipsis;
}

.item-product-name {
	margin: 5px 0;
	height: 60px;
	font-size: 16px;
	font-weight: 500;
	white-space: pre-wrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.item-product-price {
	font-size: 16px;
	font-weight: 500;
	color: red;
}</style>