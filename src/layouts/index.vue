<script setup lang="ts">
import sidebar from './sidebar/index.vue'
import MainContent from './content.vue'
import type { IsCollapsed } from './types'

const isCollapsed = ref(false)
function toggleCollapsed() {
  isCollapsed.value = !isCollapsed.value
}
provide<IsCollapsed>('collapsed', { isCollapsed: readonly(isCollapsed), toggleCollapsed })

</script>

<template>
  <a-layout class="h-screen">
    <sidebar />
    <main-content />
  </a-layout>
</template>
