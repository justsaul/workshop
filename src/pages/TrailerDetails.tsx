import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  fetchTrailerDetails,
  selectTrailerDetails,
  clearTrailerDetailsState,
  selectTrailerById,
  fetchTrailers,
  selectTrailerStatus,
} from 'src/store/trailerSlice'
import {
  fetchInterests,
  clearAll,
  selectInterests,
} from 'src/store/inteterestsSlice'
import { Player } from 'src/components/Player'

const useFetchTrailerDetails = () => {
  const params = useParams()
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
  const interests = useAppSelector(selectInterests)
  const trailersStatus = useAppSelector(selectTrailerStatus)

  return (
    <>
      <Card>
        <CardMedia>
          <ReactPlayer
            url={details?.url}
            playing={true}
            height={500}
            width={'100%'}
            volume={0}
          />
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
                  {'More like this'}
                </Typography>
                <Grid container>
                  {interests.map((interest) => {
                    const trailerByInterest = getTrailerById(interest.trailerId)
                    return (
                      <Grid item id={`interest-item-${interest.id}`}>
                        <Player
                          url={trailerByInterest?.url!}
                          title={trailerByInterest?.title!}
                          id={trailerByInterest?.id!}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              </>
            )}
          </>
        </CardContent>
      </Card>
    </>
  )
}
