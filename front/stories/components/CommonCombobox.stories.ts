import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonCombobox from '~/components/CommonCombobox.vue'

const meta = { title: 'Common/Combobox', component: CommonCombobox } satisfies Meta<typeof CommonCombobox>
export default meta
type Story = StoryObj<typeof meta>

export const WithoutOptions: Story = { args: { modelValue: '' } }
export const WithOptions: Story = {
  args: {
    modelValue: '',
    options: [
      { text: 'Horse', value: 'horse' },
      { text: 'Dog', value: 'dog' },
      { text: 'Cat', value: 'cat' }
    ]
  }
}
