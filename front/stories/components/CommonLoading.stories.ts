import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonLoading from '~/components/CommonLoading.vue'

const meta = {
  title: 'Common/Loading',
  component: CommonLoading,
  excludeStories: /StoryCases$/
} satisfies Meta<typeof CommonLoading>
export default meta
type Story = StoryObj<typeof meta>

export const commonLoadingStoryCases = {
  default: {}
}

export const Default: Story = { args: commonLoadingStoryCases.default }
