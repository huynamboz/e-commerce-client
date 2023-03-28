<template>
	<section class="page-add">
		<section class="container">
			<h1 class="title" v-if="$route.params.modify">Chỉnh sửa sản phẩm</h1>
			<h1 class="title" v-else>Thêm sản phẩm</h1>
			<div class="line"></div>
			<div class="main">
				<label for="">Tên sản phẩm <span style="color:red">*</span></label>
				<input type="text" placeholder="Bàn ghế" v-model="name">
				<label for="">Giá <span style="color:red">*</span></label>
				<input type="text" placeholder="100000" v-model="price">
				<label for="">Mô tả <span style="color:red">*</span></label>
				<textarea type="text" placeholder="Mô tả về sản phẩm" v-model="description"></textarea>
				<label for="">category <span style="color:red">*</span></label>
				<input type="text" v-model="category">
				<label for="">Giảm giá(%) <span style="color:red">*</span></label>
				<input type="text" placeholder="10" v-model="discount">
				<label for="key">Từ khóa <span style="color:red">*</span></label>
				<input type="text" placeholder="Bàn ghế, ghế gỗ" v-model="keyword"><label class="choose-file" for="inp-file">Chọn ảnh</label>
				<input type="file" ref="fileInput" accept="image/*" multiple name="" id="inp-file" @change="previewImage($event)">
				<div class="list-img-preview">
					<img v-for="item in previewUrl" :src="item" alt="" class="item-img" v-if="item">
				</div>
				<button @click="postData()" class="btn-submit">Đăng</button>

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
	</section>
</template>
<script>
import loading from '~/components/loading/loading-style-1.vue'
export default {
	auth:false,
	components: {
		loading
	},
	data() {
		return {
			name: "",
			price: "",
			description: "",
			thumbnail: "",
			category: "",
			keyword: "",
			discount: "",
			previewUrl: [],
			listFile: [],
			fileInput: null,
			isLoading: false,
			dataProduct: null
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
				await this.$axios.post('http://localhost:5000/api/product', {
					user_id: this.$auth.user.user_id,
					name: this.name,
					price: this.price,
					description: JSON.stringify(this.description),
					thumbnail_url: "null",
					category_id: this.category,
					discount: this.discount
				}).then(res => {
					console.log(res);
					this.dataProduct = res.data;
				}).catch(err => {
					console.log(err);
				})
				let listFD = [];
				let formData = new FormData();
				this.listFile.forEach(item => {
					formData.append('files', item);
				})
				await this.$axios.post(`http://localhost:5000/api/thumbnail/${this.dataProduct.id}/upload`, formData, {
				})
					.then(res => {
						console.log(res);
						this.thumbnail = res.data;
					})
					.catch(err => {
						console.log(err);
						this.isLoading = false;
					})
				await this.$axios.put(`http://localhost:5000/api/product/${this.dataProduct.id}/thumbnail?imgPath=${this.thumbnail[0].filePath}`, {
				}).then(res => {
					console.log(res);
					this.isLoading = false;
				}).catch(err => {
					console.log(err);
				})
			} catch (error) {
				console.log(error);
			}
		}
	}
}

</script>
<style lang="scss" scoped>
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
	border: 1px solid #c9c9c9;
}

input {
	margin: 5px 20px;
	border-radius: 6px;
	padding: 10px 10px;
	border: 1px solid #c9c9c9;
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
	width: 200px;
	border-radius: 10px;
	background-color: #ffffff;
	cursor: pointer;
	color: #ffffff;
	blur: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url('~/assets/img/choose.png');
}

.main {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	background-color: #ffffff;
	padding: 20px;
	border-radius: 10px;
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