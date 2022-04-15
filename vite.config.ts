import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Pages from 'vite-plugin-pages'
// import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import vueSetupExtend from "vite-plugin-vue-setup-extend"
// import Inspect from 'vite-plugin-inspect'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import asyncImportIcon from './src/plugins/vite-plugins/async-icon'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`
    }
  },
  plugins: [
    asyncImportIcon(),
    vue(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core'
        // 'vue-i18n',
        // '@vueuse/head',
      ],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        AntDesignVueResolver(),
        IconsResolver({
          componentPrefix: ''
        })
      ],
      dts: 'src/components.d.ts'
    }),
    Icons({
      // autoInstall: true,
      compiler: 'vue3'
    }),
    WindiCSS(),
    vueSetupExtend()
    // https://github.com/antfu/vite-plugin-inspect
    // Inspect({
    //   // change this to enable inspect for debugging
    //   enabled: false
    // })
  ],
  // optimizeDeps: {
  //   include: [
  //     'vue',
  //     'vue-router',
  //     '@vueuse/core',
  //     'ant-design-vue'
  //   ]
  // },
  server: {
    port: 3333,
    // https: true,
    open: true,
    proxy: {
      '/dev': 'http://localhost:8080/'
    }
  }
})
