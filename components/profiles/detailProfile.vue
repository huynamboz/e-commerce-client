<template>
	<div class="profile-container">
		<loading v-if="isLoading" />
		<div class="profile-content">
			<div class="profile-header">
				<div class="relative">
					<!-- <img src="~/assets/img/avatar-default.png" alt="" class="icon-avatar" v-if="user.avatar"> -->
					<img :src="previewUrl[0]" v-if="previewUrl[0] != 'null'" alt="" class="icon-avatar" >
					<img src="~/assets/img/defaultavt.webp" v-else alt="" class="icon-avatar" >
					<div v-if="!$auth.user?.avatar || $auth.user?.avatar == 'null'" class="mt-5 max-w-[80px]">
						<p class="text-rose-400 text-xs">* Chưa cập nhật avatar</p>
					</div>
					<label for="inp-file" class="absolute -right-2 -top-2 cursor-pointer w-[25px] h-[25px] flex items-center justify-center bg-blue-400 text-white rounded-lg">
						<i class="fi fi-rr-edit"></i>
					</label>
					<input type="file" class=" hidden" ref="fileInput" accept="image/*"  name="" id="inp-file" @change="previewImage($event)">
				</div>
				<!-- <h1 class="profile-title">Chỉnh sửa thông tin</h1> -->
				<div class="detail-user">
					<p class=" font-medium">{{ user.name }}</p>
					<div class="flex gap-2">
						Trạng thái : 
						<p class=" text-rose-600" v-if="!$auth.user.active_status">Chưa kích hoạt</p>
						<p v-else>Đã kích hoạt</p>
					</div>
				</div>
			</div>
			<div class="profile-content-info">
				<div class="info-inp">
					<label for="name">Tên</label>
					<input type="text" placeholder="Nguyễn Văn A" class="inp" id="name" v-model="user.name">
					<div>
						<div>
						<label for="male">Nam</label>
						<input type="radio" name="gender" id="male" :value="true" v-model="user.gender" @change="chooseMale()">
						<label for="female">Nữ</label>
						<input type="radio" name="gender" id="female" :value="false" v-model="user.gender" @change="chooseFemale()">
					</div>
					<p v-if="!user.gender" class="text-rose-400 text-xs">* Chưa chọn giới tính</p>
					</div>
				</div>
				<div class="info-inp">
					<label for="name">Email</label>
					<input type="text" class="inp" placeholder="email@gmail.com" id="name" v-model="user.email">
				</div>
				<div class="mb-5">
					<div class="flex flex-col">
					<label for="name">Số điện thoại</label>
					<input :class="{'error-border': !user.phone_number}" class="inp" type="text" placeholder="09876xx" id="name" v-model="user.phone_number">
					</div>
					<p v-if="!user.phone_number" class="text-xs text-rose-400">* Chưa cập nhật số điện thoại</p>
				</div>
				<div class="info-inp">
					<label class="flex gap-3 items-center" for="bday">Ngày sinh: {{ $auth.user?.birthday?.split("T")[0] }} <p class="text-rose-500 cursor-pointer" @click="isOpenEditBirthday = !isOpenEditBirthday"><i class="fi fi-rr-edit"></i>
						<p v-if="!this.$auth.user?.birthday" class="text-rose-400 text-xs">* Chưa cập nhật ngày sinh</p>
					</p></label>
					<input v-if="isOpenEditBirthday" type="date" class="inp w-fit cursor-pointer" placeholder="09876xx" id="name" v-model="user.birthday">
				</div>
				<div class="gap-5 flex-row mb-[20px] flex items-center ">
					<label>Địa chỉ hiện tại :</label>
					<label>{{ this.$auth.user.location }}</label>
					<p class="text-rose-500 cursor-pointer" @click="openEditLocation()"><i class="fi fi-rr-edit"></i>
						<p v-if="!this.$auth.user?.location" class="text-rose-400 text-xs">* Chưa cập nhật địa chỉ hiện tại</p>
					</p>
				</div>
					<div class="address-inp flex gap-5" v-if="isOpenEditLocation">
						<div class="address">
							<label for="City">Thành phố</label>
							<div class="choose-city" >
								<select class="list-select" v-model="currentCity" @change="getDistrict">
								<option value="">Chọn thành phố</option>
								<option v-for="city in cities" :value="city.id" @click="getDistrict(city)">{{ city.name }}</option>
								</select>
							</div>
						</div>
						<div class="address">
							<label for="District">Quận huyện</label>
							<div class="choose-city" >
								<select class="list-select" v-if="districts" v-model="user.district_id">
								<option value="">Chọn quận huyện</option>
								<option  v-for="district in districts" :value="district.id">{{ district.name }}</option>
								</select>
							</div>
						</div>
				</div>
				<div>
					<div class="flex flex-col gap-2 mt-5">
					<label for="bday">Địa chỉ cụ thể: </label>
					<input :class="{'error-border': !user.address}" type="text" class="inp" placeholder="Nhà số xx, đường ..." id="name" v-model="user.address">
					<p v-if="!user.address" class="text-xs text-rose-400">* Chưa cập nhật địa chỉ</p>
					</div>
				</div>
			</div>
			<!-- <div class="flex flex-col mt-5">
				<label for="address">Nhập mật khẩu xác nhận</label>
				<input type="password" name="" id="" class="inp" v-model="user.password">
			</div> -->
			<vs-button class="cursor-pointer" @click="PushDataUser()">Cập nhật</vs-button>
		</div>

	</div>
