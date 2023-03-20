import { render } from '@testing-library/vue'
import CommonAlert from '~/components/CommonAlert.vue'

describe('CommonAlert', () => {
  it('render component with slot', () => {
    const { getByText } = render(CommonAlert, {
      slots: {
        default: '<p>default slot content</p>',
      },
    })

    expect(getByText('default slot content')).toBeInTheDocument()
  })

  it('render component with alert message', () => {
    const { getByText } = render(CommonAlert, {
      propsData: {
        alert: {
          message: 'props alert message',
        },
      },
    })

    expect(getByText('props alert message')).toBeInTheDocument()
  })

  it('render component with translation class', () => {
    const { container } = render(CommonAlert, {
      propsData: {
        value: true,
      },
    })

    expect(container.querySelector('.-translate-y-14')).toBeInTheDocument()
  })

  it('render component with border color class', () => {
    const { container } = render(CommonAlert, {
      propsData: {
        alert: {
          borderColor: 'red',
        },
      },
    })

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

  it('emits input false after 5 seconds(time defined inside component)', async () => {
    const { emitted } = render(CommonAlert, {
      props: {
        value: true,
      },
    })

    await vi.advanceTimersByTimeAsync(5000)

    expect(emitted().input).toEqual([[false]])
  })
})
