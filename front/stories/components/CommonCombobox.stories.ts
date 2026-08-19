import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonCombobox from '~/components/CommonCombobox.vue'

const meta = {
  title: 'Common/Combobox',
  component: CommonCombobox,
  excludeStories: /StoryCases$/
} satisfies Meta<typeof CommonCombobox>
export default meta
type Story = StoryObj<typeof meta>

export const commonComboboxStoryCases = {
  withoutOptions: { modelValue: '' },
  withOptions: {
    modelValue: '',
    options: [
      { text: 'Horse', value: 'horse' },
      { text: 'Dog', value: 'dog' },
      { text: 'Cat', value: 'cat' }
    ]
  }
}

export const WithoutOptions: Story = { args: commonComboboxStoryCases.withoutOptions }
export const WithOptions: Story = {
  args: commonComboboxStoryCases.withOptions
}
