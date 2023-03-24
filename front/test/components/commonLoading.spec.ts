import { render } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from '~/stories/components/CommonLoading.stories'

const { Default } = composeStories(stories)

describe('CommonLoading', () => {
  it('render loading component', () => {
    const { container } = render(Default())

    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
