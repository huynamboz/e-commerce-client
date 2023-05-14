export default ({ app }, inject) => {
	const validatePassword = (password) =>{
		console.log("validatePassword", password)
		if(!password) return true
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) ? true : "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
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