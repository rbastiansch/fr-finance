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

<script setup>
import { reactive, onMounted } from 'vue'
import { getTransactionsRequest } from '~/services/transaction.service'

const data = reactive({
  search: '',
  transactions: [],
  loading: false,
  currentPage: 0
})

const updateSearch = (search) => {
  data.currentPage = 0
  loadTransactions(search)
}

const router = useRouter()

const loadTransactions = (search, prevSearch) => {
  if (search === prevSearch) {
    return
  }

  getTransactions(search)
}

onMounted(() => {
  getTransactions()
})

const getTransactions = async (search) => {
  data.loading = true
  const { currentPage } = data
  const result = await getTransactionsRequest({ search, page: currentPage })

  data.transactions = [...(currentPage ? data.transactions : []), ...result.data.transactions]

  data.loading = false
}

const scrollBottom = () => {
  data.currentPage = data.currentPage + 1
  loadTransactions(data.search)
}

const clickRow = (id) => router.push(`/transaction/${id}`)
</script>
