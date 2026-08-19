import { render, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CommonCombobox from '~/components/CommonCombobox.vue'
import { commonComboboxStoryCases } from '../../stories/components/CommonCombobox.stories'

describe('CommonCombobox', () => {
  it('filters options', async () => {
    const { getByRole, getAllByRole } = render(CommonCombobox, {
      props: commonComboboxStoryCases.withOptions
    })

    await userEvent.type(getByRole('combobox'), 'Hor')

    expect(getAllByRole('option')).toHaveLength(1)
  })

  it('selects an option with the keyboard', async () => {
    const { getByRole, emitted } = render(CommonCombobox, {
      props: commonComboboxStoryCases.withOptions
    })
    const combobox = getByRole('combobox')

    await userEvent.click(combobox)
    expect(getByRole('region', { name: 'Category options' })).toHaveAttribute('tabindex', '0')
    await fireEvent.keyDown(combobox, { key: 'ArrowDown' })
    await fireEvent.keyDown(combobox, { key: 'Enter' })

    expect(combobox).toHaveValue('Horse')
    expect(emitted('select-option')).toEqual([['Horse']])
  })
})
