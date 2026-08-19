<template>
  <div class="h-full">
    <div ref="headerFilterEl" class="px-1">
      <CommonHeader>Transactions</CommonHeader>
      <TransactionsFilter class="mt-2 mb-5" @change-search="updateSearch" />
      <p v-if="data.error" class="mb-4 rounded border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">
        {{ data.error }}
      </p>
    </div>
    <TransactionsTable
      ref="transactionsTable"
      :transactions="data.transactions"
      :loading="data.loading"
      :table-height="tableHeight"
      @scroll-bottom="scrollBottom"
      @click-row="clickRow"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, useTemplateRef } from 'vue'
import TransactionService from '~/services/transaction.service'
import type { Transaction } from '~/types'

const transactionService = new TransactionService()
const router = useRouter()
const headerFilterEl = useTemplateRef<HTMLElement>('headerFilterEl')
const transactionsTable = useTemplateRef<{ scrollToTop: () => void }>('transactionsTable')
const tableHeight = ref<number>()
let resizeObserver: ResizeObserver | undefined
let requestId = 0
const data = reactive({
  search: '',
  transactions: [] as Transaction[],
  loading: false,
  currentPage: 0,
  error: ''
})

const updateSearch = (search: string) => {
  data.search = search
  data.currentPage = 0
  getTransactions(search)
}

const getTransactions = async (search = '') => {
  const page = data.currentPage
  const currentRequestId = ++requestId
  const shouldResetScroll = page === 0
  data.loading = true
  data.error = ''
  let loaded = false
  try {
    const result = await transactionService.getTransactionsRequest({
      search,
      page
    })

    if (currentRequestId !== requestId) return

    data.transactions = [
      ...(page ? data.transactions : []),
      ...result.data.transactions
    ]
    loaded = true
  } catch (error) {
    if (currentRequestId !== requestId) return

    data.error = error instanceof Error
      ? `Unable to load transactions: ${error.message}`
      : 'Unable to load transactions. Check that the API is running.'
  } finally {
    if (currentRequestId === requestId) {
      data.loading = false
      if (loaded && shouldResetScroll) {
        await nextTick()
        transactionsTable.value?.scrollToTop()
      }
    }
  }
}

onMounted(() => getTransactions())

const scrollBottom = () => {
  if (data.loading) return
  data.currentPage += 1
  getTransactions(data.search)
}

const clickRow = (id: string) => router.push(`/transaction/${id}`)

const updateTableHeight = () => {
  if (!headerFilterEl.value) return
  const bottomSpace = 80
  tableHeight.value = Math.max(
    window.innerHeight - headerFilterEl.value.getBoundingClientRect().bottom - bottomSpace,
    0
  )
}

onMounted(() => {
  updateTableHeight()
  resizeObserver = new ResizeObserver(updateTableHeight)
  if (headerFilterEl.value) resizeObserver.observe(headerFilterEl.value)
  window.addEventListener('resize', updateTableHeight)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateTableHeight)
})
</script>
