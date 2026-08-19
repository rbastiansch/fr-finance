import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import CommonLoading from '~/components/CommonLoading.vue'
import { commonLoadingStoryCases } from '../../stories/components/CommonLoading.stories'

describe('CommonLoading', () => {
  it('renders the loading svg', () => {
    const { container } = render(CommonLoading, { props: commonLoadingStoryCases.default })

    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
