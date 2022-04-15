<script setup lang="ts" name="Login">
import { useUserStore } from '@/store/modules/user'
import router from '@/router';

interface FormState {
  username: string
  password: string
}
const userStore = useUserStore()
const formState = reactive<FormState>({
  username: '',
  password: '',
})
let loading = ref(false)
function handleSubmit(value: FormState) {
  loading.value = true
  userStore.login(value.username, value.password).then(res => {
    console.log(router.getRoutes())
    router.push('/')
  }).finally(() => {
    loading.value = false
  })
}
</script>
<template>
  <article
    class="min-h-[30vh] max-h-[50vh] w-[40vw] max-w-[500px] min-w-[300px]"
  >
    <div class="w-3/4 m-auto pt-10">
      <a-form :model="formState" @finish="handleSubmit">
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input
            v-model:value="formState.username"
            placeholder="Username"
          >
            <template #prefix><ant-design:user-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password"
          >
            <template #prefix><ant-design:lock-outlined /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <slot name="button" class="block">
            <a-button type="primary" html-type="submit" :loading="loading">Login</a-button>
          </slot>
        </a-form-item>
      </a-form>
    </div>
    <div class="w-3/4 m-auto text-center">
      <slot name="footer"></slot>
    </div>
  </article>
</template>
