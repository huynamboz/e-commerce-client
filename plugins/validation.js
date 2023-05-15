export default ({ app }, inject) => {
	const validatePassword = (password) =>{
		if(!password) return true
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) ? true : "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
	}
	const validateConfirmPassword = (password, confirmPassword) =>{
		if(!confirmPassword) return "Confirm password is required"
		if(password !== confirmPassword) return "Confirm password is not match"
		return true
	}
	inject('validate', {
		validatePassword: validatePassword,
		validateConfirmPassword: validateConfirmPassword
	})
}