import { createApp } from 'vue'
// import { setupLayouts } from 'virtual:generated-layouts'
// import generatedRoutes from 'virtual:generated-pages'
import 'ant-design-vue/dist/antd.css'
import 'virtual:windi.css'
import App from './App.vue'
import pinia from '@/store'
import router from '@/router'
import '@/router/router-guard'
// import { createFromIconfontCN } from '@ant-design/icons-vue';

const app = createApp(App)


// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
// })

// app.component('iconfont', IconFont)

app
  .use(pinia)
  .use(router)
  .mount('#app')
