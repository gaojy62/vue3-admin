<script setup lang="ts" name="SidebarMenuItem">
import path from 'path-browserify'
import { formatterStr } from '@/utils'
// import renderIcons from './renderIcons'
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

const loadAsyncIcon = (iconName?: string) => {
  // TODO 根据路由配置信息动态加载 icon，暂时想到的方案是，写 vite 插件把所有 route 的 icon 都保存到 map 中
  // ? 上述法案只能解决静态路由，根据用户权限的动态路由怎么加载。或者不论动态静态都加载到 map 中
  return async () => await import('virtual:posts/async-icons/ant-design/appstore-outlined')
  // return async () => await import(`virtual:posts/async-icons/${iconName}`)
}

</script>

<template>
  <template v-if="onlyShowOneLine(routerRecords)">
    <a-menu-item :key="resolvePath(theShowRoute!.path)">
      <template #icon v-if="theShowRoute?.meta?.icon">
        <component :is="defineAsyncComponent(loadAsyncIcon(theShowRoute?.meta?.icon as string))" />
      </template>
      <router-link :to="resolvePath(theShowRoute!.path)">{{ formatterStr(theShowRoute?.meta?.title || 'no title', 'upper') }}</router-link>
    </a-menu-item>
  </template>
  <a-sub-menu v-else :key="resolvePath(routerRecords.path)">
    <template #title>{{ routerRecords.name }}</template>
    <template v-for="item of routerRecords.children" :key="item.key">
      <sidebar-menu-item :router-records="item" :base-path="resolvePath(routerRecords.path)" />
    </template>
  </a-sub-menu>
</template>
<style scoped>
</style>
