<template>
	<section class="page-add">
		<section class="container">
			<h1 class="title" v-if="$route.params.modify">Chỉnh sửa sản phẩm</h1>
			<h1 class="title" v-else>Thêm sản phẩm</h1>
			<div class="line"></div>
			<div class="main">
				<div class="main-right">
						<div class="inp-container">
							<label for="">Tên sản phẩm <span style="color:red">*</span></label>
							<input type="text" placeholder="Bàn ghế" v-model="newProductData.name" @change="fetchCompare()">
						</div>
						<div class="inp-container">
							<label for="">Giá <span style="color:red">*</span></label>
							<input type="text" placeholder="100000" v-model="newProductData.price">
						</div>
						<div class="inp-container">
							<label for="">Giảm giá(%) <span style="color:red">*</span></label>
							<input type="text" placeholder="10" v-model="newProductData.discount">
						</div>
						<div class="inp-container">
							<label for="">Tình trạng <span style="color:red">*</span></label>
							<input type="text" placeholder="Đã qua sử dụng" v-model="newProductData.status">
						</div>
						<div class="inp-container">
							<label for="">category <span style="color:red">*</span></label>
							<input type="text" v-model="newProductData.category">
						</div>
						<div class="inp-container">
							<label for="">Mô tả <span style="color:red">*</span></label>
							<textarea type="text" placeholder="Mô tả về sản phẩm" v-model="newProductData.description"></textarea>
						</div>
						<div class="inp-container">
							<label for="">Thumbnails(mỗi link xuống dòng)<span style="color:red">*</span></label>
							<textarea type="text" placeholder="Link ảnh" v-model="newProductData.thumbnailsList"></textarea>
						</div>
						
						<div class="inp-container">
							<label for="key">Từ khóa <span style="color:red">*</span></label>
							<input type="text" placeholder="Bàn ghế, ghế gỗ" v-model="newProductData.keyword">
						</div>
						
						<button @click="postData()" class="btn-submit">Đăng</button>
				</div>
				<div class="main-left">
					<label class="choose-file" for="inp-file"><div class="choose-icon">
						<p>Chọn ảnh</p>
						<i class="fi fi-rr-images"></i>
					</div></label>
					<input type="file" ref="fileInput" accept="image/*" multiple name="" id="inp-file" @change="previewImage($event)">
					<div class="list-img-preview">
						<img v-for="item in previewUrl" :src="item" alt="" class="item-img" v-if="item">
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
			newProductData:{
				name: "",
				price: "",
				description: "",
				thumbnailsList: "",
				thumbnail: "",
				category: "",
				keyword: "",
				discount: "",
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
	},
	methods: {
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


			} catch (error) {
				console.log(error);
			}
		},
		async postData() {
			try {
				this.isLoading = true;
				console.log(this.$auth.user);
				await this.$axios.post(process.env.BASE_URL_API +'/products', {
					name: this.newProductData.name,
					price: this.newProductData.price,
					description: JSON.stringify(this.newProductData.description),
					thumbnails: this.newProductData.thumbnailsList.split("\n"),
					category_id: 1,
					discount: this.newProductData.discount,
					keyword: this.newProductData.keyword,
					product_status : "Đã qua dùng"
				}).then(res => {
					console.log(res);
					this.dataProduct = res.data;
					this.$router.push(`/product/${this.dataProduct.id}`);
				}).catch(err => {
					console.log(err);
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
	border-radius: 20px;
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
	flex-direction: row-reverse;
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
	display: grid;
	flex: 2;
	gap: 10px;
	grid-template-columns: auto auto;
	& > .inp-container:nth-child(1){
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