import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import {
  Modal,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'

import { setFavourite, selectIsFavourite } from 'src/store/favouritesSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { setInterest } from 'src/store/inteterestsSlice'

export const Player: React.FC<{ url: string; title: string; id: string }> = ({
  url,
  title,
  id,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isFavourite = useAppSelector(selectIsFavourite)(id)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    setIsPlaying(true)
    dispatch(setInterest(id))
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setIsPlaying(false)
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia>
          <ReactPlayer
            url={url}
            playing={isPlaying}
            height={'100%'}
            width={'100%'}
            volume={0}
          />
        </CardMedia>
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
        {isPlaying ? (
          <CardActions>
            <Button size={'small'} onClick={() => navigate(id)}>
              Details
            </Button>
            {!isFavourite ? (
              <Button size={'small'} onClick={() => dispatch(setFavourite(id))}>
                Add to favourites
              </Button>
            ) : null}
          </CardActions>
        ) : null}
      </Card>
    </div>
  )
}
