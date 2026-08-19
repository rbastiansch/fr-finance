import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonAlert from '~/components/CommonAlert.vue'

const meta = {
  title: 'Common/Alert',
  component: CommonAlert,
  parameters: { layout: 'fullscreen' },
  excludeStories: /StoryCases$/
} satisfies Meta<typeof CommonAlert>

export default meta
type Story = StoryObj<typeof meta>

export const commonAlertStoryCases = {
  componentWithSlot: {
    props: { modelValue: true },
    slot: 'default slot content'
  },
  componentWithCustomMessage: {
    props: { modelValue: true, alert: { show: true, message: 'props alert message', borderColor: 'red' } }
  }
}

export const ComponentWithSlot: Story = {
  args: commonAlertStoryCases.componentWithSlot.props,
  render: (args) => ({
    components: { CommonAlert },
    setup: () => ({ args }),
    template: `<CommonAlert v-bind="args">${commonAlertStoryCases.componentWithSlot.slot}</CommonAlert>`
  })
}

export const ComponentWithCustomMessage: Story = {
  args: commonAlertStoryCases.componentWithCustomMessage.props
}
