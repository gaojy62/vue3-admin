<script setup lang="ts" name="MainHeader">
import NavBar from './nav-bar/index.vue'
import TagView from './tag-view/index.vue'
</script>
<template>
  <div class="flex flex-wrap h-full">
    <nav-bar class="w-full h-2/3" />
    <div class="w-full h-1/3">
      <!-- <scroll-container scrollDirection="x" class="w-full h-full whitespace-nowrap"> -->
      <div class="tag-container  w-full h-full overflow-y-hidden whitespace-nowrap overflow-x-auto">
        <div class="inline-block h-full align-top leading-none">
          <tag-view />
        </div>
      </div>
      <!-- </scroll-container> -->
    </div>

  </div>
</template>
<style scoped>
.tag-container::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
.tag-container::-webkit-scrollbar-track {
  background: transparent;
}
.tag-container::-webkit-scrollbar-thumb {
  background: transparent;
}
.tag-container:hover::-webkit-scrollbar-thumb {
  background: rgba(204, 204, 204, 0.5);
  /* background: rgba(0, 0, 0, 0.1); */
}
</style>
