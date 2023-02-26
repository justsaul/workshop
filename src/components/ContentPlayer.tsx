import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Skeleton } from '@mui/material'

import { useInteractionDetection } from 'src/hooks/useInteractionDetection'

type ContentPlayerProps = {
  isPlaying?: boolean
  url?: string
  volume?: number
  onHover?: () => void
  height?: string
  isLoading?: boolean
}

export const ContentPlayer: React.FC<ContentPlayerProps> = ({
  isPlaying = false,
  volume = 0,
  height = '100%',
  onHover,
  url,
  isLoading = false,
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

  const renderPlayer = () => {
    return (
      <ReactPlayer
        url={url}
        playing={isPlayingInternal}
        height={height}
        width={'100%'}
        volume={volume}
      />
    )
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%">
          {renderPlayer()}
        </Skeleton>
      ) : (
        renderPlayer()
      )}
    </div>
  )
}
