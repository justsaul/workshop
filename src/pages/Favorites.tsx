import { useEffect } from 'react'
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Paper,
  Divider,
  Typography,
} from '@mui/material'
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
    <Paper style={{ height: '100vh', margin: '10px 30px 0 30px' }}>
      <Typography variant={'h3'}>Favourites</Typography>
      <List>
        {favourites.map((favourite) => {
          const trailerDetails = getTrailerById(favourite.trailerId)
          return (
            <>
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
              <Divider variant="inset" component="li" />
            </>
          )
        })}
      </List>
    </Paper>
  )
}
