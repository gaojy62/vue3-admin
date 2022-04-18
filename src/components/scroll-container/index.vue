<script setup lang="ts" name="ScrollContainer">
import BScroll from '@better-scroll/core'

const props = defineProps<{
  scrollDirection: 'x' | 'y'
}>()

let scroll = ref<HTMLElement>()

const init = () => {
  new BScroll(scroll.value!, {
    scrollX: props.scrollDirection === 'x',
    scrollY: props.scrollDirection === 'y',
    probeType: 3,
    click: true
  })
}


onMounted(() => {
  init()
})

</script>
<template>
  <div ref="scroll">
    <slot />
  </div>
</template>
