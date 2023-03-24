import CommonLoading from '~/components/CommonLoading.vue'

export default {
  title: 'Common/Loading',
  component: CommonLoading,
  parameters: {
    layout: 'fullscreen'
  }
}

const Template = () => ({
  components: { CommonLoading },
  template: '<common-loading />'
})

export const Default = Template.bind({})
