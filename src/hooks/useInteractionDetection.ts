import { useRef, useCallback } from 'react'

const INTERACTION_DURATION = 5000

export const useInteractionDetection = (
  interaction?: () => void,
  timeToInteraction: number = INTERACTION_DURATION
) => {
  const interactionTracker = useRef<boolean>(false)

  const handleInteraction = useCallback(() => {
    interactionTracker.current = true
    setTimeout(() => {
      if (interactionTracker.current) {
        interaction?.()
      }
    }, timeToInteraction)
  }, [interaction])

  const dismissInteraction = () => {
    interactionTracker.current = false
  }

  return {
    handleInteraction,
    dismissInteraction,
  }
}
