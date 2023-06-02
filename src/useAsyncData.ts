import { useCallback, useEffect, useRef, useState } from 'react'

interface Props<T> {
  defaultValue?: T
  loadingDelay?: number
  initialLoading?: boolean
}

type Value<T> = T | undefined

export default function useAsyncData<T>(
  callback: (...args: any[]) => Promise<T>,
  deps: any[],
  { defaultValue, loadingDelay, initialLoading }: Props<T> = {},
) {
  const depsRef = useRef(deps)
  const [result, setResult] = useState<Value<T>>(defaultValue)
  const memoCallback = useCallback(async () => callback(...depsRef.current), [callback])
  const [loading, setLoading] = useState<boolean>(Boolean(initialLoading))
  const [error, setError] = useState<Error>()
  const [count, setCount] = useState<number>(1)
  const onReload = useCallback(() => {
    setCount((i) => ++i)
  }, [])
  useEffect(() => {
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | undefined
    const asyncCall = async () => {
      try {
        if (typeof loadingDelay == "undefined") {
          setLoading(true)
        } else {
          timeout = setTimeout(() => setLoading(true), loadingDelay)
        }

        const _result = await memoCallback()
        if (!cancelled) {
          setResult(_result)
        }
      } catch (err: unknown) {
        setError(err as Error)
      } finally {
        if (typeof timeout !== "undefined") {
          clearTimeout(timeout)
        }
        setLoading(false)
      }
    }

    asyncCall()
    return () => {
      cancelled = true
    }
  }, [loadingDelay, count, memoCallback])

  return [result, { set: setResult, loading, error, reload: onReload, loadingCount: count }] as [
    Value<T>,
    {
      set: (value: Value<T>) => void
      loading: boolean
      reload: () => void
      error?: Error
      loadingCount: number
    },
  ]
}