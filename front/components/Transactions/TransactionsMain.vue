<template>
  <div class="h-screen">
    <div class="h-full">
      <div class="px-1">
        <common-header>Transactions</common-header>
        <transactions-filter
          v-model="data.search"
          class="mt-2 mb-5"
        />
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
import { getTransactionsRequest } from '~/services/transaction.service'

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

  getTransactions(search)
}

onMounted(() => {
  getTransactions()
})

const getTransactions = async (search) => {
  data.loading = true
  const { currentPage } = data
  const result = await getTransactionsRequest({ search, page: currentPage })

  data.transactions = [
    ...(currentPage ? data.transactions : []),
    ...result.data.transactions
  ]

  data.loading = false
}

const scrollBottom = () => {
  data.currentPage = data.currentPage + 1
  loadTransactions(data.search)
}

const clickRow = (id) => router.push(`/transaction/${id}`)
</script>