// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  extends: [
    // install: true 很重要。遠端 layer 只會下載原始碼，不會自動安裝它的 dependencies（PrimeVue、i18n 等 module）。
    // 加上這個選項，Nuxt 會幫你裝；不加的話，就得在測試專案手動 npm install 那些套件。
    ['github:daivdyang/nuxt4-layer-component#main', { install: true }]
  ],
  devtools: { enabled: true }
})
