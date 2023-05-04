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
import { ref, watch, computed } from 'vue'
import { Alert } from '~/types'

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

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const customClasses = computed(() => {
  const { borderColor } = { ...props.alert }

  return {
    '-translate-y-14': showAlert,
    [`border-${borderColor}-500`]: borderColor
  }
})

watch(
  () => props.modelValue,
  (value) => {
    showAlert.value = value
  },
  {
    immediate: true
  }
)

const timerToHide = () => {
  setTimeout(() => {
    showAlert.value = false
    emit('update:modelValue', false)
  }, props.millisecondsToClose)
}

watch(
  () => showAlert,
  (value) => {
    if (value) {
      timerToHide()
    }
  },
  {
    immediate: true
  }
)
</script>
