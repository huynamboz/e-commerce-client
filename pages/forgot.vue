<template>
    <div class="login-container">
        <loading v-if="isLoading"/>
        <div class="login-content-main">
            <!-- <img src="~/assets/img/bg-login.png" alt="" class="login-img-banner"> -->
            <div class="login-fiels">
                <h1 class="login-title">Forgot password :)</h1>
                <p class="login-subtitle">Enter your email to reset password </p>
                <div class="login-input-email mb-5" :class="[{'gray-bg' : email.length > 0}]">
                    <img src="~/assets/img/mail.png" alt="" class="input-email-img">
                    <div class="fiels-input">
                        <span>Email address</span>
                        <input :class="[{'gray-bg' : email.length > 0}]" type="email" v-model="email" placeholder="Email" class="input-email">
                    </div>
                </div>
				<span class="forgot cursor-pointer" @click="$router.push('/login')">Back to login</span>
				
                <div class="login-list-btn">
                    <button class="login-btn w-full" @click="sendEmail()">SEND EMAIL</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import loading from '~/components/loading/main.vue'
export default {
	layout:'empty',
	auth:false,
    components: {
        loading
    },
    name: 'login',
    data() {
        return {
            isLoading: false,
            email: '',
            password: '',
			userID: '',
			authError: false
        }
    },
	mounted() {
	},
    methods: {
		closePopup(){
			this.authError = false;
		},
		sendEmail(){
			if( this.email == '' ){
				this.$toast.error('Please enter your email');
				return;
			}
			this.isLoading = true;
			this.$axios.post('/auth/forgot-password',{
				email: this.email
			}).then(res => {
				this.isLoading = false;
				this.$toast.success('Send email success');
				this.$router.push('/login');
			}).catch(err => {
				this.isLoading = false;
				this.$toast.error('Send email fail, please check your email again');
			})
		}
    }
}
</script>
<style lang="scss" scoped>
.popup-container{
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	display: flex;
	animation: blur 0.3s;
	@media screen and (max-width: 768px) {
		padding: 0 20px;
	}
}
// make animation keyframe from blur 0 to 1
@keyframes blur {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.popup-blur{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
}
.popup{
	padding: 82px 105px;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	background: #FFFFFF;
	border-radius: 40px;
	z-index: 999;
	@media screen and (max-width: 768px){
		padding: 40px 20px;
	}
}
.popup-title{
	font-weight: 700;
font-size: 38px;
line-height: 150%;
color: #E02D3C;
@media screen and (max-width: 768px){
	font-weight: 700;
font-size: 24px;
line-height: 150%;
	
}
}
.popup-text{
	max-width: 400px;
	font-weight: 400;
font-size: 16px;
line-height: 150%;
color: #3E3F66;
&> span{
	font-weight: 500;
}
@media screen and (max-width: 768px){
	font-weight: 400;
font-size: 14px;
line-height: 150%;
	max-width: 100%;
}
}
.popup-btn{
	@media screen and (max-width: 768px) {
		width: 100%;
	}
}
.btn-popup-close{
	background: #E02D3C;
border-radius: 80px;
padding: 9.5px 24px;
gap: 4px;
color: #FFFFFF;
font-weight: 700;
font-size: 14px;
line-height: 150%;
border: none;
width: 298px;
@media screen and (max-width: 768px){
	width: 100%;
	
}
}
.popup-content{
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}
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
.login-img-banner{
	@media screen and (max-width:768px) {
		display: none;
	}
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