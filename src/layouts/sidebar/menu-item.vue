<script setup lang="ts" name="SidebarMenuItem">
import path from 'path-browserify'
import { formatterStr } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const props = defineProps<{
  routerRecords: RouteRecordRaw,
  basePath: string,
}>()
const { routerRecords, basePath } = toRefs(props)
const theShowRoute = ref<RouteRecordRaw>()

const resolvePath = (routePath: string, base: string = basePath.value) => {
  return path.resolve(base, routePath)
}

const onlyShowOneLine = (routeItem: RouteRecordRaw): Boolean => {
  if (!routeItem.children) { // 没有 children 时，显示自身
    theShowRoute.value = routeItem
    return true
  }
  if (routeItem.children.length <= 1 && !routeItem?.meta?.showSideBar) { // children length <= 1 && showSideBar is false，show child property
    theShowRoute.value = Object.assign(
      {},
      routeItem,
      routeItem.children[0],
    )
    return true
  }
  return false
}

</script>

<template>
  <a-menu-item v-if="onlyShowOneLine(routerRecords)" :key="resolvePath(theShowRoute.path)">
    <template #icon v-if="theShowRoute?.meta?.icon">
      <component :is="defineAsyncComponent(theShowRoute.meta.icon)" />
    </template>
    <router-link :to="resolvePath(theShowRoute.path)">{{ formatterStr(theShowRoute?.meta?.title || 'no title', 'upper') }}</router-link>
  </a-menu-item>
  <a-sub-menu v-else :key="resolvePath(routerRecords.path)">
    <template #icon v-if="routerRecords?.meta?.icon">
      <component :is="defineAsyncComponent(routerRecords.meta.icon)" />
    </template>
    <template #title>{{ formatterStr(theShowRoute?.meta?.title || 'no title', 'upper') }}</template>
    <template v-for="item of routerRecords.children" :key="item.key">
      <sidebar-menu-item :router-records="item" :base-path="resolvePath(routerRecords.path)" />
    </template>
  </a-sub-menu>
</template>
<style scoped>
</style>
