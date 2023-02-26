import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  selectTrailers,
  fetchTrailers,
  selectTrailerStatus,
} from 'src/store/trailerSlice'
import { fetchFavourites } from 'src/store/favouritesSlice'
import { TrailersGrid } from 'src/components/TrailersGrid'
import { useAbortController } from 'src/hooks/useAbortController'

export const Landing = () => {
  const trailers = useAppSelector(selectTrailers)
  const trailersStatus = useAppSelector(selectTrailerStatus)
  const dispatch = useAppDispatch()
  const abortSignal = useAbortController()

  useEffect(() => {
    dispatch(fetchFavourites({ options: { signal: abortSignal } }))
    dispatch(fetchTrailers({ options: { signal: abortSignal } }))
  }, [abortSignal])

  return (
    <TrailersGrid
      collection={trailers}
      isLoading={trailersStatus === 'loading'}
    />
  )
}
