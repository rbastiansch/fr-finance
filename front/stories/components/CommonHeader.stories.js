import CommonHeader from '~/components/CommonHeader.vue'

export default {
  title: 'Common/Header',
  component: CommonHeader,
  parameters: {
    layout: 'fullscreen'
  }
}

const Template = (args) => ({
  components: { CommonHeader },
  setup() {
    return {
      args
    }
  },
  template: `
    <common-header v-bind="args">
      slot content
    </common-header>
  `
})

export const Default = Template.bind({})
