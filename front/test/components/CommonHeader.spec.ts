import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import CommonHeader from '~/components/CommonHeader.vue'
import { commonHeaderStoryCases } from '../../stories/components/CommonHeader.stories'

describe('CommonHeader', () => {
  it('renders its slot', () => {
    const slot = commonHeaderStoryCases.default.slot
    const { getByText } = render(CommonHeader, { slots: { default: slot } })

    expect(getByText(slot)).toBeInTheDocument()
  })
})
