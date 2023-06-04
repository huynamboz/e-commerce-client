export default ({ app }, inject) => {
	const validatePassword = (password) =>{
		if(!password) return true
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) ? true : "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
	}
	const validateConfirmPassword = (password, confirmPassword) =>{
		if(!confirmPassword) return "Xác nhận mật khẩu không được để trống"
		if(password !== confirmPassword) return "Mật khẩu không khớp"
		return true
	}
	inject('validate', {
		validatePassword: validatePassword,
		validateConfirmPassword: validateConfirmPassword
	})
}