import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonChip from '~/components/CommonChip.vue'

const meta = { title: 'Common/Chip', component: CommonChip } satisfies Meta<typeof CommonChip>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({ components: { CommonChip }, template: '<CommonChip backgroundColor="#a5a0a0">slot content</CommonChip>' })
}
export const CustomColor: Story = { args: { backgroundColor: '#c42929' } }
