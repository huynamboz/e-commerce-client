<template>
	<div class="container-header">
    <div class="header-container max-w-[1240px] flex items-center max-md:w-full max-md:max-w-full">
        <div class="site-logo" @click="$router.push('/')">
            <img src="~/assets/img/logo-colored.png" alt="" class="logo-site">
        </div>
        <search />
        <div class="list-action flex items-center max-md:hidden">
			<div class="cart action-item relative flex items-center">
					<div class="flex gap-3 items-center" @click="openFavorite" title="Sản phẩm yêu thích">
						<div class="relative">
						<div class="flex items-center justify-center h-7 w-7 rounded-full text-sm bg-white text-rose-500 absolute -left-4 -top-4" v-if="listFavoriteProduct.length > 0">
							{{ listFavoriteProduct.length < 9 ? listFavoriteProduct.length : '9+' }}
						</div>
						<i class="text-white fi fi-rr-heart h-[32px] block"></i>
					</div>
					<div class="text-white text-base rounded-xl font-normal">Yêu thích</div>
					</div>
					<div class="bg-white absolute top-[calc(100%_+_10px)] -left-10 max-md:-left-10 w-[360px] shadow-2xl rounded-xl  open-popup-animate" v-if="isOpenFavorite">
						
						<list-favorite :list-favorite-product="listFavoriteProduct" @open-favorite="openFavorite"/>
					</div>
				</div>


				<!-- <div class="cart action-item" @click="goToCart()" title="Thông báo">
					<i class="fi fi-rr-bell"></i>
				</div>
				<div class="mess action-item" @click="goToMessage()" title="Tin nhắn">
					<i class="fi fi-rr-comment"></i>
				</div> -->
				<div class="profile action-item" @click="handleOpenPopup()">
					<!-- <img src="~/assets/img/profile.png" alt="" class="icon-action"> -->
					<i v-if="!$auth.loggedIn" class="fi fi-rr-user" title="Thông tin shop"></i>
				<div v-else class="relative flex items-center gap-[10px]">
					<div class=" border-[1px] border-gray-400 rounded-full">
						<img v-if="!$auth.user.avatar" src="~/assets/img/defaultavt.webp" alt="" class="w-[30px] h-[30px] rounded-[50%]">
						<img v-else :src="$auth.user.avatar"
						alt="" class="w-[30px] h-[30px] rounded-[50%]">
					</div>
					<div class="text-white text-base rounded-xl font-normal">{{ $auth.user.name }}</div>
					<i class="fi fi-rr-caret-down h-[25px] mb-[4px]"></i>
				</div>
                <!-- <p>Cá nhân</p> -->
                <div class="popup-detail-user" v-if="isShowPopupProfile">
                    <div class="popup-detail-user-content h-fit pb-3">
                        <div class="popup-detail-user-content-header" v-if="$auth.loggedIn">
                            <div class="popup-detail-user-content-header-avatar">
                                <!-- <img src="~/assets/img/avatar.png" alt=""> -->
                            </div>
                            <div class="popup-detail-user-content-header-info">
                                <p class="popup-detail-user-content-header-info-name"><b>Hi </b>{{  $auth.user.name }} <i class="fi fi-rr-badge-check"></i></p>
                                <div class="line"></div>
								<div class="popup-detail-user-content-header-info-product" @click="$router.push(`/user/${$auth.user.id}`)">
									<i class="fi fi-rr-shopping-bag"></i>
									<p class="my-product-title">Bài đăng của tôi</p>
                                </div>
								<div class="btn-setting-user" @click="$router.push('/user/settings')">
									<i class="fi fi-rr-settings-sliders"></i>
									<p class="setting-title">Cài đặt tài khoản</p>
								</div>
								<div class="btn-add-post" @click="$router.push('/product/modify')">
									<i class="fi fi-rr-shopping-bag-add"></i>
									<p class="add-post-title">Đăng sản phẩm mới</p>
								</div>
								<div class="btn-add-post" @click="logout()">
									<i class="fi fi-rr-sign-out-alt"></i>
									<p class="add-post-title">Đăng xuất</p>
								</div>
                            </div>
                        </div>
                        <div class="not-login pt-3" v-else>
							<div class="btn-add-post" @click="$router.push('/login')">
								<i class="fi fi-rr-sign-in-alt"></i>
								<p class="add-post-title">Đăng nhập</p>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import search from '~/components/layout/header/search.vue'
