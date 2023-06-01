<template>
	<div class="setting-container pb-6">
		<div class="setting-detail max-md:flex-col">
			<div class="tab-left w-[300px] max-md:w-full">
				<div class="tab-left-content">
					<div class="tab-left-content-header">
						<p>Cài đặt tài khoản</p>
					</div>
					<div class="tab-left-list flex-col max-md:flex-row">
						<div class="tab-left-item" 
						:class="{'is-choosed':optionSetting == 1}"
						@click="optionSetting=1">
							<i class="fi fi-rr-user"></i>
							<p>Thông tin cá nhân</p>
						</div>
						<div class="tab-left-item" 
						:class="{'is-choosed':optionSetting==2}"
						@click="optionSetting=2">
							<i class="fi fi-rr-lock"></i>
							<p>Mật khẩu</p>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-right w-[700px] max-md:w-full">
				<tab-profile v-if="optionSetting == 1"/>
				<change-password v-else/>
			</div>
		</div>
	</div>
</template>
<script>
import tabProfile from '~/components/profiles/detailProfile.vue'
import ChangePassword from '~/components/profiles/ChangePassword.vue'
export default {
	name: 'headerTab',
	components: {
		tabProfile,
		ChangePassword
	},
	data() {
		return {
			isShow: false,
			optionSetting: 1,
			tab: "PROFILE",
		}
	},
	mounted() {
		console.log(this.optionSetting)
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
.setting-container{
	display: flex;
	justify-content: center;
}
.setting-detail{
	margin-top: 40px;
	display: flex;
	justify-content: center;
	gap: 20px;
	background-color: #ffffff;
	width: 100%;
	max-width: 800px;
}
.tab-left-content-header{
	padding: 0 20px;
	padding-right: 0;
	font-weight: 600;
	font-size: 20px;
}
.tab-left{
	padding: 20px 20px;
}
.tab-left-list{
	display: flex;
	margin-top: 20px;
	gap: 20px;
}
.tab-left-item{
	display: flex;
	cursor: pointer;
	gap: 10px;
	padding: 5px 5px;
	color:#6f6f6f;
}

.is-choosed{
	border-right: 3px solid #ef0808;
	font-weight: 500;
	color: #000000;
	& > i{
		font-weight: 500;
	}
	@media screen and (max-width: 768px) {
		border-right: none;
		border-bottom: 3px solid #ef0808;
	}
}
</style>