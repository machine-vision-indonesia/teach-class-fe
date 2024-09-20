export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>) {
    const callNow = immediate && !timer

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      timer = null
      if (!immediate) {
        func(...args)
      }
    }, delay)

    if (callNow) {
      func(...args)
    }
  }
}
