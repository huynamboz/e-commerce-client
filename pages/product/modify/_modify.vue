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
							<input type="text" placeholder="Bàn ghế" maxlength="50" v-model="ProductData.name" @change="fetchCompare()">
						</div>
						<div class="inp-container">
							<label for="">Giá <span style="color:red">*</span></label>
							<input type="text" placeholder="100000" v-model="ProductData.price">
						</div>
						<div class="inp-container">
							<label for="">Giảm giá(%) <span style="color:red">*</span></label>
							<input type="text" placeholder="10" v-model="ProductData.discount">
						</div>
						<div class="inp-container">
							<label for="">Tình trạng <span style="color:red">*</span></label>
							<vs-select class="ml-4 mt-2"
							color="success"
							placeholder="Select"
							v-model="ProductData.status"
							>
								<vs-option label="Mới" value="1">
								Mới
								</vs-option>
								<vs-option label="Như mới" value="2">
								Như mới
								</vs-option>
								<vs-option label="Đã qua sử dụng" value="3">
								Đã qua sử dụng
								</vs-option>
							</vs-select>
						</div>
						
						<div class="inp-container">
							<label for="">category <span style="color:red">*</span></label>
							<vs-select class="ml-4 mt-2"
							color="success"
							placeholder="Select"
							v-model="ProductData.category"
							>
								<vs-option label="Mới" value="1">
								Đồ điện tử
								</vs-option>
								<vs-option label="Như mới" value="2">
								Điện thoại
								</vs-option>
								<vs-option label="Đã qua sử dụng" value="3">
								Máy tính bảng
								</vs-option>
							</vs-select>
						</div>
						<div class="inp-container">
							<label for="">Mô tả <span style="color:red">*</span></label>
							<textarea type="text" placeholder="Mô tả về sản phẩm" v-model="ProductData.description"></textarea>
						</div>
						
						
						<!-- <div class="inp-container">
							<label for="key">Từ khóa <span style="color:red">*</span></label>
							<input type="text" placeholder="Bàn ghế, ghế gỗ" v-model="ProductData.keyword">
						</div> -->
						
						<button @click="postData()" class="btn-submit ml-20 h-[fit-content]">Đăng</button>
				</div>
				<div class="main-left">
					<label class="choose-file" for="inp-file"><div class="choose-icon">
						<p>Chọn ảnh</p>
						<i class="fi fi-rr-images"></i>
					</div></label>
					<input type="file" ref="fileInput" accept="image/*" multiple name="" id="inp-file" @change="previewImage($event)">
					<div class="list-img-preview">
						<div  v-for="item in previewUrl" class="relative">
							<i class="fi fi-rr-cross-circle text-white absolute top-2 right-2 cursor-pointer" @click="removeIMG(item)"></i>
							<img :src="item" alt="" class="item-img" v-if="item">
						</div>
					</div>
				</div>

				<loading v-if="isLoading" />
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
import loading from '~/components/loading/loading-style-1.vue'
export default {
	layout: 'default',
	auth:false,
	components: {
		loading
	},
	data() {
		return {
			ProductData:{
				name: "",
				price: "",
				description: "",
				thumbnailsList: "",
				thumbnail: "",
				category: "",
				keyword: "",
				discount: 0,
				status: "",
			},
			
			previewUrl: [],
			listFile: [],
			fileInput: null,
			isLoading: false,
			dataProduct: null,
			listCompare: null
		}
	},
	mounted() {
		// this.fetchAllProduct();
		console.log(this.$auth.user)
		console.log(this.$route.params.modify)
		if(this.$route.params.modify){
			this.fetchProduct()
		}
	},
	methods: {
		removeIMG(item){
			this.previewUrl = this.previewUrl.filter(i=>i!=item)
		},
		async fetchProduct(){
			await this.$api.products.getProductById(this.$route.params.modify)
			.then(res=>{
				console.log(res)
				this.ProductData = res.data
				// this.ProductData.description = JSON.parse(this.ProductData.description)
				// this.ProductData.thumbnail = this.ProductData.thumbnail_url
				this.ProductData.thumbnailsList = this.ProductData.thumbnailsList.map(item=>{
					return item.image
				})
				this.previewUrl = this.ProductData.thumbnailsList
				console.log(this.previewUrl)
			})
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
				console.log(res);
				this.dataProduct = res.data.data;
				console.log("product", this.dataProduct);

				this.dataProduct.forEach(item => {
					item.description = JSON.parse(item.description);
					item.thumbnail_url = "http://localhost:5000" + item.thumbnail_url;

				})
			})
		},
		fetchCompare(){
			console.log(typeof this.ProductData.discount)
		}
		,
		previewImage(event) {
			try {
				let tmp = [];
				tmp = event.target.files;
				for (let i = 0; i < tmp.length; i++) {
					this.listFile.push(tmp[i]);
				}
				this.previewUrl = [];
				this.listFile.forEach(item => {
					const reader = new FileReader();
					reader.readAsDataURL(item);
					reader.onload = () => {
						this.previewUrl.push(reader.result);
					}
				})
				console.log(this.previewUrl);
			} catch (error) {
				console.log(error);
			}
		},
		async postData() {
			try {
				if(this.$auth.user.active_status == false){
					this.$toast.error("Bạn phải cập nhật đầy đủ thông tin tài khoản trước",{duration: 5000});
					return;
				}
				this.isLoading = true;
				console.log(this.$auth.user);
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
				this.$toast.success("Đang tạo sản phẩm");
				await this.$api.products.uploadImage(formData).then(res => {
					console.log(res);
					listThumbnail = res.data;
					this.$toast.success("Tải ảnh thành công");
				}).catch(err => {
					console.log(err);
					this.$toast.error("Tải ảnh thất bại");
					return;
				})
				await this.$api.products.addNewProduct ({
					name: this.ProductData.name,
					price: this.ProductData.price,
					description: JSON.stringify(this.ProductData.description),
					thumbnailUrls: listThumbnail,
					category_id: 1,
					status_id: 1,
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
				// let listFD = [];
				// let formData = new FormData();
				// this.listFile.forEach(item => {
				// 	formData.append('files', item);
				// })
				// await this.$axios.post(process.env.BASE_URL_API +`/thumbnail/${this.dataProduct.id}/upload`, formData, {
				// })
				// 	.then(res => {
				// 		console.log(res);
				// 		this.thumbnail = res.data;
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 		this.isLoading = false;
				// 	})
				// await this.$axios.put(process.env.BASE_URL_API +`/product/${this.dataProduct.id}/thumbnail?imgPath=${this.thumbnail[0].filePath}`, {
				// }).then(res => {
				// 	console.log(res);
				// 	this.isLoading = false;
				// 	this.$router.push(`/product/${this.dataProduct.id}`);
				// }).catch(err => {
				// 	console.log(err);
				// })
			} catch (error) {
				console.log(error);
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
	border:none;
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
	height: 200px;
	width: 100%;
	border-radius: 10px;
	background-color: #ffffff;
	cursor: pointer;
	color: #ffffff;
	blur: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-image: url('~/assets/img/choose.png');
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