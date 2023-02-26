import React from 'react'
import { Button, CardActions } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

type PlayerActionsProps = {
  isFavourite?: boolean
  onFavouritesSelection: () => void
  onDetailsSelection: () => void
}

export const PlayerActions: React.FC<PlayerActionsProps> = ({
  isFavourite = false,
  onFavouritesSelection,
  onDetailsSelection,
}) => {
  return (
    <CardActions>
      <Button size={'small'} onClick={onDetailsSelection}>
        Details
      </Button>
      <Button size={'small'} onClick={onFavouritesSelection}>
        {isFavourite ? <FavoriteBorder /> : <Favorite />}
      </Button>
    </CardActions>
  )
}
