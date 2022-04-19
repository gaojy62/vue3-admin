<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import SidebarMenuItem from './menu-item.vue'
import { usePermissionStore } from '@/store/modules/permission'

const permissionStore = usePermissionStore()
const currentRoute = useRoute()

const routes = permissionStore.getAllRoutes
const selectedKeys = ref<string[]>([currentRoute.path])
const getCurrentSubMenu = (matched: RouteLocationMatched[]): string[] => {
  return matched.map(item => item.path)
}
const openKeys = ref<string[]>(getCurrentSubMenu(currentRoute.matched))

watch(currentRoute, ({ path, matched }) => {
  selectedKeys.value = [path]
  openKeys.value = getCurrentSubMenu(matched)
})
</script>
<template>
  <a-menu
    theme="light"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <template v-for="route of routes" :key="route.path">
      <sidebar-menu-item
        v-if="!route?.meta?.hidden"
        :router-records="route"
        :base-path="route.path"
      />
    </template>
  </a-menu>
</template>

