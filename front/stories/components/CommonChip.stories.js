import CommonChip from '~/components/CommonChip.vue'

export default {
  title: 'Common/Chip',
  component: CommonChip,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    backgroundColor: { control: 'string', description: 'background color' }
  }
}

const Template = (args) => ({
  components: { CommonChip },
  setup() {
    return {
      args
    }
  },
  template: `
    <common-chip v-bind="args">
      slot content
    </common-chip>
  `
})

export const Default = Template.bind({})

export const CustomColor = Template.bind({})
CustomColor.args = {
  backgroundColor: '#f1f1f1'
}
