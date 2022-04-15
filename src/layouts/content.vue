<script setup lang="ts">
import MainHeader from './header/index.vue'
import { useTagView } from '@/store/modules/tag-view'
const tagViewStore = useTagView()

</script>

<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: 0 }">
      <main-header />
    </a-layout-header>
    <a-layout-content>
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade" mode="out-in">
          <keep-alive :include="tagViewStore.cachedView">
            <component :is="Component" :key="route.path"/>
          </keep-alive>
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
