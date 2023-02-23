<template>
    <div class="header-container">
        <div class="site-logo">
            <img src="~/assets/img/logo-colored.png" alt="" class="logo-site">
        </div>
        <search />
        <div class="list-action">
            <div class="profile action-item">
                <img src="~/assets/img/profile.png" alt="" class="icon-action">
                <p>Cá nhân</p>
            </div>
            <div class="cart action-item">
                <img src="~/assets/img/cart.png" alt="" class="icon-action">
                <p>Giỏ hàng</p>
                </div>
                <div class="mess action-item">
                    <img src="~/assets/img/message.png" alt="" class="icon-action">
                    <p>Tin nhắn</p>
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
.list-action{
    p{
        font-size: 14px;
    }
    display: flex;
    gap: 20px;
    
}
.action-item{
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    font-size: 15px;
    &:hover{
        cursor: pointer;
        p{
            color: #0d6efd;
        }
    
    }
}
.icon-action{
    width: 25px;
    height: 25px;
}
</style>