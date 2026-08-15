<template>
  <div
    class="absolute left-2 -bottom-12 py-2 px-4 bg-white rounded-md border-solid border-2 transition duration-300 ease-out"
    :class="customClasses"
  >
    <slot>
      {{ alert.message }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import type { Alert } from '~/types'

interface Props {
  modelValue: boolean
  alert?: Alert
  millisecondsToClose?: number
}

const props = withDefaults(defineProps<Props>(), {
  millisecondsToClose: 5000,
  alert: () => ({ show: false })
})

const showAlert = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const customClasses = computed(() => ({
  '-translate-y-14': showAlert.value,
  'border-green-500': props.alert?.borderColor === 'green',
  'border-red-500': props.alert?.borderColor === 'red'
}))

const clearTimer = () => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = undefined
  }
}

watch(
  () => props.modelValue,
  (value) => {
    showAlert.value = value
    clearTimer()

    if (value) {
      timeout = setTimeout(() => {
        showAlert.value = false
        emit('update:modelValue', false)
      }, props.millisecondsToClose)
    }
  },
  { immediate: true }
)

onUnmounted(clearTimer)
</script>
