import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  selectTrailerById,
  fetchTrailers,
  selectTrailerStatus,
} from 'src/store/trailerSlice'
import {
  fetchTrailerDetails,
  selectTrailerDetails,
  clearState as clearTrailerDetailsState,
} from 'src/store/trailerDetailsSlice'
import {
  fetchInterests,
  clearAll,
  selectSortedInterests,
} from 'src/store/inteterestsSlice'
import { ContentPlayer } from 'src/components/ContentPlayer'
import { TrailersGrid } from 'src/components/TrailersGrid'
import { Trailer } from 'src/api/trailers.api'

const useFetchTrailerDetails = () => {
  const params = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (params.id) {
      dispatch(fetchTrailerDetails(params.id))
    }

    return () => {
      clearTrailerDetailsState()
    }
  }, [params.id])
}

const useFetchTrailers = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTrailers())
  }, [])
}

const useFetchMoreLikeThis = () => {
  const dispatch = useAppDispatch()
  const trailerDetails = useAppSelector(selectTrailerDetails)

  useEffect(() => {
    if (trailerDetails) {
      dispatch(fetchInterests())
    }

    return () => {
      clearAll()
    }
  }, [trailerDetails])
}

export const TrailerDetails = () => {
  useFetchTrailerDetails()
  useFetchMoreLikeThis()
  useFetchTrailers()

  const details = useAppSelector(selectTrailerDetails)
  const getTrailerById = useAppSelector(selectTrailerById)
  const interests = useAppSelector(selectSortedInterests)
  const trailersStatus = useAppSelector(selectTrailerStatus)

  const getTrailersFromInterest = useMemo(
    () => interests.map(getTrailerById).filter(Boolean) as Trailer[],
    [interests]
  )

  return (
    <>
      <Card>
        <CardMedia>
          <ContentPlayer isPlaying url={details?.url} height={'500px'} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {details?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details?.content}
          </Typography>
          <>
            {trailersStatus === 'loading' ? (
              <div>Loading...</div>
            ) : (
              <>
                <Typography variant="h5" color="div">
                  More like this
                </Typography>
                <TrailersGrid collection={getTrailersFromInterest} />
              </>
            )}
          </>
        </CardContent>
      </Card>
    </>
  )
}
