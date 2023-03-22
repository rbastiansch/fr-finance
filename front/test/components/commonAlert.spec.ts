import { render } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import CommonAlert from '~/components/CommonAlert.vue'
import * as stories from '~/stories/components/CommonAlert.stories'

const { ComponentWithSlot, ComponentWithCustomMessage } = composeStories(stories)

describe('CommonAlert', () => {
  it('render component with slot', () => {
    const { getByText } = render(ComponentWithSlot())

    expect(getByText('default slot content')).toBeInTheDocument()
  })

  it('render component with alert message', () => {
    const { getByText } = render(ComponentWithCustomMessage())

    expect(getByText('props alert message')).toBeInTheDocument()
  })

  it('render component with translation class', () => {
    const { container } = render(ComponentWithSlot())

    expect(container.querySelector('.-translate-y-14')).toBeInTheDocument()
  })

  it('render component with border color class', () => {
    const { container } = render(ComponentWithCustomMessage())

    expect(container.querySelector('.border-red-500')).toBeInTheDocument()
  })
})

describe('CommonAlert with fake time', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('updates v-model to false after 5 seconds(time defined inside component)', async () => {
    const { emitted } = render(CommonAlert, {
      props: {
        modelValue: true
      }
    })

    await vi.advanceTimersByTimeAsync(5000)

    expect(emitted('update:modelValue')).toEqual([[false]])
  })
})
