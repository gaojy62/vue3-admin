import { createApp } from 'vue'
// import { setupLayouts } from 'virtual:generated-layouts'
// import generatedRoutes from 'virtual:generated-pages'
import 'ant-design-vue/dist/antd.css'
import 'virtual:windi.css'
import App from './App.vue'
import pinia from '@/store'
import router from '@/router'
import '@/router/router-guard'

const app = createApp(App)

app
  .use(pinia)
  .use(router)
  .mount('#app')
