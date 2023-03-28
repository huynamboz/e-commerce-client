export default {
	ssr: false,
	server: {
		port: 3000,
		host: "0.0.0.0",
		// https: {
		//   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
		//   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
		// }
	},
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'client',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	env: {
		ApiKey: 'AIzaSyCV4RPrPpXge5_0mINOM6IWfL7Nu043UOI'
	},
	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		//make global file css from assets/css/global.css
		"~static/global.css",
		"~static/css/uicons-regular-rounded.css",
		"~static/icons/uicons-bold-rounded.css",
	],
	auth: {
		strategies: {
			local: {
				user: {
					property: 'user',
					autoFetch: false
				},
				refreshToken: {
					property: 'refresh_token',
					data: 'refresh_token',
					maxAge: 60 
				},
				token: {
					property: 'token',
					global: true,
					type: 'Bearer',
				},
				endpoints: {
					login: { url: '/auth/login', method: 'post', propertyName: 'token' },
					user: false //phải để là false để không tự động fetch user chứ không là méo lưu được trạng thái login con mẹ nó đc tốn thời gian của bố m vcl
				},
			},
			tokenType: ''
		},
		redirect: {
			login: '/',
			logout: '/',
		},
		watchLoggedIn: true,
		rewriteRedirects: true,
		autoFetchUser: false,

	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
	],
	axios: {
		baseURL: 'http://localhost:5000/api',
	},
	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		loaders: {
			sass: {
				implementation: require('sass'),
			},
			scss: {
				implementation: require('sass'),
			},
		},
	},
	router: {
		middleware: 'router-log',
		middleware: ['auth']
	},
}
