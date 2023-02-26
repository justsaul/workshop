import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material'

import { setFavourite, selectIsFavourite } from 'src/store/favouritesSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { setInterest } from 'src/store/inteterestsSlice'
import { PlayerActions } from 'src/components/PlayerActions'
import { ContentPlayer } from 'src/components/ContentPlayer'

export const TrailerDetailsCard: React.FC<{
  url?: string
  title: string
  id: string
  isLoading?: boolean
}> = ({ url, title, id, isLoading = false }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const selectedFavourite = useAppSelector(selectIsFavourite)(id)

  return (
    <Card sx={{ width: 330 }} elevation={3}>
      <CardMedia>
        <ContentPlayer
          isLoading={isLoading}
          url={url}
          onHover={() => dispatch(setInterest({ id }))}
        />
      </CardMedia>
      <CardContent>
        <Typography noWrap>
          {isLoading ? <Skeleton variant={'text'} width={100} /> : title}
        </Typography>
      </CardContent>
      <PlayerActions
        isLoading={isLoading}
        isFavourite={!!selectedFavourite}
        onDetailsSelection={() => navigate(`/${id}`)}
        onFavouritesSelection={() => dispatch(setFavourite({ id }))}
      />
    </Card>
  )
}
