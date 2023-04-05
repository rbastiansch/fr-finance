import CommonCombobox from '~/components/CommonCombobox.vue'

export default {
  title: 'Common/Combobox',
  component: CommonCombobox,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    modelValue: {
      control: 'string',
      description: 'prop generated by v-model directive, string with the name of current option'
    },
    options: {
      control: 'array',
      description: 'options list for combobox, each item is an object with keys text and value'
    },
    'update:modelValue': {
      action: 'update:modelValue',
      description: 'emits when is updated input type, default event for v-model directive'
    },
    'select-option': {
      action: 'select-option',
      description: 'emits when an option is clicked'
    }
  }
}

const Template = (args) => ({
  components: { CommonCombobox },
  props: Object.keys(args),
  setup() {
    return {
      args
    }
  },
  template: '<common-combobox v-bind="args" v-on="args" />'
})

export const WithoutOptions = Template.bind({})

export const WithOptions = Template.bind({})
WithOptions.args = {
  options: [
    {
      text: 'Horse',
      value: 'horse'
    },
    {
      text: 'Dog',
      value: 'dog'
    },
    {
      text: 'Cat',
      value: 'cat'
    }
  ]
}