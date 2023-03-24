import { render } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from '~/stories/components/CommonChip.stories'

const { Default, CustomColor } = composeStories(stories)

describe('CommonChip', () => {
  it('render chip with slot content', () => {
    const { getByText } = render(Default())

    expect(getByText('slot content')).toBeInTheDocument()
  })

  it('render component with custom color', () => {
    const { getByTestId } = render(CustomColor())

    expect(getByTestId('common-chip')).toHaveStyle('background-color: rgb(241, 241, 241);')
  })
})
