import { render } from '@testing-library/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CommonAlert from '~/components/CommonAlert.vue'
import { commonAlertStoryCases } from '../../stories/components/CommonAlert.stories'

describe('CommonAlert', () => {
  afterEach(() => vi.useRealTimers())

  it('closes after its timeout', async () => {
    vi.useFakeTimers()
    const { emitted } = render(CommonAlert, {
      props: { ...commonAlertStoryCases.componentWithSlot.props, millisecondsToClose: 100 },
      slots: { default: commonAlertStoryCases.componentWithSlot.slot }
    })

    await vi.advanceTimersByTimeAsync(100)

    expect(emitted('update:modelValue')).toEqual([[false]])
  })
})
