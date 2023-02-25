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
  env:{
    ApiKey : 'AIzaSyCV4RPrPpXge5_0mINOM6IWfL7Nu043UOI'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    //make global file css from assets/css/global.css
    "~static/global.css",
    "~static/icons/uicons-regular-rounded.css"
  ],
  auth: {
    redirect: {
      callback: "/",
      login: "/login",
      home: "/",
      logout: undefined,
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          type: 'Bearer',
          name: 'Authorization',
          // Sử dụng local storage để lưu token
          storage: 'localStorage'
        },
        user: {
          property: "data",
          autoFetch: false
        },
        endpoints: {
          login: {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCV4RPrPpXge5_0mINOM6IWfL7Nu043UOI",
            method: "post",
          },
        },
        autoFetchUser: false,
      },
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

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
  router:{
    middleware: 'router-log'
  },
  
}
