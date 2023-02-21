<template>
  <div>
    <common-header>
      Transactions
    </common-header>
    <div class="grid grid-cols-2 py-2">
      <div class="py-1">
        <b>Reference:</b> {{ data.transaction?.reference }}
      </div>
      <div class="py-1">
        <b>Account:</b> {{ data.transaction?.account?.name }}
      </div>
      <div class="py-1">
        <b>Category:</b> {{ data.transaction?.category?.name }}
        <common-select
          v-model="data.category"
          :options="[{value: 1, text: 'value 1'}, {value: 2, text: 'value 2'}]"
        />
      </div>
      <div class="py-1">
        <b>Date:</b> {{ formatDate(data.transaction?.date) }}
      </div>
      <div class="py-1">
        <b>Amount:</b> {{ data.transaction?.currency }} {{ data.transaction?.amount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, onMounted, computed, reactive } from '@nuxtjs/composition-api'
import { getTransactionRequest } from '~/services/apollo'
import { formatDate } from '~/utils/date.utils'

const route = useRoute()

const data = reactive({
  transaction: null,
  category: 1
})

onMounted(() => {
  getTransaction()
})

const transactionId = computed(() => route.value.params?.transaction)

const getTransaction = async () => {
  const result = await getTransactionRequest({ id: transactionId.value })
  data.transaction = result.data.transaction
}
</script>

<script>
export default {
  name: 'TransactionDetails'
}
</script>
