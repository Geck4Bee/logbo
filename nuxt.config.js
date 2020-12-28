import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - GESONTACLE',
    title: 'GESONTACLE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '「間違いを気にしない」ニース・情報ソースの共有・検証サイトのゲソンタクルです' },
      { hid: 'keywords', name: 'keywords', content: '不正選挙, 大統領選, ニュース, ソース', 'xml:lang': 'ja', lang: 'ja' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'GESONTACLE' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://gesontacle.com' },
      { hid: 'og:title', property: 'og:title', content: 'GESONTACLE' },
      { hid: 'og:description', property: 'og:description', content: process.env.npm_package_description || '「間違いを気にしない」ニース・情報ソースの共有・検証サイトのゲソンタクルです' },
      { hid: 'og:image', property: 'og:image', content: 'https://gesontacle.com/ogp/icon.jpg' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@gesontacle' },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#272727' },
      { hid: 'theme-color', name: 'theme-color', content: '#272727' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'GESONTACLE' },
      { hid: 'application-name', name: 'application-name', content: 'GESONTACLE' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/amplify.js', mode: 'client'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  generate: {
    dir: "docs"
  }
}
