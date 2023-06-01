export default ({ app }, inject) => {
	function handleErrorApi(error) {
		try {
			let dtError = error.response.data?.title
			console.log("dt",dtError)
			if(dtError){
				return Object.values(error.response.data.errors)[0][0]
			}
		} catch (error) {
			console.log(error)
			return "Something went wrong"
		}
		return error.response?.data?.message
	}
	inject('handleErrorApi', handleErrorApi)
}