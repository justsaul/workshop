import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectTrailers, fetchTrailers } from 'src/store/trailerSlice'
import { fetchFavourites } from 'src/store/favouritesSlice'
import { TrailersGrid } from 'src/components/TrailersGrid'

export const Landing = () => {
  const trailers = useAppSelector(selectTrailers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFavourites())
    dispatch(fetchTrailers())
  }, [])

  return <TrailersGrid collection={trailers} />
}
