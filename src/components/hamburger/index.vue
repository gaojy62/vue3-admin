<script setup lang="ts" name="Hamburger">
import type { IsCollapsed } from '@/layouts/types'

const { isCollapsed, toggleCollapsed } = inject<IsCollapsed>('collapsed') as IsCollapsed

</script>
<template>
  <div @click="toggleCollapsed">
    <ant-design:menu-unfold-outlined v-if="isCollapsed" />
    <ant-design:menu-fold-outlined v-else />
  </div>
</template>
<style scoped>
</style>