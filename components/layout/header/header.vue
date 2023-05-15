<template>
	<div class="container-header">
    <div class="header-container flex items-center">
        <div class="site-logo" @click="$router.push('/')">
            <img src="~/assets/img/logo-colored.png" alt="" class="logo-site">
        </div>
        <search />
        <div class="list-action flex items-center">
			<div class="cart action-item" @click="goToCart()" title="Sản phẩm yêu thích">
                <!-- <img src="~/assets/img/noti.png" alt="" class="icon-action"> -->
                <i class="fi fi-rr-heart"></i>
				
                <!-- <p>Giỏ hàng</p> -->
            </div>
            <div class="cart action-item" @click="goToCart()" title="Thông báo">
                <!-- <img src="~/assets/img/noti.png" alt="" class="icon-action"> -->
                <i class="fi fi-rr-bell"></i>
                <!-- <p>Giỏ hàng</p> -->
            </div>
            <div class="mess action-item" @click="goToMessage()" title="Tin nhắn">
                <!-- <img src="~/assets/img/message.png" alt="" class="icon-action"> -->
                <i class="fi fi-rr-comment"></i>
                <!-- <p>Tin nhắn</p> -->
            </div>
            <div class="profile action-item" @click="handleOpenPopup()">
                <!-- <img src="~/assets/img/profile.png" alt="" class="icon-action"> -->
                <i v-if="!$auth.loggedIn" class="fi fi-rr-user" title="Thông tin shop"></i>
				<div v-else class="relative pl-8">
					<div class="absolute left-0 -top-2">
						<img v-if="!$auth.user.avatar" src="~/assets/img/defaultavt.webp" alt="" class="w-[50px] h-[50px] rounded-[50%]">
						<img v-else :src="$auth.user.avatar"
						alt="" class="w-[50px] h-[50px] rounded-[50%]">
					</div>
					<div class="name-user py-2 pl-5 pr-3 border-[1px] text-sm rounded-xl">{{ $auth.user.name }}</div>
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
export default {
    name: 'headerTab',
    components: {
        search,
    },
    data() {
        return {
            isShow: false,
			isShowPopupProfile: false,
        }
    },
	computed: {
		isLoggedIn() {
			return this.$auth.user;
		},
	},
	watch: {
		isLoggedIn: function (val) {
			console.log(this.$auth, "sdfDFS");
			this.$forceUpdate();
		}
	},
    methods: {
		logout() {
			this.$auth.logout();
			this.$router.push('/');
		},
		handleOpenPopup(){
			this.isShowPopupProfile = !this.isShowPopupProfile
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
    background-color: transparent;
	justify-content: center;
	position: relative;
	z-index: 999;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
}
.header-container {
    width: 100%;
    top: 0;
	max-width: 1240px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 50px;
	@media screen and (max-width:768px){
		flex-direction: column;
		gap: 20px;
	}
}

.list-action {
    p {
        font-size: 14px;
    }

    display: flex;
    gap: 30px;

}
.name-user{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	
}
.action-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
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