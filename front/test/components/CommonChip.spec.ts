import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import CommonChip from '~/components/CommonChip.vue'
import { commonChipStoryCases } from '../../stories/components/CommonChip.stories'

describe('CommonChip', () => {
  it('renders with a custom color', () => {
    const { getByTestId } = render(CommonChip, {
      props: { backgroundColor: commonChipStoryCases.customColor.backgroundColor },
      slots: { default: commonChipStoryCases.customColor.slot }
    })

    expect(getByTestId('common-chip')).toHaveStyle({
      backgroundColor: commonChipStoryCases.customColor.backgroundColor
    })
  })
})
