<template>
  <div>
    <common-header>Transaction</common-header>
    <div class="grid grid-cols-2 py-2">
      <div class="py-1 h-20 text-sm border-b border-slate-100">
        <h2 class="font-medium mb-1">Reference:</h2>
        <p>{{ data.transaction?.reference }}</p>
      </div>
      <div class="py-1 h-20 text-sm border-b border-slate-100">
        <h2 class="font-medium mb-1">Account:</h2>
        <p>{{ data.transaction?.account?.name }}</p>
      </div>
      <div v-if="data.category" class="py-1 h-20 text-sm border-b border-slate-100">
        <h2 class="font-medium mb-1">Category:</h2>
        <transactions-details-category :category="data.category" @save="saveCategory" />
        <common-alert v-model="data.alert.show" :alert="data.alert" />
      </div>
      <div class="py-1 h-20 text-sm border-b border-slate-100">
        <h2 class="font-medium mb-1">Date:</h2>
        <p>{{ formatDateFromIso(data.transaction?.date) }}</p>
      </div>
      <div class="py-1 h-20 text-sm">
        <h2 class="font-medium mb-1">Amount:</h2>
        <p>
          {{ data.transaction?.amount }}
          <span class="text-slate-500">{{ data.transaction?.currency }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive } from 'vue'
import { formatDateFromIso } from '~/utils/date.utils'
import TransactionService from '~/services/transaction.service'
import { Alert, Category, Transaction } from '~/types'
const transactionService = new TransactionService()

const route = useRoute()

interface Data {
  transaction: Transaction | null
  category: Category | null
  alert: Alert
}

const data: Data = reactive({
  transaction: null,
  category: null,
  alert: {
    show: false,
    message: '',
    borderColor: ''
  }
})

onMounted(() => {
  getTransaction()
})

const transactionId = computed(() => route.params?.transaction as string)

const getTransaction = async () => {
  const result = await transactionService.getTransactionRequest({ id: transactionId.value })
  data.transaction = result.data.transaction
  data.category = result.data.transaction.category
}

const saveCategory = async (category: Category) => {
  const payload = {
    ...category,
    id: transactionId.value
  }

  const result = await transactionService.updateTransactionCategoryRequest(payload)
  if (result.data) {
    data.alert.message = 'Category saved successfully!'
    data.alert.borderColor = 'green'
    data.category = {
      ...category
    }
  }

  if (result.error) {
    data.alert.message = result.message
    data.alert.borderColor = 'red'
  }

  data.alert.show = true
}
</script>

<script lang="ts">
export default {
  name: 'TransactionDetails'
}
</script>
