<script setup lang="ts" name="NavBar">
import ScreenFull from '@/components/full-screen/index.vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
const router = useRouter()
function logout() {
  user.logout().then(() => {
    router.push('/login')
  })
}
const user = useUserStore()
</script>
<template>
  <div class="flex items-center justify-between w-full text-xl pl-1 pr-2">
    <Hamburger class="mr-4 inline-flex justify-center" />
    <Breadcrumb class="flex-1 leading-normal" />
    <a-space class="right-menu flex justify-center items-center">
      <search-input />
      <screen-full />
      <div class="avatar">
        <a-dropdown>
          <a class="block h-8 w-8">
            <img class="h-full rounded-lg" :src="user.avatar" alt="avatar" />
          </a>
          <ant-design:down-outlined />
          <template #overlay>
            <a-menu>
              <a-menu-item>个人中心</a-menu-item>
              <a-menu-item>设置</a-menu-item>
              <a-menu-item @click="logout()">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-space>
  </div>
</template>
<style scoped>
</style>