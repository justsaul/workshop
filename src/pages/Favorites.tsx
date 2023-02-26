import React, { useEffect } from 'react'
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

import { useAbortController } from 'src/hooks/useAbortController'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  fetchFavourites,
  selectFavouriteCollection,
  deleteFavourite,
} from 'src/store/favouritesSlice'
import { fetchTrailers, selectTrailerById } from 'src/store/trailerSlice'

const useFavourites = () => {
  const dispatch = useAppDispatch()
  const abortSignal = useAbortController()

  useEffect(() => {
    dispatch(fetchFavourites({ options: { signal: abortSignal } }))
  }, [abortSignal])
}

const useFetchTrailers = () => {
  const dispatch = useAppDispatch()
  const abortSignal = useAbortController()

  useEffect(() => {
    dispatch(fetchTrailers({ options: { signal: abortSignal } }))
  }, [abortSignal])
}

export const FavouritesPage = () => {
  const dispatch = useAppDispatch()
  useFavourites()
  useFetchTrailers()

  const abortSignal = useAbortController()

  const getTrailerById = useAppSelector(selectTrailerById)
  const favourites = useAppSelector(selectFavouriteCollection)

  return (
    <Paper style={{ height: '100vh', margin: '10px 30px 0 30px' }}>
      <Typography variant={'h3'}>Favourites</Typography>
      <List>
        {favourites.map((favourite) => {
          const trailerDetails = getTrailerById(favourite.trailerId)
          return (
            <React.Fragment key={`list-item-${favourite.id}`}>
              <ListItem
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="comment"
                    onClick={() => {
                      dispatch(
                        deleteFavourite({
                          id: favourite.id,
                          options: { signal: abortSignal },
                        })
                      )
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
            </React.Fragment>
          )
        })}
      </List>
    </Paper>
  )
}
