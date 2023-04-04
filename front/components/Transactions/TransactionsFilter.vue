<template>
  <div>
    <label hidden for="search-field">
      Search by bank, account, reference, category, date, amount, currency
    </label>
    <input
      id="search-field"
      v-model="data.search"
      type="text"
      class="w-full border border-solid placeholder-shown:border-slate-200 placeholder:text-slate-400 text-sm rounded py-1 px-2"
      placeholder="Search by bank, account, reference, category, date, amount, currency"
    />
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { debounce } from '~/utils/debounce.utils'

const data = reactive({
  search: ''
})

watch(
  () => data.search,
  (search, prevSearch) => {
    if (search === prevSearch) {
      return
    }

    input()
  }
)

const emit = defineEmits(['update:search'])

const locallyDebounce = () => debounce(() => emit('update:search', data.search), 1000)
const input = locallyDebounce()
</script>
