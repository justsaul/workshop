import React from 'react'
import { Button, CardActions } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

type PlayerActionsProps = {
  isFavourite?: boolean
  onFavouritesSelection: () => void
  isLoading: boolean
  onDetailsSelection: () => void
}

export const PlayerActions: React.FC<PlayerActionsProps> = ({
  isFavourite = false,
  onFavouritesSelection,
  onDetailsSelection,
  isLoading,
}) => {
  return (
    <CardActions>
      <Button size={'small'} onClick={onDetailsSelection} disabled={isLoading}>
        Details
      </Button>
      <Button
        size={'small'}
        onClick={onFavouritesSelection}
        disabled={isLoading}
      >
        {isFavourite ? <FavoriteBorder /> : <Favorite />}
      </Button>
    </CardActions>
  )
}
