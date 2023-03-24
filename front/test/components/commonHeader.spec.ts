import { render } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from '~/stories/components/CommonHeader.stories'

const { Default } = composeStories(stories)

describe('CommonHeader', () => {
  it('render header with slot content', () => {
    const { getByText } = render(Default())

    expect(getByText('slot content')).toBeInTheDocument()
  })
})
