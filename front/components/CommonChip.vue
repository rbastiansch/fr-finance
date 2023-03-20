<template>
  <span class="rounded px-3 py-1" :style="{ backgroundColor: props.backgroundColor }">
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    default: null
  }
})
</script>
