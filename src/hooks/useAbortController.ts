import { useEffect, useRef, useState } from 'react'

export const useAbortController = () => {
  const abortControllerRef = useRef<AbortController>(new AbortController())
  const [signal, setSignal] = useState<AbortSignal>(
    abortControllerRef.current.signal
  )

  useEffect(() => {
    if (abortControllerRef.current.signal.aborted) {
      abortControllerRef.current = new AbortController()
      setSignal(abortControllerRef.current.signal)
    }

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return signal
}
