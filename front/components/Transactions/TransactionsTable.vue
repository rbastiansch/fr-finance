<template>
  <div ref="scroll" class="transactionsTable overflow-y-auto" @scroll="scroller">
    <table class="table-auto w-full">
      <thead>
        <tr class="border-b py-4">
          <th class="font-normal text-left p-2">Reference</th>
          <th class="font-normal text-left p-2">Category</th>
          <th class="font-normal text-left p-2">Bank</th>
          <th class="font-normal text-left p-2">Date</th>
          <th class="font-normal text-left p-2">Amount</th>
        </tr>
      </thead>
      <tbody class="relative text-sm">
        <tr
          v-for="(row, index) in transactions"
          :key="index"
          class="border-b h-14 cursor-pointer"
          @click="clickRow(row.id)"
        >
          <td class="px-2 py-1" :class="{ 'text-slate-500': !row.reference }">
            {{ referenceFormat(row.reference) }}
          </td>
          <td class="px-2 py-1">
            <common-chip :background-color="`#${row.category.color}`">
              {{ row.category.name }}
            </common-chip>
          </td>
          <td class="px-2 py-1">
            {{ row.account.bank }}
          </td>
          <td class="px-2 py-1">{{ formatDateFromIso(row.date) }}</td>
          <td class="px-2 py-1">
            {{ addDecimal(row.amount) }}
            <span class="text-slate-500">
              {{ row.currency }}
            </span>
          </td>
        </tr>
        <common-loading v-show="loading" data-testid="table-loading" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { formatDateFromIso } from '~/utils/date.utils'
import { addDecimal } from '~/utils/number.utils'
import { debounce } from '~/utils/debounce.utils'

defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  loading: Boolean
})

const referenceFormat = (reference) => {
  return reference || 'No reference provided'
}

const emit = defineEmits(['click-row', 'scroll-bottom'])
const clickRow = (id) => {
  if (!window.getSelection().toString()) {
    emit('click-row', id)
  }
}

const scroller = (ref) => {
  const verticalScrollResult = ref.target.scrollHeight - ref.target.scrollTop
  const heightElement = ref.target.clientHeight

  if (verticalScrollResult === heightElement) {
    debounce(() => emit('scroll-bottom'), 300)()
  }
}
</script>

<style lang="scss" scoped>
.transactionsTable {
  height: calc(100vh - 220px);
}
</style>
