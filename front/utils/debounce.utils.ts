export const debounce = (fn: Function, delay: number): Function => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Array<any>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
