<template>
  <div
    class="absolute left-2 -bottom-12 py-2 px-4 bg-white rounded-md border-solid border-2 transition duration-300 ease-out"
    :class="customClasses"
  >
    <slot>
      {{ props.alert.message }}
    </slot>
  </div>  
</template>

<script setup>
import { reactive, watch, computed } from '@nuxtjs/composition-api'
const props = defineProps({
  value: Boolean,
  alert: {
    type: Object,
    default: () => ({})
  },
  millisecondsToClose: {
    type: Number,
    default: 5000
  }
})

const emit = defineEmits(['input'])

const data = reactive({
  show: false
})

const customClasses = computed(() => {
  const { borderColor } = props.alert

  return {
    '-translate-y-14': data.show,
    [`border-${borderColor}-500`]: borderColor
  }
})

watch(() => props.value, (value) => {
  data.show = value
}, {
  immediate: true
})

const timerToHide = () => {
  setTimeout(() => {
    data.show = false
    emit('input', false)
  }, props.millisecondsToClose)
}

watch(() => data.show, (value) => {
  if (value) {
    timerToHide()
  }
}, {
  immediate: true
})
</script>
