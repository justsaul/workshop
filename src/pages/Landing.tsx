import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectTrailers, fetchTrailers } from 'src/store/trailerSlice'
import { fetchFavourites } from 'src/store/favouritesSlice'
import { TrailersGrid } from 'src/components/TrailersGrid'
import { useAbortController } from 'src/hooks/useAbortController'

export const Landing = () => {
  const trailers = useAppSelector(selectTrailers)
  const dispatch = useAppDispatch()
  const abortSignal = useAbortController()

  useEffect(() => {
    console.log(abortSignal)
    dispatch(fetchFavourites({ options: { signal: abortSignal } }))
    dispatch(fetchTrailers({ options: { signal: abortSignal } }))
  }, [abortSignal])

  return <TrailersGrid collection={trailers} />
}
