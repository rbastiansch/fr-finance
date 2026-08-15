<template>
  <div
    ref="scroll"
    class="transactionsTable overflow-x-auto overflow-y-auto"
    role="region"
    aria-label="Transactions table"
    tabindex="0"
    @scroll="scroller"
  >
    <table class="table-auto w-full min-w-[640px]">
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
          v-for="row in transactions"
          :key="row.id"
          class="border-b h-14 cursor-pointer"
          @click="clickRow(row.id)"
        >
          <td class="px-2 py-1" :class="{ 'text-slate-500': !row.reference }">
            {{ referenceFormat(row.reference) }}
          </td>
          <td class="px-2 py-1">
            <CommonChip :background-color="`#${row.category.color}`">
              {{ row.category.name }}
            </CommonChip>
          </td>
          <td class="px-2 py-1">{{ row.account.bank }}</td>
          <td class="px-2 py-1">{{ formatDateFromIso(row.date) }}</td>
          <td class="px-2 py-1">
            {{ addDecimal(row.amount) }}
            <span class="text-slate-500">{{ row.currency }}</span>
          </td>
        </tr>
        <tr v-show="loading" data-testid="table-loading">
          <td colspan="5" class="py-4">
            <div class="relative h-16 w-full">
              <CommonLoading />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import CommonChip from '~/components/CommonChip.vue'
import CommonLoading from '~/components/CommonLoading.vue'
import { debounce } from '~/utils/debounce.utils'
import { formatDateFromIso } from '~/utils/date.utils'
import { addDecimal } from '~/utils/number.utils'
import type { Transaction } from '~/types'

withDefaults(
  defineProps<{
    transactions?: Transaction[]
    loading?: boolean
  }>(),
  { transactions: () => [], loading: false }
)

const referenceFormat = (reference?: string) => reference || 'No reference provided'

const emit = defineEmits<{
  (event: 'click-row', value: string): void
  (event: 'scroll-bottom'): void
}>()

const clickRow = (id: string) => {
  if (!window.getSelection()?.toString()) emit('click-row', id)
}

const scroller = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.scrollHeight - target.scrollTop <= target.clientHeight) {
    debounce(() => emit('scroll-bottom'), 300)()
  }
}
</script>

<style scoped>
.transactionsTable {
  height: calc(100vh - 220px);
}
</style>
