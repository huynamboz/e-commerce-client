<template>
	<div class="container-change flex flex-col gap-5 items-start p-5">
		<div class="flex flex-col">
			<p>Mật khẩu cũ</p>
			<vs-input v-model="oldPassword" placeholder="vuesax@gmail.com">
				<template v-if="validOldPassword" #message-success>
					Email Valid
				</template>
				<template v-if="!validOldPassword && oldPassword !== ''" #message-danger>
					Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
				</template>
			</vs-input>
			</div>

		<div class="flex gap-5 max-md:flex-col">
			<div class="flex flex-col">
			<p>Mật khẩu mới</p>
			<vs-input v-model="newPassword" placeholder="vuesax@gmail.com">
				<template v-if="validNewPassword" #message-success>
					Email Valid
				</template>
				<template v-if="!validNewPassword && newPassword !== ''" #message-danger>
					Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
				</template>
			</vs-input>
			</div>
			<div class="flex flex-col">
			<p>Nhập lại mật khẩu mới</p>
			<vs-input v-model="confirmNewPassword" placeholder="vuesax@gmail.com">
				<template v-if="validConfirmNewPassword" #message-success>
					Email Valid
				</template>
				<template v-if="!validConfirmNewPassword && confirmNewPassword !== ''" #message-danger>
					Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
					và phải <b>Giống mật khẩu mới</b>
				</template>
			</vs-input>
			</div>
		</div>
		<vs-button class="cursor-pointer" >Thay đổi</vs-button>
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

	}

}
</script>