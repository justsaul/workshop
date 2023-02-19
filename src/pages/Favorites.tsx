import { useEffect } from 'react'
import { List, ListItem, IconButton, ListItemText } from '@mui/material'

import { Delete } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  fetchFavourites,
  selectFavouriteCollection,
  deleteFavourite,
} from 'src/store/favouritesSlice'
import { fetchTrailers, selectTrailerById } from 'src/store/trailerSlice'

const useFavourites = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFavourites())
  }, [])
}

const useFetchTrailers = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTrailers())
  }, [])
}

export const FavouritesPage = () => {
  const dispatch = useAppDispatch()
  useFavourites()
  useFetchTrailers()

  const getTrailerById = useAppSelector(selectTrailerById)
  const favourites = useAppSelector(selectFavouriteCollection)

  return (
    <List>
      {favourites.map((favourite) => {
        const trailerDetails = getTrailerById(favourite.trailerId)
        return (
          <ListItem
            key={favourite.id}
            disableGutters
            secondaryAction={
              <IconButton
                aria-label="comment"
                onClick={() => {
                  dispatch(deleteFavourite(favourite.id))
                }}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemText
              primary={trailerDetails?.title!}
              secondary={trailerDetails?.content!}
            />
          </ListItem>
        )
      })}
    </List>
  )
}
