<template>
  <div>
    <common-header>
      Transactions
    </common-header>
    <div class="grid grid-cols-2 py-2">
      <div class="py-1 h-10">
        <b>Reference:</b> {{ data.transaction?.reference }}
      </div>
      <div class="py-1 h-10">
        <b>Account:</b> {{ data.transaction?.account?.name }}
      </div>
      <div class="py-1 h-10">
        <b>Category:</b>
        <transactions-details-category
          :category="data.category"
          @save="saveCategory"
        />
        <common-alert
          v-model="data.alert.show"
          :alert="data.alert"
        />
      </div>
      <div class="py-1 h-10">
        <b>Date:</b> {{ formatDate(data.transaction?.date) }}
      </div>
      <div class="py-1 h-10">
        <b>Amount:</b> {{ data.transaction?.currency }} {{ data.transaction?.amount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, onMounted, computed, reactive } from '@nuxtjs/composition-api'
import { getTransactionRequest, updateTransactionCategoryRequest } from '~/services/apollo'
import { formatDate } from '~/utils/date.utils'

const route = useRoute()

const data = reactive({
  transaction: null,
  category: null,
  categoryColor: null,
  alert: {
    show: false,
    message: '',
    borderColor: ''
  }
})

onMounted(() => {
  getTransaction()
})

const transactionId = computed(() => route.value.params?.transaction)

const getTransaction = async () => {
  const result = await getTransactionRequest({ id: transactionId.value })
  data.transaction = result.data.transaction
  data.category = result.data.transaction.category
}

const saveCategory = async (category) => {
  const payload = {
    ...category,
    id: transactionId.value
  }

  const result = await updateTransactionCategoryRequest(payload)
  if (result.data) {
    data.alert.message = 'Category saved successfully!'
    data.alert.borderColor = 'green'
  }

  if (result.error) {
    data.alert.message = result.message
    data.alert.borderColor = 'red'
  }

  data.alert.show = true
}
</script>

<script>
export default {
  name: 'TransactionDetails'
}
</script>
