<script setup lang="ts">
import { isArray } from '@/utils/is'
import { useRouter } from 'vue-router'

const { currentRoute, replace } = useRouter()
const { query, params } = unref(currentRoute)
const { path } = params
const _path = isArray(path) ? path.join('/') : path
replace({
  path: _path.startsWith('/') ? _path : '/' + _path,
  query
})
</script>
<template>
  <div></div>
</template>