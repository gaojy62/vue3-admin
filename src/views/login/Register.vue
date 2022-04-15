<script setup lang="ts" name="Register">
let username = ref('')
let password = ref('')
let loading = ref(false)
function handleSubmit() { }
</script>
<template>
  <article
    class="min-h-[30vh] max-h-[50vh] w-[40vw] max-w-[500px] min-w-[300px]
      overflow-y-auto thin-scrollbar"
  >
    <div class="w-3/4 m-auto pt-10">
      <a-form>
        <a-form-item>
          <a-input
            v-model="username"
            placeholder="username"
            prefix-icon="user"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="password"
            placeholder="password"
            prefix-icon="lock"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="password"
            placeholder="password"
            prefix-icon="lock"
            :rules="[{ required: true, message: 'Repeat your password!' }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="password"
            placeholder="password"
            prefix-icon="lock"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="password"
            placeholder="password"
            prefix-icon="lock"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="password"
            placeholder="password"
            prefix-icon="lock"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="password"
            placeholder="password"
            prefix-icon="lock"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="password"
            placeholder="password"
            prefix-icon="lock"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          />
        </a-form-item>
        <a-form-item>
          <slot name="button" class="block">
            <a-button type="primary" @click="handleSubmit" :loading="loading">Register</a-button>
          </slot>
        </a-form-item>
      </a-form>
    </div>
    <div class="w-3/4 m-auto text-center">
      <slot name="footer"></slot>
    </div>
  </article>
</template>
<style scoped>
</style>
