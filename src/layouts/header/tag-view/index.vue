<script lang="ts" name="TagView" setup>
import { resolvePath } from '@/utils/path'
import type { RouteRecordNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { useTagView } from '@/store/modules/tag-view'
import type { AllShowTag } from '@/store/modules/tag-view'
import { formatterStr } from '@/utils'


const route = useRoute()
const router = useRouter()
const tagViewStore = useTagView()

const addTagView = (route: RouteRecordNormalized | RouteLocationNormalizedLoaded) => {
  const fRoute = formatterRoute(route)
  tagViewStore.add(unref(fRoute))

  function formatterRoute(route: RouteRecordNormalized | RouteLocationNormalizedLoaded, baseRoute: string = '/'): AllShowTag {
    return Object.assign({
      name: route.name as string,
      fullPath: resolvePath(baseRoute, route.path),
      path: route.path,
      meta: {},
      query: {},
      isSticky: route?.meta?.sticky
    }, route)
  }
}

const initStickyTag = () => {
  const routes = router.getRoutes()
  routes.forEach(route => {
    if (route?.meta?.sticky) {
      addTagView(route)
    }
  })
}

const isActiveTag = (tag: AllShowTag) => {
  return tag.name === route.name || tag.path === route.path
}

const openNextView = (visitedView: AllShowTag[], index: number) => {
  if (index < 0) {
    // 没有 tag 时， 重定向到 index 页面
    router.push('/redirect/')
    return
  }
  index = Math.min(visitedView.length - 1, index)
  const visitedRoute = visitedView[index]
  if (visitedRoute) {
    router.push({ path: visitedRoute.path })
  }
}

const handleCloseTag = (route: AllShowTag) => {
  if (!route) return false
  tagViewStore.delete(route).then((res) => {
    openNextView(res.visitedView, res.nextTagIndex)
  })
}

onMounted(() => {
  initStickyTag()
  addTagView(route)
})

watch(route, (toRoute) => {
  addTagView(unref(toRoute))
})

let showContextmenu = ref(false)
let currentTag = ref<AllShowTag>()
let l = ref(0), t = ref(0)
const openContextmenu = (tag: AllShowTag, event: MouseEvent) => {
  const { left, top } = (event.target as Element).getBoundingClientRect()
  l.value = left + event.offsetX
  t.value = top + event.offsetY
  showContextmenu.value = true
  currentTag.value = tag
}

const closeContextmenu = () => {
  showContextmenu.value = false
}

const handleCloseRightTag = (tag: AllShowTag) => {
  tagViewStore.deleteRight(tag).then(res => {
    openNextView(res.visitedView, res.visitedView.length - 1)
  })
}

const handleCloseOtherTag = (tag: AllShowTag) => {
  tagViewStore.deleteOther(tag).then(res => {
    openNextView(res.visitedView, res.visitedView.length - 1)
  })
}

watch(showContextmenu, (newVal) => {
  if (newVal)
    document.addEventListener('click', closeContextmenu)
  else
    document.removeEventListener('click', closeContextmenu)
})


</script>
<template>
  <div>
    <div class="flex justify-start">
      <a-tag v-for="(tag) of tagViewStore.getVisitedView" :key="tag.path"
        :color="isActiveTag(tag) ? '#2db7f5' : tag.isSticky ? 'green' : ''" :closable="!tag.isSticky"
        @close.prevent="handleCloseTag(tag)">
        <router-link :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          @contextmenu.prevent="openContextmenu(tag, $event)">
          <span>{{ formatterStr(tag?.meta?.title as string, 'upper') }}</span>
        </router-link>
      </a-tag>
    </div>
    <div class="absolute" v-show="showContextmenu" :style="{ left: l + 'px', top: t + 'px' }">
      <a-menu>
        <a-menu-item @click="handleCloseTag(currentTag)">关闭</a-menu-item>
        <a-menu-item @click="handleCloseRightTag(currentTag)">关闭右侧</a-menu-item>
        <a-menu-item @click="handleCloseOtherTag(currentTag)">关闭其他</a-menu-item>
      </a-menu>
    </div>

  </div>
</template>
<style scoped>
</style>