import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonAlert from '~/components/CommonAlert.vue'

const meta = {
  title: 'Common/Alert',
  component: CommonAlert,
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof CommonAlert>

export default meta
type Story = StoryObj<typeof meta>

export const ComponentWithSlot: Story = {
  args: { modelValue: true },
  render: (args) => ({ components: { CommonAlert }, setup: () => ({ args }), template: '<CommonAlert v-bind="args">default slot content</CommonAlert>' })
}

export const ComponentWithCustomMessage: Story = {
  args: { modelValue: true, alert: { message: 'props alert message', borderColor: 'red' } }
}
