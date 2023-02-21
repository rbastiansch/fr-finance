<template>
  <div class="container mx-auto px-2 py-4 h-screen">
    <div class="h-full">
      <div class="px-1">
        <div class="font-lg font-semibold mb-3">
          Transactions
        </div>
        <transactions-filter v-model="data.search" />
      </div>
      <transactions-table
        :transactions="data.transactions"
        :loading="data.loading"
        @scroll-bottom="scrollBottom"
        @click-row="clickRow"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, useRouter } from '@nuxtjs/composition-api'
import { getTransactionsRequest, getTransactionsWithFiltersRequest } from '~/services/apollo'

const data = reactive({
  search: '',
  transactions: [],
  loading: false,
  currentPage: 0
})

watch(() => data.search, (search, prevSearch) => {
  data.currentPage = 0
  loadTransactions(search, prevSearch)
})

const router = useRouter()

const loadTransactions = (search, prevSearch) => {
  if (search === prevSearch) {

    return
  }

  if(search) {
    getTransactionsFilter(search)

    return
  }

  getTransactions()
}

onMounted(() => {
  getTransactions()
})

const getTransactions = async () => {
  data.loading = true
  const { currentPage } = data
  const result = await getTransactionsRequest({ page: currentPage })

  if (currentPage) {
    data.transactions = [...data.transactions, ...result.data.transactions]
  } else {
    data.transactions = result.data.transactions
  }

  data.loading = false
}

const getTransactionsFilter = async (search) => {
  data.loading = true
  const { currentPage } = data

  const result = await getTransactionsWithFiltersRequest({ search, page: currentPage })

  if (currentPage) {
    data.transactions = [...data.transactions, ...result.data.transactionsFilter]
  } else {
    data.transactions = result.data.transactionsFilter
  }

  data.loading = false
}

const scrollBottom = () => {
  data.currentPage = data.currentPage + 1
  loadTransactions(data.search)
}

const clickRow = (id) => router.push(`/transaction/${id}`)
</script>