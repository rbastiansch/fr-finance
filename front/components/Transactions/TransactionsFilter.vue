<template>
  <input
    type="text"
    class="w-full border border-solid placeholder-shown:border-slate-200 placeholder:text-slate-400 text-sm rounded py-1 px-2"
    placeholder="Search by bank, account, reference, category, date, amount, currency"
    :value="value"
    @input="input"
  >
</template>

<script setup>
import { debounce } from '~/utils/debounce.utils'

defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['input'])

const input = (event) => debounce(() => emit('input', event.target.value), 500)()
</script>