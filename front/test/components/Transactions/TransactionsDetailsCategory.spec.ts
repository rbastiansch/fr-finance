import userEvent from '@testing-library/user-event'
import { customRender } from '~/test/testingLibraryHelper'
import TransactionsDetailsCategory from '~/components/Transactions/TransactionsDetailsCategory.vue'

const mockCategory = {
  name: 'Category name',
  color: '#ff0000'
}

describe('TransactionsDetailsCategory', () => {
  beforeAll(() => {
    vi.mock('~/services/category.service', () => ({
      getCategoriesRequest: () =>
        Promise.resolve({ data: { categories: [{ name: 'name', id: 'id-1' }] } })
    }))
  })

  afterAll(() => {
    vi.resetAllMocks()
  })

  it('renders default component', () => {
    const { getByText, getByTestId, getByRole } = customRender(TransactionsDetailsCategory, {
      props: {
        category: mockCategory
      }
    })

    expect(getByText('Category name')).toBeInTheDocument()
    expect(getByTestId('common-chip')).toHaveStyle('background-color: rgb(255, 0, 0)')
    expect(getByRole('button', { name: 'edit' })).toBeInTheDocument()
  })

  it('toggles edit category', async () => {
    const { getByRole, queryByTestId } = customRender(TransactionsDetailsCategory, {
      props: {
        category: mockCategory
      }
    })

    await userEvent.click(getByRole('img', { name: 'edit' }))

    expect(getByRole('button', { name: 'close' })).toBeInTheDocument()
    expect(getByRole('combobox')).toBeInTheDocument()
    expect(queryByTestId('common-chip')).not.toBeInTheDocument()
  })

  it('toggles edit category and change input should shows save button', async () => {
    const { getByRole } = customRender(TransactionsDetailsCategory, {
      props: {
        category: mockCategory
      }
    })

    await userEvent.click(getByRole('img', { name: 'edit' }))
    await userEvent.type(getByRole('combobox'), 'a')

    expect(getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('reset is editing after change input', async () => {
    const { getByRole, queryByRole } = customRender(TransactionsDetailsCategory, {
      props: {
        category: mockCategory
      }
    })

    await userEvent.click(getByRole('img', { name: 'edit' }))
    await userEvent.type(getByRole('combobox'), 'a')
    await userEvent.click(getByRole('img', { name: 'close' }))

    expect(queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('emits on click save button', async () => {
    const { getByRole, emitted } = customRender(TransactionsDetailsCategory, {
      props: {
        category: mockCategory
      }
    })

    await userEvent.click(getByRole('img', { name: 'edit' }))
    await userEvent.clear(getByRole('combobox'))
    await userEvent.type(getByRole('combobox'), 'foo')
    await userEvent.click(getByRole('button', { name: 'Save' }))

    expect(emitted('save')).toStrictEqual([[{ color: 'ff0000', name: 'foo' }]])
  })
})
