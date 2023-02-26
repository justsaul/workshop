import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
} from '@mui/material'

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
  selectInterestsStatus,
} from 'src/store/inteterestsSlice'
import { ContentPlayer } from 'src/components/ContentPlayer'
import { TrailersGrid } from 'src/components/TrailersGrid'
import { Trailer } from 'src/api/trailers.api'
import { useAbortController } from 'src/hooks/useAbortController'

const useFetchTrailerDetails = () => {
  const params = useParams<{ id: string }>()
  const abortSignal = useAbortController()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (params.id) {
      dispatch(
        fetchTrailerDetails({ id: params.id, options: { signal: abortSignal } })
      )
    }

    return () => {
      clearTrailerDetailsState()
    }
  }, [params.id, abortSignal])
}

const useFetchTrailers = () => {
  const dispatch = useAppDispatch()
  const abortSignal = useAbortController()

  useEffect(() => {
    dispatch(fetchTrailers({ options: { signal: abortSignal } }))
  }, [abortSignal])
}

const useFetchMoreLikeThis = () => {
  const dispatch = useAppDispatch()
  const abortSignal = useAbortController()
  const trailerDetails = useAppSelector(selectTrailerDetails)

  useEffect(() => {
    if (trailerDetails) {
      dispatch(fetchInterests({ options: { signal: abortSignal } }))
    }

    return () => {
      clearAll()
    }
  }, [trailerDetails, abortSignal])
}

export const TrailerDetails = () => {
  useFetchTrailerDetails()
  useFetchMoreLikeThis()
  useFetchTrailers()

  const details = useAppSelector(selectTrailerDetails)
  const getTrailerById = useAppSelector(selectTrailerById)
  const interests = useAppSelector(selectSortedInterests)
  const interestsStatus = useAppSelector(selectInterestsStatus)
  const trailersStatus = useAppSelector(selectTrailerStatus)

  const getTrailersFromInterest = useMemo(
    () => interests.map(getTrailerById).filter(Boolean) as Trailer[],
    [interests]
  )

  return (
    <>
      <Card style={{ minHeight: '100vh' }}>
        <CardMedia>
          <ContentPlayer
            isPlaying
            url={details?.url}
            height={'500px'}
            isLoading={trailersStatus === 'loading'}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {details?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details?.content}
          </Typography>

          <Typography variant="h5" color="div">
            {interestsStatus === 'loading' ? (
              <Skeleton variant={'text'} width={150} />
            ) : (
              'More like this'
            )}
          </Typography>
          <TrailersGrid
            collection={getTrailersFromInterest}
            isLoading={interestsStatus === 'loading'}
          />
        </CardContent>
      </Card>
    </>
  )
}
