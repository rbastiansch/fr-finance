import { Component } from 'vue'
import { render } from '@testing-library/vue'
import CommonLoading from '~/components/CommonLoading.vue'
import CommonChip from '~/components/CommonChip.vue'
import CommonHeader from '~/components/CommonHeader.vue'
import CommonCombobox from '~/components/CommonCombobox.vue'
import TransactionsFilter from '~/components/Transactions/TransactionsFilter.vue'
import TransactionsTable from '~/components/Transactions/TransactionsTable.vue'

export const customRender = (component: Component, options?: Record<string, any>) => {
  return render(component, {
    global: {
      components: {
        'common-loading': CommonLoading,
        'common-chip': CommonChip,
        'common-header': CommonHeader,
        'common-combobox': CommonCombobox,
        'transactions-filter': TransactionsFilter,
        'transactions-table': TransactionsTable
      }
    },
    ...options
  })
}
