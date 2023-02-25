<template>
    <div class="header-container">
        <div class="site-logo">
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
                                <p class="popup-detail-user-content-header-info-name">Nguyễn Văn A</p>
                                <p class="popup-detail-user-content-header-info-email">
                                </p>
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
</template>
<script>
import search from '~/components/layout/header/search.vue'
export default {
    name: 'headerTab',
    components: {
        search
    },
    data() {
        return {
            isShow: false
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

}

.header-container {
    position: fixed;
    width: 100%;
    top: 0;
    height: 70px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 50px;
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
    color: #6d6d73;

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
    top: 50px;
    right: -10px;
    z-index: 999;
    display: none;
}

.popup-detail-user-content{
    position: relative;
    padding: 20px;
    width: 200px;
    height: 300px;
    // make box shadow slightly
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 20px 10px rgba(179, 179, 179, 0.2);
    animation: openPopUp 0.2s ease-in-out;
    &::after{
        position: absolute;
        content:"";
        width: 100%;
        height: 40px;
        background-color: transparent;
        top: -30px;
        

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
</style>