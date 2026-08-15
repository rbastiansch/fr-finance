<template>
  <div class="h-full">
    <div class="px-1">
      <CommonHeader>Transactions</CommonHeader>
      <TransactionsFilter class="mt-2 mb-5" @change-search="updateSearch" />
      <p v-if="data.error" class="mb-4 rounded border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">
        {{ data.error }}
      </p>
    </div>
    <TransactionsTable
      :transactions="data.transactions"
      :loading="data.loading"
      @scroll-bottom="scrollBottom"
      @click-row="clickRow"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import TransactionService from '~/services/transaction.service'
import type { Transaction } from '~/types'

const transactionService = new TransactionService()
const router = useRouter()
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
  data.loading = true
  data.error = ''
  try {
    const result = await transactionService.getTransactionsRequest({
      search,
      page: data.currentPage
    })
    data.transactions = [
      ...(data.currentPage ? data.transactions : []),
      ...result.data.transactions
    ]
  } catch (error) {
    data.error = error instanceof Error
      ? `Unable to load transactions: ${error.message}`
      : 'Unable to load transactions. Check that the API is running.'
  } finally {
    data.loading = false
  }
}

onMounted(() => getTransactions())

const scrollBottom = () => {
  data.currentPage += 1
  getTransactions(data.search)
}

const clickRow = (id: string) => router.push(`/transaction/${id}`)
</script>
