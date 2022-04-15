<script setup lang="ts" name="MainHeader">
import NavBar from './nav-bar/index.vue'
import TagView from './tag-view/index.vue'
</script>
<template>
  <div class="flex flex-wrap h-full">
    <nav-bar class="w-full h-2/3"/>
    <tag-view class="w-full h-1/3"/>
  </div>
</template>
<style scoped>
</style>
