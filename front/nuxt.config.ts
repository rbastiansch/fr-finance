// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Fr Finance'
    }
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },

  runtimeConfig: {
    public: {
      apolloApiHost: 'http://localhost:4000'
    }
  },

  modules: ['@nuxt/eslint']
})