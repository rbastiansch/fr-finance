<template>
  <div class="h-full">
    <div class="px-1">
      <common-header>Transactions</common-header>
      <transactions-filter class="mt-2 mb-5" @change-search="updateSearch" />
    </div>
    <transactions-table
      :transactions="data.transactions"
      :loading="data.loading"
      @scroll-bottom="scrollBottom"
      @click-row="clickRow"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import TransactionService from '~/services/transaction.service'
import { Transaction } from '~/types'
const transactionService = new TransactionService()

const data = reactive({
  search: '',
  transactions: [] as Transaction[],
  loading: false,
  currentPage: 0
})

const updateSearch = (search: string) => {
  data.currentPage = 0
  loadTransactions(search)
}

const router = useRouter()

const loadTransactions = (search: string, prevSearch?: string) => {
  if (search === prevSearch) {
    return
  }

  getTransactions(search)
}

onMounted(() => {
  getTransactions()
})

const getTransactions = async (search = '' as string) => {
  data.loading = true
  const { currentPage } = data
  const result = await transactionService.getTransactionsRequest({ search, page: currentPage })

  data.transactions = [...(currentPage ? data.transactions : []), ...result.data.transactions]

  data.loading = false
}

const scrollBottom = () => {
  data.currentPage = data.currentPage + 1
  loadTransactions(data.search)
}

const clickRow = (id: string) => router.push(`/transaction/${id}`)
</script>
