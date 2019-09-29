
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    apiKey: process.env.FIRE_APIKEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_DATABASE_URL,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE_BUCKET,
    messageSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
    appId: process.env.FIRE_APP_ID,
    googleMapId: process.env.GOOGLE_MAP_API
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/firebase'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['@nuxtjs/moment', ['ja']],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */

  /*
  proxy: {
    '/api': {
      target: 'https://maps.googleapis.com/maps/api',
      pathRewrite: {
        '^/api' : '/'
      }
    }
  },
  */
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
