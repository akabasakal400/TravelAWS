import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    AUTH_API: process.env.AUTH_API || "https://mb7zs9ga5a.execute-api.us-east-2.amazonaws.com/dev/api",
    API: 'https://mb7zs9ga5a.execute-api.us-east-2.amazonaws.com/dev/api'
  },
  ssr: false,
  target: 'static',

  head: {
    titleTemplate: 'Antigua Travel: contacta guías locales, reserva hoteles y mucha más información',
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src: "https://kit.fontawesome.com/f968821922.js", crossOrigin: "anonymous"},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Cairo' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oxygen' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['animate.css/animate.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/api', mode: "client" },
    { src: '~/plugins/alert.js', mode: 'client' },
    { src: '~/plugins/SearchMaps.js', mode: 'client' },
    { src: '~/plugins/maps.js', mode: 'client' },
    { src: '~/plugins/moment.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { filename: '.env.' + process.env.ENV }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyB1VHsTl-vmV3BP0gUGpVkI8pdK7JlTBmo",
          authDomain: "antiguatravel-e7bee.firebaseapp.com",
          projectId: "antiguatravel-e7bee",
          storageBucket: "antiguatravel-e7bee.appspot.com",
          messagingSenderId: "1048267483085",
          appId: "1:1048267483085:web:22cb3475a82dd67d050684",
          measurementId: "G-X2QTT1Z4EP"
        },
        onFirebaseHosting: true,
        services: {
          firestore: true,
          storage: true,
          database: true,
        },
        functions: {
          emulatorPort: 8001
        },
        database: {
          emulatorPort: 9000,
          emulatorHost: 'localhost',
        }
      }
    ],
    'nuxt-gmaps'
  ],

  moment: {
    defaultLocale: 'es-mx',
    locales: ['es-mx']
  },


  gmaps: {
    key: "AIzaSyB-FoMfaq00VyuS7uSWR3af7Rmw2r_1CY8",
    libraries: ['drawing']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: false,
    baseURL: process.env.ENV === 'production' ? '/' :
      'https://mb7zs9ga5a.execute-api.us-east-2.amazonaws.com/dev/api'
  },


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: "8FEEC8",
          accent: colors.grey.darken3,
          secondary: "29307F",
          tertiary: "5C61A5",
          complementario: "2f7f73",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
