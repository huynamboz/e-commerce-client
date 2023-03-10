<template>
    <div class="login-container">
        <loading v-if="isLoading"/>
        <div class="login-content-main">
            <img src="~/assets/img/bg-login.png" alt="" class="login-img-banner">
            <div class="login-fiels">
                <h1 class="login-title">Hi Everyone :)</h1>
                <p class="login-subtitle">Welcome to our website, </p>
                <div class="login-input-email" :class="[{'gray-bg' : email.length > 0}]">
                    <img src="~/assets/img/mail.png" alt="" class="input-email-img">
                    <div class="fiels-input">
                        <span>Email address</span>
                        <input :class="[{'gray-bg' : email.length > 0}]" type="email" v-model="email" placeholder="Email" class="input-email">
                    </div>
                </div>
                <div class="login-input-pass" :class="[{'gray-bg' : password.length > 0}]">
                    <img src="~/assets/img/lock.png" alt="" class="input-email-img">
                    <div class="fiels-input">
                        <span>Password</span>
                        <input :class="[{'gray-bg' : password.length > 0}]" type="password" v-model="password" placeholder="Password" class="input-email">
                    </div>
                </div>

                <span class="forgot">Forgot password?</span>
                <div class="login-list-btn">
                    <button class="login-btn" @click="signin()">LOGIN</button>
                    <button class="create-btn" @click="$router.push('/register')">CREATE ACCOUNT</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import loading from '~/components/loading/loading-style-2.vue'
export default {
    components: {
        loading
    },
    name: 'login',
    data() {
        return {
            isLoading: false,
            email: '',
            password: ''
        }
    },
    methods: {
        signin() {
            this.isLoading = true;
            this.$auth.loginWith('local',
            {
                data: {
						user_name: this.email,
						password: this.password,
					}
            })
                .then(resp => {
                    this.isLoading = false;
                    this.$auth.setUser(resp)
                    this.$auth.$storage.setUniversal('user', resp, true)
					this.$auth.setUser(resp)
                    console.log(this.$auth.user)
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>
<style lang="scss" scoped>
span,p{
    margin: 0;
}
.login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.login-content-main{
    display: flex;
    width: 95%;
    height: 95%;
    align-items: center;
    justify-content: center;
    gap: 60px;
    background-color: 
#f9fafc;
    border-radius: 20px;
    padding: 20px 50px;
    // make box shadow
    box-shadow: 0 0 20px 10px rgba(179, 179, 179, 0.2);
}
.input-email-img{
    width: 20px;
    height: 20px;
}
.login-input-email{
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-radius: 6px;
}
input{
    border: none;
    outline: none;
    width: 250px;
}
.fiels-input{
    & > span{
        font-size: 12px;
        color: #9e9e9e;
        margin-bottom: 5px;
    }
}
.login-input-pass{
    margin-top: 2px;
display: flex;
align-items: center;
gap: 20px;
padding: 10px 20px;
background-color: #ffffff;
    border-radius: 6px;
}
.gray-bg{
    background-color: #eef2f5;
}
.fiels-input{
    display: flex;
    flex-direction: column;
}
.login-title{
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 10px;
}
.forgot{
    display: block;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 12px;
    color: #9e9e9e;
}
.login-btn{
    background-color: #8accf8;
    color: #ffffff;
    border: none;
    outline: none;
    padding: 9px 20px;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 8px;
    transition: .2s ease-in-out;
    &:hover{
        // make box shadow
        box-shadow: 0 13px 20px 10px rgba(151, 207, 244, 0.242);
    }
}
.create-btn{
    background-color: #ffffff;
    color: #8accf8;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: .2s ease-in-out;
    &:hover{
        // make box shadow
        box-shadow: 0 13px 20px 10px rgba(151, 207, 244, 0.242);
    }
}
</style>