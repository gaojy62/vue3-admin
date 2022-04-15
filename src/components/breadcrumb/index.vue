<script setup lang="ts" name="Breadcrumb">
import { formatterStr } from '@/utils'
import type { RouteLocationMatched, RouteRecordRedirectOption } from 'vue-router'
type BreadcrumbItem = {
  title: string
  path: string
  redirect: RouteRecordRedirectOption | undefined
}

const route = useRoute()
const breadcrumbs = ref<BreadcrumbItem[]>([])
const isDashboard = (matched: RouteLocationMatched) => {
  if (matched.name && matched.name.toString().toLowerCase() === 'dashboard') {
    return true
  }
  return false
}
watchEffect(() => setBreadcrumbs(route.matched))


function setBreadcrumbs(matched: RouteLocationMatched[]) {
  const allMatched: RouteLocationMatched[] = [...matched]
  const firstMatched = allMatched[0]
  if (!isDashboard(firstMatched)) {
    allMatched.unshift({
      path: '/',
      redirect: '/index',
      meta: {
        title: 'Dashboard',
      },
    } as unknown as RouteLocationMatched)
  }
  breadcrumbs.value = allMatched.filter(item => item?.meta?.title && !item?.meta?.noBreadcrumb)
    .map(item => {
      return {
        title: item.meta.title as string,
        redirect: item.redirect,
        path: item.path
      }
    })
}

const getLink = (redirect: RouteRecordRedirectOption | undefined, path: string) => {
  if (redirect) {
    return redirect
  }
  return path
}

</script>
<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="({ title, path, redirect }) of breadcrumbs" :key="path">
      <span v-if="redirect === 'noRedirect'">{{ formatterStr(title, 'upper') }}</span>
      <router-link v-else :to="getLink(redirect, path)">{{ formatterStr(title, 'upper') }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
