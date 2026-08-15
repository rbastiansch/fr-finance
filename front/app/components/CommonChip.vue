<template>
  <span
    class="inline-block whitespace-nowrap rounded px-3 py-1"
    :style="{ backgroundColor: backgroundColor }"
    data-testid="common-chip"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  backgroundColor?: string
}>()
</script>
