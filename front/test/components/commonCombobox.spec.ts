import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from '~/stories/components/CommonCombobox.stories'

const { WithoutOptions, WithOptions } = composeStories(stories)

describe('CommonAlert', () => {
  it('renders component without options', async () => {
    const { getByRole } = render(WithoutOptions())

    await userEvent.click(getByRole('combobox'))

    expect(getByRole('listbox', { hidden: true })).not.toBeVisible()
  })

  it('renders component with options', async () => {
    const { getByRole, getAllByRole } = render(WithOptions())

    await userEvent.click(getByRole('combobox'))

    expect(getByRole('listbox', { hidden: true })).toBeVisible()
    expect(getAllByRole('option').length).toBe(3)
  })

  it('filters component options', async () => {
    const { getByRole, getAllByRole } = render(WithOptions())

    await userEvent.type(getByRole('combobox'), 'Hor')

    expect(getAllByRole('option').length).toBe(1)
    expect(getByRole('option', { name: 'Horse' })).toBeInTheDocument()
  })

  it('renders input displayed text on type and press key Enter', async () => {
    const { getByRole, getByDisplayValue } = render(WithOptions())

    await userEvent.type(getByRole('combobox'), 'Horse{enter}')

    expect(getByDisplayValue('Horse')).toBeVisible()
  })

  it('renders input displayed text after click in an option', async () => {
    const { getByRole, getByDisplayValue } = render(WithOptions())

    await userEvent.click(getByRole('combobox'))
    await userEvent.click(getByRole('option', { name: 'Dog' }))

    expect(getByDisplayValue('Dog')).toBeVisible()
  })

  it('shows options list after enter an option and keep typing', async () => {
    const { getByRole } = render(WithOptions())

    await userEvent.type(getByRole('combobox'), 'Hor{enter}')
    await userEvent.type(getByRole('combobox'), 's')

    expect(getByRole('listbox', { hidden: true })).toBeVisible()
  })
})
