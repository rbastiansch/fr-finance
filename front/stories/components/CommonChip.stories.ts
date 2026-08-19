import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CommonChip from '~/components/CommonChip.vue'

const meta = {
  title: 'Common/Chip',
  component: CommonChip,
  excludeStories: /StoryCases$/
} satisfies Meta<typeof CommonChip>
export default meta
type Story = StoryObj<typeof meta>

export const commonChipStoryCases = {
  default: { backgroundColor: '#a5a0a0', slot: 'slot content' },
  customColor: { backgroundColor: '#c42929', slot: 'custom color content' }
}

export const Default: Story = {
  args: { backgroundColor: commonChipStoryCases.default.backgroundColor },
  render: (args) => ({
    components: { CommonChip },
    setup: () => ({ args }),
    template: `<CommonChip v-bind="args">${commonChipStoryCases.default.slot}</CommonChip>`
  })
}

export const CustomColor: Story = {
  args: { backgroundColor: commonChipStoryCases.customColor.backgroundColor },
  render: (args) => ({
    components: { CommonChip },
    setup: () => ({ args }),
    template: `<CommonChip v-bind="args">${commonChipStoryCases.customColor.slot}</CommonChip>`
  })
}
