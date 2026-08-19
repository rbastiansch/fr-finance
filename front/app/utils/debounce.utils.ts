export const debounce = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
