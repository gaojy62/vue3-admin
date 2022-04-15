<script setup lang="ts" name="ScreenFull">
import screenfull from 'screenfull'
import { message } from 'ant-design-vue'
import IconContainer from '@/components/icon-container/index.vue'
let isScreenFull = ref(false)
onMounted(() => {
  screenfull.isEnabled && screenfull.on('change', change)
})
function change() {
  isScreenFull.value = screenfull.isFullscreen
}
function toggleScreenFull() {
  if (!screenfull.isEnabled) {
    message.warning('当前浏览器不支持全屏')
    return false
  }
  screenfull.toggle()
}
onUnmounted(() => {
  screenfull.isEnabled && screenfull.off('change', change)
})
</script>
<template>
  <div class="flex justify-center" @click="toggleScreenFull()">
    <ant-design:fullscreen-exit-outlined v-if="isScreenFull" />
    <ant-design:fullscreen-outlined v-else />
  </div>
</template>
<style scoped>
</style>