import { render, fireEvent } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import TransactionsDetailsCategory from '~/components/Transactions/TransactionsDetailsCategory.vue'
import { createCategory } from '../helpers/fixtures'

vi.mock('~/services/category.service', () => ({
  default: class {
    async getCategoriesRequest() {
      return { data: { categories: [] } }
    }
  }
}))

describe('TransactionsDetailsCategory', () => {
  it('provides accessible controls for editing a category color', async () => {
    const { getByRole, getByLabelText, emitted } = render(TransactionsDetailsCategory, {
      props: { category: createCategory({ color: 'ff0000' }) }
    })
    const editButton = getByRole('button', { name: 'Edit category' })

    expect(editButton).toHaveAttribute('type', 'button')
    expect(editButton).toHaveAttribute('aria-pressed', 'false')
    await fireEvent.click(editButton)

    expect(getByRole('button', { name: 'Cancel category editing' })).toHaveAttribute('aria-pressed', 'true')
    expect(getByLabelText('Category color')).toHaveAttribute('type', 'color')
    await fireEvent.update(getByLabelText('Category color'), '#00ff00')

    const saveButton = getByRole('button', { name: 'Save' })
    expect(saveButton).toHaveAttribute('type', 'button')
    await fireEvent.click(saveButton)
    expect(emitted('save')).toEqual([[{ name: 'Category name', color: '00ff00' }]])
  })
})
