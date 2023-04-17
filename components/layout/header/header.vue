<template>
	<div class="container-header">
    <div class="header-container">
        <div class="site-logo" @click="$router.push('/')">
            <img src="~/assets/img/logo-colored.png" alt="" class="logo-site">
        </div>
        <search />
        <div class="list-action">
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
            <div class="profile action-item" @click="">
                <!-- <img src="~/assets/img/profile.png" alt="" class="icon-action"> -->
                <i class="fi fi-rr-user" title="Thông tin shop"></i>
                <!-- <p>Cá nhân</p> -->
                <div class="popup-detail-user">
                    <div class="popup-detail-user-content">
                        <div class="popup-detail-user-content-header" v-if="$auth.loggedIn">
                            <div class="popup-detail-user-content-header-avatar">
                                <!-- <img src="~/assets/img/avatar.png" alt=""> -->
                            </div>
                            <div class="popup-detail-user-content-header-info">
                                <p class="popup-detail-user-content-header-info-name"><b>Hi </b>{{  $auth.user.name }} <i class="fi fi-rr-badge-check"></i></p>
                                <div class="line"></div>
								<div class="popup-detail-user-content-header-info-product">
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
                            </div>
                        </div>
                        <div class="not-login" v-else>
                        <button class="signin-btn" @click="$router.push('/login')">Đăng nhập</button>
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
            isShow: false
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
    background-color: #ffffff;
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
    display: none;
}

.popup-detail-user-content{
	position: relative;
	width: 200px;
	height: 300px;
	background-color: #ffffff;
	border-radius: 10px;
	z-index: 1;
	box-shadow: 0 0 20px 10px rgba(179, 179, 179, 0.2);
	animation: openPopUp 0.2s ease-in-out;
	&::after{
		content: "";
		position: absolute;
		width: 0; 
		height: 0; 
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 15px solid rgb(255, 255, 255);
		top: -10px;
		right: 10px;
		z-index: 0;
	}
	&::before{
		content: "";
		position: absolute;
		width: 0; 
		height: 0; 
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 15px solid rgb(255, 255, 255);
		top: -10px;
		right: 10px;
		z-index: 0;
	}
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
    &:hover{
        .popup-detail-user{
            display: block;
        }
    }
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