</template>
<script>
import loading from '~/components/loading/main.vue'
export default {
	components: {
		loading
	},
	data(){
		return {
			value: '',
			name: '',
			email: '',
			number: '',
			currentCity: "",
			isOpenListCity: false,
			isOpenListDistrict: false,
			isOpenEditBirthday: false,
			isLoading: false,
			gender:'',
			cities: [],
			currentDistrict: "",
			districts: [],
			isOpenEditLocation:false,
			previewUrl: [this.$auth.user.avatar ? this.$auth.user.avatar : "null"],
			listFile: [],
			user: {
				avatar: this.$auth.user.avatar ? this.$auth.user.avatar : "null",
				name:this.$auth.user.name,
				email:this.$auth.user.email,
				phone_number:this.$auth.user.phone_number ? this.$auth.user.phone_number : null,
				address:this.$auth.user.address ? this.$auth.user.address : '',
				gender: this.$auth.user.gender,
				avatar: this.$auth.user.avatar ? this.$auth.user.avatar : "null",
				district_id : null,
				birthday: this.$auth.user.birthday ? this.$auth.user.birthday.split("T")[0] : new Date(),
				password:''
			}
		}
	},
	async mounted(){
		await this.getCities();
		await this.getDistrictID()
	},
methods: {
	previewImage(event) {
			try {
				this.listFile = [];
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
		chooseFemale(){
			this.user.gender = false;
		},
		chooseMale(){
			this.user.gender = true;
		},
		async getDistrictID(){
		
			let cityName = this.$auth.user.location?.split(", ")[1];
			let districtName = this.$auth.user.location?.split(", ")[0];
			this.cities.forEach(item =>{
				if(item.name == cityName){
					console.log(item.id,"item");
					this.currentCity = item.id;
				}
			})
			await this.getDistrict();
			this.districts.forEach(district => {
				if(district.name == districtName){
					this.user.district_id = district.id;
					this.currentDistrict = district.id;
				}
			})
		},
		openEditLocation(){
			this.isOpenEditLocation = !this.isOpenEditLocation
		},
		async PushDataUser(){
			this.isLoading = true;
			let isUploadSuccess = true;
			if(this.listFile.length != 0){
				let listThumbnail = [];
				let formData = new FormData();
				this.listFile.forEach(item => {
					formData.append('files', item);
				})
				await this.$api.products.uploadImage(formData).then(res => {
					console.log(res);
					listThumbnail = res.data.data;
					this.user.avatar = listThumbnail[0];
					this.$toast.success("Tải ảnh thành công");
				}).catch(err => {
					console.log(err);
					this.$toast.error("Tải ảnh thất bại");
					this.isLoading = false;
					isUploadSuccess = false;
					return;
				})
			}
			if(!isUploadSuccess){
				this.isLoading = false;
				return;
			}
			this.user.birthday = new Date(this.user.birthday).toISOString();
			console.log(this.user);
			await this.$axios.put('/users/me',this.user)
			.then(res => {
				console.log("res:",res);
				this.$toast.success("Thay đổi thông tin thành công");
				this.isLoading = false;
				// this.user = res.data.data;
				console.log("user:",this.user);
				this.$auth.fetchUser();
				this.listFile = [];
				// this.getDistrictID();
			})
			.catch(err => {
				console.log(err);
				this.isLoading = false;
				this.listFile = [];
				this.previewUrl = [];
				this.$toast.error(this.$handleErrorApi(err));
			})
		},
		chooseDistrict(val){
			this.currentDistrict = val;
			this.isOpenListDistrict = false;
		},
		async getCities(){
			await this.$axios.get('location/cities')
			.then(res => {
				this.cities = res['data']['data'];
				console.log(this.cities,"cityyyy",res.data);
			})
			.catch(err => {
				console.log(err);
			})
		},
		async getDistrict(){
			await this.$axios.get(`/location/cities/${this.currentCity}/districts`)
			.then(res => {
				this.districts = res.data.data;
				console.log(this.districts,"district");
			})
			.catch(err => {
				console.log(err);
			})
		},
		submit(){
			this.$axios.put('/')
		}
	}
}
</script>
<style lang="scss" scoped>
.list-city{
	max-height: 200px;
	overflow-y: scroll;
}
.profile-container{
	width: 100%;
	max-width: 500px;
}
.icon-avatar{
	width: 100px;
	height: 100px;
	border-radius: 15%;
	object-fit: cover;
	box-shadow: 2px 18px 20px 1px rgb(153 153 153 / 56%);
}
.profile-header{
	display: flex;
	gap: 20px;
	align-items: center;
	margin-bottom: 40px;
}
.detail-user{
	display: flex;
	flex-direction: column;
	& > p:nth-child(1){
		font-size: 20px;
	}
	& > p:nth-child(2){
		font-size: 14px;
		color: #6f6f6f;
	}
}
.profile-content{
	width: 100%;
	position: relative;
	z-index: 1;
	background-color: #ffffff;
	border-radius: 20px;
	padding: 20px;
}
.overlay{
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	z-index: 0;
}
.choose-city{
	position: relative;
	cursor: pointer;
}
.list-select{
	border: 1px solid #e5e5e5;
	border-radius: 5px;
	padding: 5px 10px;
	width: 200px;
}
.list-city{
	position: absolute;
	background-color: #ffffff;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	transition: .2s ease-in-out;
	& > div{
		padding: 5px 10px;
		&:hover{
			background-color: #e2e2e2;
			transition: .2s ease-in-out;
		}
	}
}
.open{
	animation: open .5s forwards;
}
.close{
	animation: close .5s forwards;
}
@keyframes open {
	0% {
		height: 0;
	}
	100% {
		height: 200px;
	}
}
@keyframes close {
	0% {
		height: 200px;
	}
	100% {
		height: 0;
	}
}

.info-inp{
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	gap:10px
}
.address-inp{
	display: flex;
	gap:20px;
}
.inp{
	border: none;
	padding: 5px 10px;
	border-radius: 5px;
	height: 40px;
	background-color: #f1f3f5;
	color: #091A75;
}
.submit{
	margin-top: 20px;;
	background-color: #ff4131;
	color: #ffffff;
	border: none;
	padding: 10px 20px;
	border-radius: 2px;
	cursor: pointer;
	&:hover{
		background-color: #d11909;
		transition: .2s ease-in-out;
	}
}
.error-border{
	border: 1px solid red;
}
</style>