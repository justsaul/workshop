import React, { useState } from 'react'
import ReactPlayer from 'react-player'

import { useInteractionDetection } from 'src/hooks/useInteractionDetection'

type ContentPlayerProps = {
  isPlaying?: boolean
  url?: string
  volume?: number
  onHover?: () => void
  height?: string
}

export const ContentPlayer: React.FC<ContentPlayerProps> = ({
  isPlaying = false,
  volume = 0,
  height = '100%',
  onHover,
  url,
}) => {
  const { dismissInteraction, handleInteraction } =
    useInteractionDetection(onHover)
  const [isPlayingInternal, setIsPlayingInternal] = useState<boolean>(isPlaying)

  const handleMouseEnter = () => {
    handleInteraction()
    setIsPlayingInternal(true)
  }

  const handleMouseLeave = () => {
    dismissInteraction()
    setIsPlayingInternal(false)
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ReactPlayer
        url={url}
        playing={isPlayingInternal}
        height={height}
        width={'100%'}
        volume={volume}
      />
    </div>
  )
}
