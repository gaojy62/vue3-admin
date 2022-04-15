<script setup lang="ts" name="Guard">
import { useUserStore } from '@/store/modules/user'
const user = useUserStore()
let count = ref(0)
console.log('token is: ' + user.token)
</script>
<template>
  <div>
    <h1>{{ user.token || 'no token' }}</h1>
    <button @click="count++">add count</button>
    <span> {{ count }}</span>
  </div>
</template>
<style scoped>
</style>