export default function (context){
    console.log("[LOG]: Middleware router-log.js is running")
	if (!context.$cookies.get("auth.user")?.value){
		console.log("[LOG]: User is logged in")
		context.$auth.setUser(JSON.parse(context.$cookies.get('auth.user')));
	}
}