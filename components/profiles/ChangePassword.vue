<template>
	<div class="container-change flex flex-col gap-5 items-start p-5">
		<div class="flex flex-col">
			<p>Mật khẩu hiện tại</p>
			<vs-input v-model="oldPassword" placeholder="Mật khẩu hiện tại">
				<template v-if="validOldPassword" #message-success>
					Hợp lệ
				</template>
				
			</vs-input>
			</div>

		<div class="flex gap-5 max-md:flex-col">
			<div class="flex flex-col">
			<p>Mật khẩu mới</p>
			<vs-input v-model="newPassword" placeholder="Mật khẩu mới">
				<template v-if="validNewPassword" #message-success>
					Hợp lệ
				</template>
				<template v-if="!validNewPassword && newPassword !== ''" #message-danger>
					Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
				</template>
			</vs-input>
			</div>
			<div class="flex flex-col">
			<p>Nhập lại mật khẩu mới</p>
			<vs-input v-model="confirmNewPassword" placeholder="Xác nhận mật khẩu mới">
				<template v-if="validConfirmNewPassword" #message-success>
					Hợp lệ
				</template>
				<template v-if="!validConfirmNewPassword && confirmNewPassword !== ''" #message-danger>
					Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
					và phải <b>Giống mật khẩu mới</b>
				</template>
			</vs-input>
			</div>
		</div>
		<vs-button class="cursor-pointer" @click="changePassword()">Thay đổi</vs-button>
	</div>
</template>
<script>
export default {
	data: () => ({
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	}),
	computed: {
		validOldPassword() {
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.oldPassword)
		},
		validNewPassword() {
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.newPassword)
		},
		validConfirmNewPassword() {
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.confirmNewPassword) && this.confirmNewPassword === this.newPassword
		},

	},
	methods: {
		async changePassword() {
			if ( this.oldPassword === '' || this.newPassword === '' || this.confirmNewPassword === '') {
				this.$toast.error('Vui lòng nhập đầy đủ thông tin')
				return
			}
			if ( this.oldPassword === '' || this.newPassword === '' || this.confirmNewPassword === ''
				|| this.newPassword !== this.confirmNewPassword) {
				console.log('empty')
				return
			}
			await this.$axios.post('/users/change-password', {
				current_password: this.oldPassword,
				new_password: this.newPassword,
				confirm_password: this.confirmNewPassword
			}).then(res => {
				this.$toast.success('Đổi mật khẩu thành công')
				console.log(res)
			}).catch(err => {
				if(err.response.status === 400) {
					this.$toast.error('Mật khẩu hiện tại không đúng')
				}
				console.log(err)
			})
		}
	}

}
</script>