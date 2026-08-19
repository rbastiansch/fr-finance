import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonHeader from '~/components/CommonHeader.vue'

const meta = {
  title: 'Common/Header',
  component: CommonHeader,
  excludeStories: /StoryCases$/
} satisfies Meta<typeof CommonHeader>
export default meta
type Story = StoryObj<typeof meta>

export const commonHeaderStoryCases = {
  default: { slot: 'slot content' }
}

export const Default: Story = {
  render: () => ({
    components: { CommonHeader },
    template: `<CommonHeader>${commonHeaderStoryCases.default.slot}</CommonHeader>`
  })
}
