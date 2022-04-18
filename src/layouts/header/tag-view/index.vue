<script lang="ts" name="TagView" setup>
import Draggable from 'vuedraggable'
import { resolvePath } from '@/utils/path'
import type { RouteRecordNormalized, RouteLocationNormalizedLoaded, RouteLocationRaw } from 'vue-router'
import { useTagView } from '@/store/modules/tag-view'
import type { AllShowTag } from '@/store/modules/tag-view'
import { CloseOutlined } from '@ant-design/icons-vue'
import {formatterStr} from '@/utils/index'
const route = useRoute()
const router = useRouter()
const tagViewStore = useTagView()
const allShowTags = computed({
  get: () => tagViewStore.visitedView,
  set: (val: AllShowTag[]) => tagViewStore.updateVisitedView(val)
})

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
    gotoRoute('/redirect/')
    return
  }
  index = Math.min(visitedView.length - 1, index)
  const visitedRoute = visitedView[index]
  if (visitedRoute) {
    gotoRoute({ path: visitedRoute.path })
  }
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

function gotoRoute(routeRecord: RouteLocationRaw) {
  router.push(routeRecord)
}

const handleClickTag = (route: AllShowTag) => {
  gotoRoute({ path: route.path, query: route.query })
}

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

const handleRefreshTag = (route: AllShowTag) => {
  if (!route.path) return
  tagViewStore.deleteCached(route)
  gotoRoute({ path: '/redirect/' + route.path, query: route.query })
}

const handleCloseTag = (route: AllShowTag) => {
  if (!route) return false
  tagViewStore.delete(route).then((res) => {
    openNextView(res.visitedView, res.nextTagIndex)
  })
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
    <Draggable class="flex justify-start" v-model="allShowTags" item-key="path" tag="div">
      <template #item="{ element: tag }">
        <a-tag :title="tag.meta.title" 
          class="cursor-pointer w-28 truncate" 
          :color="isActiveTag(tag) ? '#2db7f5' : ''"
          @contextmenu.prevent="openContextmenu(tag, $event)" 
          @click="handleClickTag(tag)"
        >
          <template #icon v-if="!tag.isSticky">
            <!-- <close-outlined @click.stop="handleCloseTag(tag)" /> -->
            <ant-design:close-outlined @click.stop="handleCloseTag(tag)" class="align-text-top text-xs" />
          </template>
          {{ formatterStr(tag.meta.title, 'upper') }}
        </a-tag>
      </template>
    </Draggable>
    <div class="absolute" v-show="showContextmenu" :style="{ left: l + 'px', top: t + 'px' }">
      <a-menu theme="light" :selectable="false">
        <a-menu-item key="refresh" @click="handleRefreshTag(currentTag)">刷新</a-menu-item>
        <a-menu-item key="close" @click="handleCloseTag(currentTag)">关闭</a-menu-item>
        <a-menu-item key="close-right" @click="handleCloseRightTag(currentTag)">关闭右侧</a-menu-item>
        <a-menu-item key="close-other" @click="handleCloseOtherTag(currentTag)">关闭其他</a-menu-item>
      </a-menu>
    </div>
  </div>
</template>
<style scoped>
</style>