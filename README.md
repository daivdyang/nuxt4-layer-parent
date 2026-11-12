# Nuxt Minimal Starter

這是一個測試Nuxt4 Layers功能的專案，用來測試加載另一個遠端repo的組件

## 遠端repo的組件

[Link](https://github.com/daivdyang/nuxt4-layer-component.git)

## 測試的頁面

測試的頁面在 `app/pages/test-layer.vue` ，裡面的組件均是從遠端repo加載會來的， `nuxt.config.ts` 有配置遠端repo位置，當本機執行`npm run dev` 會從遠端加載該repo的組件回來，並且自動合併`遠端repo`的`nuxt.config.ts`，所以遠端元件會在 build 時被合併進入專案。

## 主應用引入Layer

`extends` 支援三種來源：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    // A. 本地路徑（monorepo）
    '../ui-layer',

    // B. npm 套件（需先 pnpm add @your-org/ui-layer）
    '@your-org/ui-layer',

    // C. Git 遠端（私有 repo 需 token，建議鎖 tag）
    ['github:your-org/ui-layer#v1.2.0', {
      auth: process.env.GITHUB_TOKEN,
      install: true, // 自動安裝 layer 的 dependencies
    }],
  ],
})
```

另外，放在主專案根目錄 `layers/` 資料夾內的 `layer` 會被自動載入，不必寫進 extends。

## 在元件中使用

不用 `import`，直接寫：

```vue
<template>
  <UiPromoBanner :title="$t('promo.title')" @click="onClick" />
</template>
```

沒設 `prefix` 的話就是 `<PromoBanner />`。`Layer` 裡的 composables、utils、pages、middleware 也都會一起合併。

## 覆寫與優先順序

- 主專案的同名元件會覆蓋 layer 的版本，這很適合做客製化。
- extends 陣列中排在越前面的 layer，優先權越高。

## 說明遠端組件

遠端 layer 會被下載到專案的 `node_modules/.c12/` 底下，每個 `layer` 一個資料夾，名稱根據來源產生（例如包含 github_your-org_nuxt_component 之類的字樣）。`layer` 的組件就在那個資料夾的 `app/components/` 裡：

```
layer-test/
└─ node_modules/
   └─ .c12/
      └─ github_your-org_nuxt_component_xxxx/   ← 整個 layer repo 的內容
         ├─ app/
         │  └─ components/
         │     └─ MyButton.vue
         └─ nuxt.config.ts
```

這些組件不會被複製到你的 `app/components/`。Nuxt 是直接掃描上述位置，再註冊成自動匯入，所以專案裡看不到這些檔案，但可以直接在 `template` 裡使用。

怎麼確認組件從哪裡來

```bash
// bash

ls node_modules/.c12/
grep MyButton .nuxt/components.d.ts
```

`.nuxt/components.d.ts` 會列出所有自動匯入的組件和它們的實際檔案路徑。layer 組件的路徑會指向 `node_modules/.c12/...`。另外，Nuxt DevTools 的 Components 分頁也能看到每個組件的來源。

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

