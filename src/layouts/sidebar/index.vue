<script setup lang="ts">
import sidebarMenu from './menu.vue'
import type { IsCollapsed } from '@/layouts/types'

const { isCollapsed } = inject<IsCollapsed>('collapsed') as IsCollapsed


</script>
<template>
  <a-layout-sider
    class="container"
    theme="light"
    v-model:collapsed="isCollapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo">
      <!-- <img
        src="https://v3.cn.vuejs.org/logo.png"
        alt="logo"
      > -->
      vue admin
    </div>
    <sidebar-menu class="menu-container" />
  </a-layout-sider>
</template>
<style scoped>
.container {
  --logo-height: 64px;
}
.container {
  padding: 0;
  height: 100vh;
  overflow: hidden;
}
.logo {
  height: var(--logo-height);
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 12px;
  font-size: 1.3rem;
  font-weight: 500;
  color: #2c3e50;
}
.logo img {
  height: 100%;
}
.menu-container {
  height: calc(100vh - var(--logo-height));
  overflow: overlay;
  overflow-x: hidden;
}

.menu-container::-webkit-scrollbar {
  z-index: 122;
  width: 6px;
}
.menu-container::-webkit-scrollbar-track {
  background: transparent;
}
.menu-container::-webkit-scrollbar-thumb {
  background: transparent;
}
.menu-container:hover::-webkit-scrollbar-thumb {
  background: rgba(204, 204, 204, 0.5);
  /* background: rgba(0, 0, 0, 0.1); */
}
</style>
