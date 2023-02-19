import React, { useEffect } from 'react'
import { Grid } from '@mui/material'

import { Player } from 'src/components/Player'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectTrailers, fetchTrailers } from 'src/store/trailerSlice'
import { fetchFavourites } from 'src/store/favouritesSlice'

export const Landing = () => {
  const trailers = useAppSelector(selectTrailers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFavourites())
    dispatch(fetchTrailers())
  }, [])

  return (
    <Grid container spacing={5}>
      {trailers.map((trailer) => {
        return (
          <Grid item id={`trailer-item-${trailer.id}`}>
            <Player url={trailer.url} title={trailer.title} id={trailer.id} />
          </Grid>
        )
      })}
    </Grid>
  )
}
