<template>
  <div>
    <div class="text-slate-500">Search</div>
    <input
      type="text"
      class="w-full placeholder-shown:border-gray-500 border py-1 px-2"
      placeholder="Search by bank, account, reference, category, date, amount, currency"
      :value="value"
      @input="input"
    >
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['input'])

const input = (event) => emit('input', event.target.value)
</script>