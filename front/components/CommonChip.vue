<template>
  <span
    class="rounded px-3 py-1"
    :style="{ backgroundColor: backgroundColor }"
    data-testId="common-chip"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  backgroundColor?: string
}>()
</script>
