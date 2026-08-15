<template>
  <div>
    <label role="label" hidden for="search-field">
      Search by bank, account, reference, category, date, amount, currency
    </label>
    <input
      id="search-field"
      v-model="search"
      type="text"
      class="w-full border border-solid placeholder-shown:border-slate-200 placeholder:text-slate-400 text-sm rounded py-1 px-2"
      placeholder="Search by bank, account, reference, category, date, amount, currency"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from '~/utils/debounce.utils'

const search = ref('')
const emit = defineEmits<{ (event: 'change-search', value: string): void }>()
const input = debounce(() => emit('change-search', search.value), 1000)

watch(search, (value, previousValue) => {
  if (value !== previousValue) input()
})
</script>
