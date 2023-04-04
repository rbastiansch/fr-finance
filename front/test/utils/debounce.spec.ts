import { debounce } from '~/utils/debounce.utils'

describe('debounce.utils debounce', () => {
  const mockFunction = vi.fn((param) => param)
  const debounceTimer = 500
  let globalParam = 'a'
  const locallyDebounceFunction = () => debounce(() => mockFunction(globalParam), debounceTimer)
  const inputCall = locallyDebounceFunction()

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.resetAllMocks()
  })

  it('only execute one call', () => {
    inputCall()
    inputCall()
    inputCall()
    inputCall()

    vi.advanceTimersByTime(debounceTimer)
    expect(mockFunction).toBeCalledTimes(1)
  })

  it('only execute with last param', () => {
    inputCall()
    globalParam = 'ab'
    inputCall()
    globalParam = 'abc'
    inputCall()

    vi.advanceTimersByTime(debounceTimer)
    expect(mockFunction).toBeCalledTimes(1)
    expect(mockFunction).toBeCalledWith('abc')
  })

  it('only execute after defined milliseconds', () => {
    inputCall()

    vi.advanceTimersByTime(200)
    expect(mockFunction).toBeCalledTimes(0)
  })
})