import listFavorite from '~/components/products/ListFavorite.vue'
export default {
    name: 'headerTab',
    components: {
        search,
		listFavorite
    },
    data() {
        return {
            isShow: false,
			isShowPopupProfile: false,
			listFavoriteProduct: [],
			isOpenFavorite: false,
        }
    },
	computed: {
		isLoggedIn() {
			return this.$auth.user;
		},
		listFavoriteStore(){
			return this.$store.getters['getListFavoriteProduct'];
		}
	},
	watch: {
		isLoggedIn: function (val) {
			console.log(this.$auth, "sdfDFS");
			this.$forceUpdate();
		},
		listFavoriteStore: function (val) {
			console.log("favourite change",this.listFavoriteStore)
			this.listFavoriteProduct = val;
		}
	},
	mounted(){
		this.fetchFavoriteProduct();
	},
    methods: {
		toProduct(id){
			this.$router.push(`/product/${id}`);
			this.isOpenFavorite = false;
		},
		openFavorite(){
			this.isOpenFavorite = !this.isOpenFavorite;
			this.isShowPopupProfile = false;
		},
		async fetchFavoriteProduct(){
			console.log(this.$auth.user.id);
			this.$api.users.getFavoriteProduct()
			.then((response) => {
				console.log(response.data.data, "favorite");
				this.listFavoriteProduct = response.data.data;
				this.$store.dispatch('addFavoriteStore', response.data.data);
				console.log(this.$store.getters['getListFavoriteProduct'],"store");
			})
		},
		async unFavorite(val){
			console.log(val,"desktop");
			await this.$axios.delete(`/users/me/favorite-products/${val}`).then(res =>{
				this.$toast.success("Đã bỏ yêu thích");
				this.fetchFavoriteProduct();
			}).catch(err =>{
				console.log(err.response)
				this.$toast.error("Có lỗi xảy ra")
			})
		},
		logout() {
			this.$auth.logout();
			this.$router.push('/');
		},
		handleOpenPopup(){
			this.isShowPopupProfile = !this.isShowPopupProfile;
			this.isOpenFavorite = false;
		},
        goToMessage() {
            if (!this.$auth.loggedIn) {
                this.$router.push('/login')
            }
        },
        goToCart() {
            if (!this.$auth.loggedIn) {
                this.$router.push('/login')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.logo-site {
    height: 50px;
	cursor: pointer;
}
.container-header{
	display: flex;
    background-color: #ee2624;
	border-bottom: 1px solid #e0e0e0;
	justify-content: center;
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
}
.header-container {
    width: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 50px;
	@media screen and (max-width:768px){
		flex-direction: column;
		gap: 20px;
		padding: 15px 20px;
	}
}

.list-action {
    p {
        font-size: 14px;
    }

    gap: 30px;

}
.name-user{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	
}
.action-item {
    display: flex;
    align-items: center;
    font-size: 25px;

    &:hover {
        cursor: pointer;

        & >p {
            color: #0d6efd;
        }

    }
}

.icon-action {
    width: 25px;
    height: 25px;
}

.popup-detail-user{
    position: absolute;
    top: 40px;
    right: -10px;
    z-index: 999;
}
@keyframes openPopUp{
    0%{
        transform: translateY(20px);
        opacity: 0;
    }
    100%{
        transform: translateY(0px);
        opacity: 1;
    }
}
.popup-detail-user-content{
	position: relative;
	width: 200px;
	background-color: #ffffff;
	border-radius: 10px;
	z-index: 1;
	box-shadow: 0 0 20px 10px rgba(179, 179, 179, 0.2);
	animation: openPopUp 0.2s ease-in-out;
	// &::after{
	// 	content: "";
	// 	position: absolute;
	// 	width: 0; 
	// 	height: 0; 
	// 	border-left: 15px solid transparent;
	// 	border-right: 15px solid transparent;
	// 	border-bottom: 15px solid rgb(255, 255, 255);
	// 	top: -10px;
	// 	right: 10px;
	// 	z-index: 0;
	// }
	// &::before{
	// 	content: "";
	// 	position: absolute;
	// 	width: 0; 
	// 	height: 0; 
	// 	border-left: 15px solid transparent;
	// 	border-right: 15px solid transparent;
	// 	border-bottom: 15px solid rgb(255, 255, 255);
	// 	top: -10px;
	// 	right: 10px;
	// 	z-index: 0;
	// }
}
.open-popup-animate{
	animation: openPopUp 0.2s ease-in-out;
}

.profile{
    position: relative;
}
button{
    border: none;
}
.signin-btn{
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    color: #ffffff;
    background-color: #5698fc;
    transition: .2s ease-in-out;
    &:hover{
        cursor: pointer;
        background-color: #1e75f8;
    }
}
.add-product-btn{
	margin-top: 20px;
	width: 100%;
	padding: 10px;
	border-radius: 5px;
	color: #ffffff;
	background-color: #5698fc;
	transition: .2s ease-in-out;
	&:hover{
		cursor: pointer;
		background-color: #1e75f8;
	}
}
.popup-detail-user-content-header-info{
	display: flex;
	flex-direction: column;
	gap: 0px;
}
.btn-setting-user{
	display: flex;
	align-items: center;
	gap:10px;
	padding: 10px 20px;
	cursor: pointer;
	&:hover{
		background-color: #3d8bfd;
		color: #ffffff;
	}
	& > i{
		font-size: 14px;
	}
}
.line{
	border-bottom: 1px solid #e0e0e0;
}
.popup-detail-user-content-header-info-product{
	display: flex;
	padding: 10px 20px;
	gap: 10px;
	&:hover{
		background-color: #3d8bfd;
		color: #ffffff;
	}
	& > i{
		font-size: 14px;
	}
}
.popup-detail-user-content-header-info-name{
	padding: 10px 20px;
}
.btn-add-post{
	display: flex;
	padding: 10px 20px;
	gap: 10px;
	&:hover{
		background-color: #3d8bfd;
		color: #ffffff;
	}
	& > i{
		font-size: 14px;
	}
}
</style>